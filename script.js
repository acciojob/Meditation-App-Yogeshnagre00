//your JS code here. If required.
const meditationVideo = document.getElementById("meditation-video");
const meditationAudio1 = document.getElementById("meditation-audio");
const meditationAudio2 = document.getElementById("meditation-audio-2");
const audio1Button = document.getElementById("audio-1");
const audio2Button = document.getElementById("audio-2");
const timeDisplay = document.querySelector(".time-display");
const playButton = document.querySelector(".play");
const timeSelectButtons = document.querySelectorAll("#time-select button");

let meditationTimer = null;
let remainingTime = 10 * 60;

function setTime(minutes) {
  remainingTime = minutes * 60;
  updateTimeDisplay();
}

function updateTimeDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  if (meditationTimer) {
    return;
  }

  playButton.classList.add("playing");
  meditationVideo.play();
  meditationAudio1.play();

  meditationTimer = setInterval(() => {
    remainingTime -= 1;
    updateTimeDisplay();
