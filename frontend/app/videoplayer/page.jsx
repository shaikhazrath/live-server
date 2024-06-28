'use client'
import { useRef } from 'react'
import VideoPlayer from '@/components/VideoPlayer';


function App() {
  var videoSrc = 'http://localhost:8000/live/ali/index.m3u8';

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoSrc,
      type: 'application/x-mpegURL'
    }],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };


  return (
    <>
      <div>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </>
  )
}


export default App