// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

/* global BigInt */
let isNewNum = true;
let display = document.querySelector(".display");
let displayHex = document.querySelector(".displayHex");
let displayDec = document.querySelector(".displayDec");
let displayOct = document.querySelector(".displayOct");
let displayBin = document.querySelector(".displayBin");

// Operand
let result = BigInt(0);
let lastNum = BigInt(0);
let lastOperator;

// Operator
const Operators = Object.freeze({
  Addition: 0,
  Substraction: 1,
  Multiplication: 2,
  Division: 3,
  Modulus: 4,
  LeftShift: 5,
  RightShift: 6,
  Equal: 7
});
let operator = Operators.Addition;
let btnOperators = document.querySelectorAll(".btnOperator");
let btnClear = document.querySelector(".btnClear");

// Mode
let mode = "HEX";
let modeNumbers = document.querySelectorAll("p");
let btnModes = document.querySelectorAll(".btnMode");

// Number
let btnNumbers = document.querySelectorAll(".btnNum");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");
let btn4 = document.querySelector(".btn4");
let btn5 = document.querySelector(".btn5");
let btn6 = document.querySelector(".btn6");
let btn7 = document.querySelector(".btn7");
let btn8 = document.querySelector(".btn8");
let btn9 = document.querySelector(".btn9");
let btnA = document.querySelector(".btnA");
let btnB = document.querySelector(".btnB");
let btnC = document.querySelector(".btnC");
let btnD = document.querySelector(".btnD");
let btnE = document.querySelector(".btnE");
let btnF = document.querySelector(".btnF");

function handleClear() {
  isNewNum = true;
  result = BigInt(0);
  display.innerText = 0;
  operator = Operators.Addition;
  modeNumbers.forEach(num => (num.innerText = 0));
}

function changeBtnAvailability() {
  btnNumbers.forEach(btn => (btn.disabled = false));
  switch (mode) {
    case "DEC":
      btnA.disabled = true;
      btnB.disabled = true;
      btnC.disabled = true;
      btnD.disabled = true;
      btnE.disabled = true;
      btnF.disabled = true;
      break;
    case "OCT":
      btn8.disabled = true;
      btn9.disabled = true;
      btnA.disabled = true;
      btnB.disabled = true;
      btnC.disabled = true;
      btnD.disabled = true;
      btnE.disabled = true;
      btnF.disabled = true;
      break;
    case "BIN":
      btn2.disabled = true;
      btn3.disabled = true;
      btn4.disabled = true;
      btn5.disabled = true;
      btn6.disabled = true;
      btn7.disabled = true;
      btn8.disabled = true;
      btn9.disabled = true;
      btnA.disabled = true;
      btnB.disabled = true;
      btnC.disabled = true;
      btnD.disabled = true;
      btnE.disabled = true;
      btnF.disabled = true;
      break;
    default:
      alert("Error");
  }
}

function changeDisplayMode() {
  switch (mode) {
    case "HEX":
      return displayHex.innerText;
    case "DEC":
      return displayDec.innerText;
    case "OCT":
      return displayOct.innerText;
    case "BIN":
      return displayBin.innerText;
    default:
      alert("Error");
  }
}

function handleModeChange(e) {
  let clickedBtn = e.target;
  if (mode === clickedBtn.innerText) return;
  mode = clickedBtn.innerText;
  clickedBtn.classList.add("btnActive");
  btnModes.forEach(btn => {
    if (mode !== btn.innerText) btn.classList.remove("btnActive");
  });
  changeBtnAvailability();
  display.innerText = changeDisplayMode();
  handleModeNumber();
}

function handleInput(e) {
  let beforeValue = display.innerText;

  if (isNewNum) {
    isNewNum = false;
    display.innerText = e.target.innerText;
  } else if (parseInt(display.innerText, 10) !== 0) {
    display.innerText += e.target.innerText;
  } else {
    display.innerText = e.target.innerText;
  }

  if (isLimit()) {
    display.innerText = beforeValue;
    return;
  }

  handleModeNumber();
}

function getDisplayValue() {
  let isNegative = display.innerText.includes("-");
  switch (mode) {
    case "HEX":
      return !isNegative
        ? BigInt("0x" + display.innerText.replace(/\s|,/g, ""))
        : BigInt("0x" + display.innerText.replace(/\s|,|-/g, "")) * BigInt(-1);
    case "DEC":
      return !isNegative
        ? BigInt(display.innerText.replace(/\s|,/g, ""))
        : BigInt(display.innerText.replace(/\s|,|-/g, "")) * BigInt(-1);
    case "OCT":
      return !isNegative
        ? BigInt("0o" + display.innerText.replace(/\s|,/g, ""))
        : BigInt("0o" + display.innerText.replace(/\s|,|-/g, "")) * BigInt(-1);
    case "BIN":
      return !isNegative
        ? BigInt("0b" + display.innerText.replace(/\s|,/g, ""))
        : BigInt("0b" + display.innerText.replace(/\s|,|-/g, "")) * BigInt(-1);
    default:
      alert("Error");
  }
}

function handleModeNumber() {
  let displayValue = getDisplayValue();
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

function changeFormat(num) {
  switch (mode) {
    case "HEX":
      return num.toString(16).toUpperCase();
    case "DEC":
      return num.toString(10);
    case "OCT":
      return num.toString(8);
    case "BIN":
      return num.toString(2);
    default:
      alert("Error");
  }
}

function setResult() {
  let op = operator === Operators.Equal ? lastOperator : operator;
  if (op === Operators.Addition) {
    result = result + lastNum;
  } else if (op === Operators.Substraction) {
    result = result - lastNum;
  } else if (op === Operators.Multiplication) {
    result = result * lastNum;
  } else if (op === Operators.Division) {
    try {
      result = result / lastNum;
    } catch (err) {
      alert("Can not divide by 0");
    }
  } else if (op === Operators.Modulus) {
    result = result % lastNum;
  } else if (op === Operators.LeftShift) {
    result = result << lastNum;
  } else if (op === Operators.RightShift) {
    result = result >> lastNum;
  }
}

function isLimit() {
  if (
    getDisplayValue() > BigInt("0xFFFFFFFFFFFFFFFF") ||
    display.innerText.length > 32
  ) {
    alert("Reached limit. Clearing...");
    handleClear();
    return true;
  } else {
    return false;
  }
}

function handleOperation(e) {
  if (isNewNum && result !== 0 && lastNum !== 0) {
    if (
      (e.target.innerText === "+" && operator === Operators.Addition) ||
      (e.target.innerText === "-" && operator === Operators.Substraction) ||
      (e.target.innerText === "*" && operator === Operators.Multiplication) ||
      (e.target.innerText === "/" && operator === Operators.Division) ||
      (e.target.innerText === ">>" && operator === Operators.Modulus) ||
      (e.target.innerText === "%" && operator === Operators.LeftShift) ||
      (e.target.innerText === "<<" && operator === Operators.RightShift) ||
      (e.target.innerText === "=" && operator === Operators.Equal)
    ) {
      setResult();
      if (!isLimit()) {
        display.innerText = changeFormat(result);
        handleModeNumber();
        isNewNum = true;
      }
    }
  }

  if (!isNewNum && !isLimit()) {
    lastNum = getDisplayValue();
    setResult();
    if (!isLimit()) {
      display.innerText = changeFormat(result);
      handleModeNumber();
      isNewNum = true;
    }
  }

  if (e.target.innerText === "+") operator = Operators.Addition;
  if (e.target.innerText === "-") operator = Operators.Substraction;
  if (e.target.innerText === "*") operator = Operators.Multiplication;
  if (e.target.innerText === "/") operator = Operators.Division;
  if (e.target.innerText === "%") operator = Operators.Modulus;
  if (e.target.innerText === "<<") operator = Operators.LeftShift;
  if (e.target.innerText === ">>") operator = Operators.RightShift;
  if (e.target.innerText === "=") operator = Operators.Equal;
  if (e.target.innerText !== "=") lastOperator = operator;
}

function init() {
  btnClear.addEventListener("click", handleClear);
  btnModes.forEach(btn => btn.addEventListener("click", handleModeChange));
  btnNumbers.forEach(btn => btn.addEventListener("click", handleInput));
  btnOperators.forEach(btn => btn.addEventListener("click", handleOperation));
}

init();
