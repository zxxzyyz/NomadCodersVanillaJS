let form = document.querySelector(".inputForm");
let input = form.querySelector("input");
let pendingList = document.querySelector(".pending__list");
let finishedList = document.querySelector(".finished__list");
let localPendingLi = [];
let localFinishedLi = [];
let newid = 0;

function saveLocalPending() {
  localStorage.setItem("pendingList", JSON.stringify(localPendingLi));
  localStorage.setItem("finishedList", JSON.stringify(localFinishedLi));
}

function confirmPending(e) {
  let button = e.target;
  let list = button.parentNode;
  let span = list.querySelector("span");
  if (list.parentNode === pendingList) {
    localPendingLi = localPendingLi.filter(li => {
      return li.id !== parseInt(list.id, 10);
    });
    localFinishedLi.push({ id: parseInt(list.id, 10), text: span.innerText });
    pendingList.removeChild(list);
    button.innerText = "⏪";
    finishedList.appendChild(list);
  } else {
    localFinishedLi = localFinishedLi.filter(li => {
      return li.id !== parseInt(list.id, 10);
    });
    localPendingLi.push({ id: parseInt(list.id, 10), text: span.innerText });
    finishedList.removeChild(list);
    button.innerText = "✔";
    pendingList.appendChild(list);
  }
  saveLocalPending();
}

function removeList(e) {
  let list = e.target.parentNode;
  if (list.parentNode === pendingList) {
    localPendingLi = localPendingLi.filter(li => {
      return li.id !== parseInt(list.id, 10);
    });
    pendingList.removeChild(list);
  } else {
    localFinishedLi = localFinishedLi.filter(li => {
      return li.id !== parseInt(list.id, 10);
    });
    finishedList.removeChild(list);
  }
  saveLocalPending();
}

function addList(text, which, id = null) {
  let list = document.createElement("li");
  let listText = document.createElement("span");
  let xButton = document.createElement("button");
  let checkButton = document.createElement("button");
  let tempId = 0;
  if (id !== null) {
    tempId = id;
    newid = tempId > newid ? tempId : newid;
  } else {
    newid += 1;
    tempId = newid;
  }

  listText.innerText = text;
  xButton.innerText = "❌";
  xButton.addEventListener("click", removeList);
  which === "pending"
    ? (checkButton.innerText = "✔")
    : (checkButton.innerText = "⏪");
  checkButton.addEventListener("click", confirmPending);
  list.id = tempId;
  list.appendChild(listText);
  list.appendChild(xButton);
  list.appendChild(checkButton);
  which === "pending"
    ? pendingList.appendChild(list)
    : finishedList.appendChild(list);

  which === "pending"
    ? localPendingLi.push({ id: tempId, text: text })
    : localFinishedLi.push({ id: tempId, text: text });
  saveLocalPending();
}

function handleSubmit(e) {
  e.preventDefault();
  addList(input.value, "pending");
  input.value = "";
}

function loadList() {
  let savedPending = localStorage.getItem("pendingList");
  let savedFinished = localStorage.getItem("finishedList");
  if (savedPending !== null) {
    JSON.parse(savedPending).forEach(li => {
      addList(li.text, "pending", li.id);
    });
  }
  if (savedFinished !== null) {
    JSON.parse(savedFinished).forEach(li => {
      addList(li.text, "finished", li.id);
    });
  }
}

function init() {
  loadList();
  form.addEventListener("submit", handleSubmit);
}

init();
