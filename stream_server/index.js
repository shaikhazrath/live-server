import http from 'http';
import path from 'path';
import { spawn } from 'child_process';
import express from 'express';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());

let ffmpegProcess = null;


io.on('connection', (socket) => {
  console.log('Socket Connected', socket.id);

  socket.on('binarystream', (stream, key) => {
    console.log('Binary Stream Incoming...', stream);

    if (!ffmpegProcess) {
      let options = [
        '-i',
        '-',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-tune', 'zerolatency',
        '-r', '25',
        '-g', '50',
        '-keyint_min', '25',
        '-crf', '25',
        '-pix_fmt', 'yuv420p',
        '-sc_threshold', '0',
        '-profile:v', 'main',
        '-level', '3.1',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-ar', '32000',
        '-f', 'flv',
        `rtmp://rtmpserver/live/${key}`,
      ];

      ffmpegProcess = spawn('/usr/bin/ffmpeg', options);

      ffmpegProcess.stdout.on('data', (data) => {
        console.log(`ffmpeg stdout: ${data}`);
      });

      ffmpegProcess.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
      });

      ffmpegProcess.on('close', (code) => {
        console.log(`ffmpeg process exited with code ${code}`);
        ffmpegProcess = null;
      });

      ffmpegProcess.stdin.on('error', (err) => {
        console.error(`ffmpeg stdin error: ${err}`);
      });
    }

    if (ffmpegProcess) {
      ffmpegProcess.stdin.write(stream, (err) => {
                if (err) {
          console.error('Error writing to ffmpeg stdin:', err);
          if (err.code === 'EPIPE') {
            console.error('EPIPE error - the ffmpeg process might have exited.');
          }
        }
      });
    } else {
      console.error('ffmpeg process is not running');
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket Disconnected', socket.id);
    if (ffmpegProcess) {
      ffmpegProcess.stdin.end();
      ffmpegProcess.kill();
      ffmpegProcess = null;
    }
  });
});

server.listen(9000, () => console.log(`HTTP Server is running on PORT 9000`));
