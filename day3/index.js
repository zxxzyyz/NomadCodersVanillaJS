const h1 = document.querySelector("#js-h1");

function handleMouseOver() {
  h1.className = "";
  h1.innerText = "The mouse is here!";
  h1.classList.add("mouseOver");
}

function handleMouseOut() {
  h1.className = "";
  h1.innerText = "The mouse is gone!";
  h1.classList.add("mouseOut");
}

function handleContextMenu() {
  h1.className = "";
  h1.innerText = "That was right click!";
  h1.classList.add("rightClick");
}

function handleResize() {
  h1.className = "";
  h1.innerText = "You just resized!";
  h1.classList.add("resize");
}

function init() {
  h1.addEventListener("mouseout", handleMouseOut);
  h1.addEventListener("mouseover", handleMouseOver);
  window.addEventListener("contextmenu", handleContextMenu);
  window.addEventListener("resize", handleResize);
}

init();