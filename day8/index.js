let description = document.querySelector(".game__description");
let range = document.querySelector(".game__inputRange");
let inputNumber = document.querySelector(".game__inputNumber");
let playButton = document.querySelector(".game__playButton");
let gameHistory = document.querySelector(".game__history");
let gameResult = document.querySelector(".game__result");
let rangeValue = range.value;

function changeRange(e) {
  rangeValue = e.target.value;
  description.innerText = `Generate a number between 0 and ${rangeValue}`;
}

function play() {
  inputNumber.value = Math.floor(Math.abs(inputNumber.value));
  let inputValue = parseInt(inputNumber.value);
  let rnd = Math.floor(Math.random() * (parseInt(rangeValue) + 1));
  gameHistory.innerText = `You chose: ${inputValue}, the machine chose: ${rnd}.`;
  gameResult.innerText = inputValue === rnd ? "You won!" : "You lost!"
}

function handleEnter(e) {
  if (58 > e.keyCode && e.keyCode > 47) {
    inputNumber.value = inputNumber.value + (e.keyCode - 48);
  }
  if (e.keyCode === 13 || e.keyCode === 32) {
    play();
  }
}

function init() {
  alert("Press 0~9 to enter a number.\nPress enter or space to play the game");
  range.addEventListener("input", changeRange);
  playButton.addEventListener("click", play);
  window.addEventListener("keypress", handleEnter)
}

init();