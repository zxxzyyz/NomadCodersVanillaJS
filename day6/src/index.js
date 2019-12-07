// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const select = document.querySelector("select");

function handleChange() {
  const country = this.options[this.selectedIndex].text;
  if (this.selectedIndex !== 0) localStorage.setItem("from", country);
}

function loadCountry(country) {
  const options = Array.from(select.querySelectorAll("option"));
  for (let i = 0; i < options.length; i++) {
    if (country === options[i].innerText) {
      options[i].selected = true;
    }
  }
}

function init() {
  const country = localStorage.getItem("from");
  if (country) loadCountry(country);

  select.addEventListener("change", handleChange);
}

init();
