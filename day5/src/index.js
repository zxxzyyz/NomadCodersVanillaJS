import "./styles.css";

// You're gonna need this
const h2 = document.querySelector("h2");
const NINE_HOURS_MILLISECONDS = 32400000;

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2019-12-24:00:00:00+0900");
  const now = new Date();

  let leftTime = xmasDay - now + NINE_HOURS_MILLISECONDS;
  let day = Math.floor(leftTime / 86400000);
  let hour = Math.floor((leftTime % 86400000) / 3600000);
  let min = Math.floor(((leftTime % 86400000) % 3600000) / 60000);
  let sec = Math.floor((((leftTime % 86400000) % 3600000) % 60000) / 1000);

  day = 10 > day ? `0${day}d` : `${day}d`;
  hour = 10 > hour ? `0${hour}h` : `${hour}h`;
  min = 10 > min ? `0${min}m` : `${min}m`;
  sec = 10 > sec ? `0${sec}s` : `${sec}s`;

  h2.innerText = `${day} ${hour} ${min} ${sec}`;
}

function init() {
  setInterval(getTime, 1000);
}
init();
