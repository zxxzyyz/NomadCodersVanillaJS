function handleResize() {
  const width = window.innerWidth;
  if (width > 1200) {
    document.body.style.background = "#FFFF00";
  } else if (width > 900) {
    document.body.style.background = "#7F00FF";
  } else {
    document.body.style.background = "#0076C4";
  }
}

function init() {
  window.addEventListener("resize", handleResize);
}

init();
