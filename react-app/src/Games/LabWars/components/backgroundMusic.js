import { useEffect, useRef } from "react";
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
    if (backgrndAudio.current) {
      // Toggle the muted state
      backgrndAudio.current.muted = !backgrndAudio.current.muted;
  
      // Update the button icon based on the muted state
      backgrndSoundbtn.current.innerHTML = backgrndAudio.current.muted ? "🔇" : "🔉";
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
