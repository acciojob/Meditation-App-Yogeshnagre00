//your JS code here. If required.
// Get elements from the DOM
const videoContainer = document.querySelector('.vid-container');
const video = document.getElementById('video');
const playerContainer = document.querySelector('.player-container');
const audio = document.getElementById('audio');
const soundButtons = document.querySelectorAll('.sound-picker button');
const timeButtons = document.querySelectorAll('#time-select button');
const timeDisplay = document.querySelector('.time-display');
const playPauseButton = document.getElementById('play-pause');

let interval;
let isPlaying = false;
let selectedTime = 600;
let selectedSound = 0;

// Play or pause the audio and video
function togglePlay() {
    if (isPlaying) {
        video.pause();
        audio.pause();
        clearInterval(interval);
        playPauseButton.classList.remove('pause');
        playPauseButton.classList.add('play');
    } else {
        video.play();
        audio.play();
        interval = setInterval(updateTime, 1000);
        playPauseButton.classList.remove('play');
        playPauseButton.classList.add('pause');
    }
    isPlaying = !isPlaying;
}

// Update the time display
function updateTime() {
    let minutes = Math.floor(selectedTime / 60);
    let seconds = selectedTime % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timeDisplay.innerText = minutes + ":" + seconds;
    selectedTime--;
    if (selectedTime < 0) {
        clearInterval(interval);
        togglePlay();
        timeDisplay.innerText = "10:00";
        selectedTime = 600;
    }
}

// Set the selected sound
function setSound(soundIndex) {
    selectedSound = soundIndex;
    audio.src = "sounds/" + (selectedSound === 0 ? "beach.mp3" : "rain.mp3");
}

// Set the selected time
function setTime(timeInSeconds) {
    selectedTime = timeInSeconds;
    timeButtons.forEach(button => button.classList.remove('active'));
    if (selectedTime === 120) {
        document.getElementById('smaller-mins').classList.add('active');
    } else if (selectedTime === 300) {
        document.getElementById('medium-mins').classList.add('active');
    } else if (selectedTime === 600) {
        document.getElementById('long-mins').classList.add('active');
    }
    timeDisplay.innerText = Math.floor(selectedTime / 60) + ":00";
}

// Add event listeners
playPauseButton.addEventListener('click', togglePlay);

soundButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        soundButtons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
        setSound(index);
    });
});

timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeButtons.forEach(button => button.classList.remove('active'));
        button.classList.add('active');
        if (button.id === 'smaller-mins') {
            setTime(120);
        } else if (button.id === 'medium-mins') {
            setTime(300);
        } else if (button.id === 'long-mins') {
            setTime(600);
        }
    });
});

// Set initial values
setSound(selectedSound);
setTime(selectedTime);