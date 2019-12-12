// <⚠️ DONT DELETE THIS ⚠️>
//import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

// Operator
let btnOperators = document.querySelectorAll(".btnOperator");
let btnClear = document.querySelector(".btnClear");
let btnPlus = document.querySelector(".btnPlus");
let btnMinus = document.querySelector(".btnMinus");
let btnMultiply = document.querySelector(".btnMultiply");
let btnDivide = document.querySelector(".btnDivide");
let btnMod = document.querySelector(".btnMod");
let btnShiftLeft = document.querySelector(".btnShiftLeft");
let btnShiftRight = document.querySelector(".btnShiftRight");
let btnEqual = document.querySelector(".btnEqual");

let display = document.querySelector(".display");
let firstNumber = 0;

// Mode
let mode = "HEX";
let modeNumbers = document.querySelectorAll("p");
let modeButtons = document.querySelectorAll(".btnMode");

// Number
let btnNumbers = document.querySelectorAll(".btnNum");
let num1 = document.querySelector(".btn1");
let num2 = document.querySelector(".btn2");
let num3 = document.querySelector(".btn3");
let num4 = document.querySelector(".btn4");
let num5 = document.querySelector(".btn5");
let num6 = document.querySelector(".btn6");
let num7 = document.querySelector(".btn7");
let num8 = document.querySelector(".btn8");
let num9 = document.querySelector(".btn9");
let numA = document.querySelector(".btnA");
let numB = document.querySelector(".btnB");
let numC = document.querySelector(".btnC");
let numD = document.querySelector(".btnD");
let numE = document.querySelector(".btnE");
let numF = document.querySelector(".btnF");

function handleClear() {
  display.innerText = 0;
  modeNumbers.forEach(num => (num.innerText = 0));
}

function handleBtnAvailability(mode) {
  btnNumbers.forEach(btn => (btn.disabled = false));
  switch (mode) {
    case "DEC":
      (numA.disabled = true), (numB.disabled = true), (numC.disabled = true);
      (numD.disabled = true), (numE.disabled = true), (numF.disabled = true);
      break;
    case "OCT":
      (num8.disabled = true), (num9.disabled = true), (numA.disabled = true);
      (numB.disabled = true), (numC.disabled = true), (numD.disabled = true);
      (numE.disabled = true), (numF.disabled = true);
      break;
    case "BIN":
      (num2.disabled = true), (num3.disabled = true), (num4.disabled = true);
      (num5.disabled = true), (num6.disabled = true), (num7.disabled = true);
      (num8.disabled = true), (num9.disabled = true), (numA.disabled = true);
      (numB.disabled = true), (numC.disabled = true), (numD.disabled = true);
      (numE.disabled = true), (numF.disabled = true);
      break;
  }
}

function handleModeChange(e) {
  let clickedBtn = e.target;
  if (mode === clickedBtn.innerText) return;
  mode = clickedBtn.innerText;
  clickedBtn.classList.add("btnActive");
  modeButtons.forEach(btn => {
    if (mode !== btn.innerText) btn.classList.remove("btnActive");
  });
  handleBtnAvailability(mode);
}

function handleInput(e) {
  let beforeValue = display.innerText;
  if (parseInt(display.innerText) !== 0) {
    display.innerText += e.target.innerText;
  } else {
    display.innerText = e.target.innerText;
  }
  if (
    getDisplayValue() > BigInt("0xFFFFFFFFFFFFFFFF") ||
    display.innerText.length >= 39
  ) {
    display.innerText = beforeValue;
    return;
  }
  handleModeNumber();
}

function getDisplayValue() {
  switch (mode) {
    case "HEX":
      return BigInt("0x" + display.innerText);
    case "DEC":
      return BigInt(display.innerText);
    case "OCT":
      return BigInt("0o" + display.innerText);
    case "BIN":
      return BigInt("0b" + display.innerText);
  }
}

function handleModeNumber() {
  let displayValue = getDisplayValue();
  console.log(displayValue);
  modeNumbers.forEach(num => {
    if (num.classList.contains("displayHex")) {
      num.innerText =
        num.innerText.length <= 38
          ? displayValue
              .toString(16)
              .toUpperCase()
              .replace(/\B(?=(\w{4}|d{4})+(?!\w|d))/g, " ")
          : `${displayValue
              .toString(16)
              .toUpperCase()
              .replace(/\B(?=(\w{4}|d{4})+(?!\w|d))/g, " ")
              .slice(0, 39)}...`;
    } else if (num.classList.contains("displayDec")) {
      num.innerText =
        num.innerText.length <= 25
          ? displayValue.toString(10).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : `${displayValue
              .toString(10)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              .slice(0, 26)}...`;
    } else if (num.classList.contains("displayOct")) {
      num.innerText =
        num.innerText.length <= 26
          ? displayValue.toString(8).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : `${displayValue
              .toString(8)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              .slice(0, 27)}...`;
    } else if (num.classList.contains("displayBin")) {
      num.innerText =
        num.innerText.length <= 74
          ? displayValue.toString(2).replace(/\B(?=(\d{4})+(?!\d))/g, " ")
          : `${displayValue
              .toString(2)
              .replace(/\B(?=(\d{4})+(?!\d))/g, " ")
              .slice(0, 75)}...`;
    }
  });
}

function init() {
  btnClear.addEventListener("click", handleClear);
  modeButtons.forEach(btn => btn.addEventListener("click", handleModeChange));
  btnNumbers.forEach(btn => btn.addEventListener("click", handleInput));
}

init();
