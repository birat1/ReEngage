import React, { useEffect, useRef } from "react";
import "./backgroundMusic.css";

function BackgroundMusic(playBtn) {
  const backgrndSoundbtn = useRef(null);
  const backgrndAudio = useRef(null);

  useEffect(() => {
    // Initialise audio object
    backgrndAudio.current = new Audio("/space_lab.mp3");
    backgrndAudio.current.loop = true;
    backgrndAudio.current.volume = 0.5;
    backgrndSoundbtn.current.innerHTML = "🔉";

    // Attempt to play audio
    backgrndAudio.current.play().catch((error) => {
      console.error("audio play prevented", error);
    });

    const handleClick = () => {
      if (playBtn.current) {
        playBtn.current.click();
      }
      backgrndAudio.current.play().catch((error) => {
        console.error("audio play prevented", error);
      });
    };

    document.addEventListener("click", handleClick, { once: true });

    return () => {
      document.removeEventListener("click", handleClick);
      if (backgrndAudio.current) {
        backgrndAudio.current.pause();
        backgrndAudio.current.currentTime = 0;
        backgrndAudio.current = null;
      }
    };
  }, [playBtn]);


  //background sound logic
  const toggleSound = () => {
    if (backgrndSoundbtn.current) {
      if (backgrndSoundbtn.current.innerHTML === "🔊") {
        //mute
        backgrndAudio.current.muted = true;
        backgrndSoundbtn.current.innerHTML = "🔈";
      } else if (backgrndSoundbtn.current.innerHTML === "🔈") {
        //medium sound
        backgrndAudio.current.muted = false;
        backgrndAudio.current.volume = 0.5;
        backgrndSoundbtn.current.innerHTML = "🔉";
        backgrndAudio.current.play().catch(() => {});
      } else {
        //more sound
        backgrndAudio.current.volume = 1;
        backgrndSoundbtn.current.innerHTML = "🔊";
        backgrndAudio.current.play().catch(() => {});
      }
    }
  };

  return (
    <div>
      <button
        type="Button"
        className="backgroundMusic"
        onClick={toggleSound}
        ref={backgrndSoundbtn}
        aria-label="Toggle background music"
      >
        🔈
      </button>
    </div>
  );
}

export default BackgroundMusic;
