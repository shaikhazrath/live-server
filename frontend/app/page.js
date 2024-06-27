'use client'

import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

export default function Home() {
  const videoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:9000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const setupMedia = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setMedia(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    };
    setupMedia();
  }, []);

  const startStreaming = () => {
    if (!media || !socket) return;

    const mediaRecorder = new MediaRecorder(media, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      framerate: 25
    });

    mediaRecorder.ondataavailable = ev => {
      console.log('Binary Stream Available', ev.data);
      socket.emit('binarystream', ev.data);
    };

    mediaRecorder.start(25);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline id="user-video"></video>
      <button onClick={startStreaming} id="start-btn">Start Streaming</button>
    </div>
  );
}
