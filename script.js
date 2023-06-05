//your JS code here. If required.
const app = document.getElementById('app');

// Create video element
const video = document.createElement('video');
video.src = 'video/beach.mp4';
video.autoplay = true;
video.loop = true;
video.muted = true;

// Create audio element
const audio = document.createElement('audio');
audio.src = 'sounds/beach.mp3';
audio.loop = true;

// Create player container
const playerContainer = document.createElement('div');
playerContainer.classList.add('player-container');
playerContainer.appendChild(audio);

// Create sound picker container
const soundPicker = document.createElement('div');
soundPicker.classList.add('sound-picker');

// Create buttons for switching between sounds
const beachSoundBtn = document.createElement('button');
beachSoundBtn.innerHTML = 'Beach Sound';
beachSoundBtn.addEventListener('click', function() {
  audio.src = 'sounds/beach.mp3';
});

const rainSoundBtn = document.createElement('button');
rainSoundBtn.innerHTML = 'Rain Sound';
rainSoundBtn.addEventListener('click', function() {
  audio.src = 'sounds/rain.mp3';
});

soundPicker.appendChild(beachSoundBtn);
soundPicker.appendChild(rainSoundBtn);

// Create time buttons
const timeSelect = document.createElement('div');
timeSelect.id = 'time-select';

const smallMins = document.createElement('button');
smallMins.innerHTML = '2 min';
smallMins.addEventListener('click', function() {
  updateTime(2);
});

const mediumMins = document.createElement('button');
mediumMins.innerHTML = '5 min';
mediumMins.addEventListener('click', function() {
  updateTime(5);
});

const longMins = document.createElement('button');
longMins.innerHTML = '10 min';
longMins.addEventListener('click', function() {
  updateTime(10);
});

timeSelect.appendChild(smallMins);
timeSelect.appendChild(mediumMins);
timeSelect.appendChild(longMins);

// Create time display
const timeDisplay = document.createElement('div');
timeDisplay.classList.add('time-display');
timeDisplay.innerHTML = '10:00';

// Create play button
const playBtn = document.createElement('button');
playBtn.classList.add('play');
playBtn.addEventListener('click', function() {
  togglePlayPause();
});

// Create progress bar
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
const progress = document.createElement('div');
progress.classList.add('progress');
progressBar.appendChild(progress);

// Add all elements to app container
app.appendChild(video);
app.appendChild(playerContainer);
app.appendChild(soundPicker);
app.appendChild(timeSelect);
app.appendChild(timeDisplay);
app.appendChild(playBtn);
app.appendChild(progressBar);

// Global variables
let totalTime = 600;
let timeLeft = 600;
let isPlaying = false;
let timerInterval;

// Function to update time display
function updateTime(minutes) {
  totalTime = minutes * 60;
  timeLeft = totalTime;
  const displayMinutes = Math.floor(totalTime / 60);
  const displaySeconds = totalTime % 60 < 10 ? '0' + (totalTime % 60) : totalTime % 60;
  timeDisplay.innerHTML = displayMinutes + ':' + displaySeconds;
  if (!isPlaying) {
    togglePlayPause();
  }
}

// Function to toggle play and pause
function togglePlayPause() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playBtn.innerHTML = 'Pause';
    timerInterval = setInterval(updateTimer, 1000);
    audio.play();
    video.play();
  } else {
    playBtn.innerHTML = 'Play';
    clearInterval(timerInterval);
    audio.pause();
    video.pause();
  }
}

