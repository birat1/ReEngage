import React, { useEffect } from "react";

const btnAudio = new Audio("zipclick.flac");

export function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const computedStyle = window.getComputedStyle(elmnt);

  //record the original position of the small stars
  const originalPosition = {
    top: parseInt(computedStyle.top, 10),
    left: parseInt(computedStyle.left, 10),
  };

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  //check if element is over the drop zone/combine star
  function closeDragElement() {
    const dropZones = document.querySelectorAll(".dropIt");
    const elmntRect = elmnt.getBoundingClientRect();

    dropZones.forEach((dropZone) => {
      const dropZoneRect = dropZone.getBoundingClientRect();
      if (
        elmntRect.top < dropZoneRect.bottom &&
        elmntRect.bottom > dropZoneRect.top &&
        elmntRect.left < dropZoneRect.right &&
        elmntRect.right > dropZoneRect.left
      ) {
        combineIt(elmnt, dropZone);
      }
    });
    elmnt.style.top = originalPosition.top + "px";
    elmnt.style.left = originalPosition.left + "px";
    positionStars();
    positionEquation();
    document.onmouseup = null;
    document.onmousemove = null;
  }

  //combining the small star and the dropzone star
  function combineIt(elmnt, dropZone) {
    const num = parseInt(elmnt.innerText.trim());
    dropZone.querySelector("p").innerText = num;
  }

  elmnt.onmousedown = dragMouseDown;
}

//this is to position the equation (relative to the small stars)
export function positionEquation() {
  const dropZone = document.querySelector("#theEquation");
  const dragItems = document.querySelectorAll(".drag");

  let lowestStar = 0;
  dragItems.forEach((star) => {
    let starBottom = star.offsetTop + star.offsetHeight;
    if (starBottom > lowestStar) {
      lowestStar = starBottom;
    }
  });

  const gap = 20;
  const topPx = lowestStar + gap;
  const leftPx = window.innerWidth * 0.5;

  dropZone.style.position = "absolute";
  dropZone.style.top = topPx + "px";
  dropZone.style.left = leftPx + "px";
  dropZone.style.transform = "translate(-50%, 0)";
}

//this mainly controls position of the small
// stars-and adjusts based on window width
export function positionStars() {
  const containerWidth = window.innerWidth;
  const starSize = 120;
  const gap = 10;

  const dragItems = document.querySelectorAll(".drag");
  let totalStars = dragItems.length;
  let starsPerRow = Math.floor((containerWidth - starSize) / (starSize + gap));
  let lastRowCount = totalStars % starsPerRow || starsPerRow;
  let startX = (containerWidth - lastRowCount * (starSize + gap)) / 2;

  let top = 60;
  let left = 120;

  dragItems.forEach((el, index) => {
    el.style.position = "absolute";

    if (index % starsPerRow === 0 && index !== 0) {
      left = 120;
      top += starSize + gap;
    }

    if (index >= totalStars - lastRowCount) {
      left = startX + (index - (totalStars - lastRowCount)) * (starSize + gap);
    }

    el.style.top = top + "px";
    el.style.left = left + "px";
    left += starSize + gap;
  });
}

export function intialiseDragAndDrop() {
  const dragItems = document.querySelectorAll(".drag");
  dragItems.forEach(dragElement);
}

//a click sound when a button is pressed.
export function setupClickSounds() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      btnAudio.play();
    });
  });
}

export function useEffectStuff() {
  useEffect(() => {
    positionStars();
    positionEquation();
    intialiseDragAndDrop();
    setupClickSounds();

    window.addEventListener("resize", function () {
      positionStars();
      positionEquation();
    });
  }, []);
}
