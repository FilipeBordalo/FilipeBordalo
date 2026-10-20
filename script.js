const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

let startTimestamp = 0;
let elapsedBeforeStart = 0;
let timerId = null;
let isRunning = false;
let lapCounter = 0;

function formatTime(ms) {
  const totalMs = Math.max(0, ms);
  const minutes = Math.floor(totalMs / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const hundredths = Math.floor((totalMs % 1000) / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;}

function updateDisplay() {
  const currentElapsed = elapsedBeforeStart + (isRunning ? Date.now() - startTimestamp : 0);
  display.textContent = formatTime(currentElapsed);}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  startTimestamp = Date.now();
  timerId = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;}

function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  elapsedBeforeStart += Date.now() - startTimestamp;
  clearInterval(timerId);
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  startTimestamp = 0;
  elapsedBeforeStart = 0;
  lapCounter = 0;
  lapsList.innerHTML = '';
  updateDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;}

function addLap() {
  if (!isRunning && elapsedBeforeStart === 0) return;

  lapCounter += 1;
  const currentElapsed = elapsedBeforeStart + (isRunning ? Date.now() - startTimestamp : 0);
  const item = document.createElement('li');
  item.innerHTML = `<span class="lap-label">Volta ${lapCounter}</span><span>${formatTime(currentElapsed)}</span>`;
  lapsList.prepend(item);}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

pauseBtn.disabled = true;
updateDisplay();
