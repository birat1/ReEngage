import React, { useEffect, useRef } from "react";
import "./backgroundMusic.css";

function BackgroundMusic() {
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

    return () => {
      if (backgrndAudio.current) {
        backgrndAudio.current.pause();
        backgrndAudio.current.currentTime = 0;
        backgrndAudio.current = null;
      }
    };
  }, []);


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
