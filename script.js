//your JS code here. If required.
const app = document.getElementById('app');
const videoContainer = document.querySelector('.vid-container');
const video = document.getElementById('video');
const audio = document.getElementById('audio');
const soundButtons = document.querySelectorAll('.sound-picker button');
const timeButtons = document.querySelectorAll('.time-select button');
const timeDisplay = document.querySelector('.time-display');
const playButton = document.querySelector('.play');

let currentTime = 10 * 60; // 10 minutes in seconds
let isPlaying = false;

function updateTimer() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(duration) {
  currentTime = duration * 60;
  updateTimer();

  const timer = setInterval(() => {
    currentTime--;
    updateTimer();

    if (currentTime <= 0) {
      clearInterval(timer);
      pauseMeditation();
    }
  }, 1000);
}

function pauseMeditation() {
  isPlaying = false;
  video.pause();
  audio.pause();
  playButton.textContent = 'Play';
}

function playMeditation() {
  isPlaying = true;
  video.play();
  audio.play();
  playButton.textContent = 'Pause';
}

soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    const soundFile = button.id === 'sound1' ? 'beach.mp3' : 'rain.mp3';
    audio.src = `sounds/${soundFile}`;
	  audio.play();

// Update the active button styling
soundButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
});
});

timeButtons.forEach(button => {
button.addEventListener('click', () => {
const time = button.id === 'smaller-mins' ? 2 : button.id === 'medium-mins' ? 5 : 10;
startTimer(time);
// Update the active button styling
timeButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
});
});

playButton.addEventListener('click', () => {
if (isPlaying) {
pauseMeditation();
} else {
playMeditation();
}
});