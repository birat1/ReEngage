import React, { useState, useEffect, useRef } from "react";
import "./backgroundMusic.css";

function BackgroundMusic(playBtn) {
  const backgrndSoundbtn = useRef(null);
  const backgrndAudio = useRef(new Audio("happy_adveture.mp3"));

  useEffect(() => {
    backgrndAudio.current.loop = true;
    backgrndAudio.current.volume = 0.5;
    backgrndSoundbtn.current.innerHTML = "🔉";
    backgrndAudio.current.play().catch((error) => {
      console.error("audio play prevented", error);
    });

    // triggers the play button's click
    // so music plays, when clicked
    document.addEventListener(
        "click",
        () => {
          if (playBtn.current) { 
            playBtn.current.click();
          }
          backgrndAudio.current.play().catch((error) => {
            console.error("audio play prevented", error);
          });
        },
        {
          once: true,
        }
      );

    //pauses audio when this component unmounts
    return () => {
      backgrndAudio.current.pause();
      backgrndAudio.current.currentTime = 0;
    };
  }, []);


  //background sound logic
  const toggleSound = () => {
    if (backgrndSoundbtn.current) {
      if (backgrndSoundbtn.current.innerHTML == "🔊") {
        //mute
        backgrndAudio.current.muted = true;
        backgrndSoundbtn.current.innerHTML = "🔈";
      } else if (backgrndSoundbtn.current.innerHTML == "🔈") {
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
