const body = document.body;
const toggleButton = document.getElementById('toggle-mode');

function toggleMode() {
  body.classList.toggle('dark-mode');
  updateToggleButton();
}

function updateToggleButton() {
  const isDarkMode = body.classList.contains('dark-mode');
  toggleButton.textContent = isDarkMode ? '🌄 Sunrise - Enable Light Mode' : '🌇 Sunset - Enable Dark Mode';
}

toggleButton.addEventListener('click', toggleMode);

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const progressBar = document.getElementById('progressBar');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

let totalSeconds = 1500; // 25 minutes
let remainingSeconds = totalSeconds;
let countdownInterval;

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateTimer() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
}

function updateProgressBar() {
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  progressBar.style.width = `${progress}%`;
}

function startTimer() {
  const startTime = new Date().getTime();
  const endTime = startTime + remainingSeconds * 1000;

  updateTimer();
  updateProgressBar();

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    remainingSeconds = Math.round((endTime - currentTime) / 1000);

    if (remainingSeconds >= 0) {
      updateTimer();
      updateProgressBar();
    } else {
      clearInterval(countdownInterval);
      startButton.disabled = false;
      pauseButton.disabled = true;

      // Add celebratory animation and "good work" text
      const celebrationDiv = document.createElement('div');
      celebrationDiv.classList.add('celebration');
      celebrationDiv.innerHTML = `
        <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmI5NDBmOWEwZGViYTc5N2VlMDdkNWNkMzhmNTZlYjc0MzkxYTY4MSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/xUo4bgmNTQ5Idr4p78/giphy.gif" alt="Celebration"><button style="border: none; background: none; cursor: pointer; text-decoration: underline; color: blue;" onclick="window.location.href='https://codepen.io/jacquelinechan09/pen/GRYxqNV'">Click here to return to the timer</button>`;
      body.appendChild(celebrationDiv);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdownInterval);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function stopTimer() {
  clearInterval(countdownInterval);
  remainingSeconds = totalSeconds;
  updateTimer();
  updateProgressBar();
  startButton.disabled = false;
  pauseButton.disabled = true;
}

startButton.addEventListener('click', () => {
  totalSeconds = document.getElementById('study-duration').value * 60;
  remainingSeconds = totalSeconds;
  startTimer();
  startButton.disabled = true;
  pauseButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
  pauseTimer();
});

window.addEventListener('DOMContentLoaded', () => {
  startButton.disabled = false;
  pauseButton.disabled = true;
  updateToggleButton();
});
