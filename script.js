"use strict";

// -------------------- DOM --------------------
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const list = document.getElementById("list");
const countAll = document.getElementById("countAll");
const countDone = document.getElementById("countDone");
const message = document.getElementById("message");

// -------------------- State --------------------
let todos = []; // each item: { id, text, done }

// -------------------- Helpers --------------------
const showMessage = (text, isError = false) => {
  message.textContent = text;
  message.classList.toggle("error", isError);
};

// -------------------- Render --------------------
const render = () => {
  list.innerHTML = "";

  todos.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = item.done ? "todo done" : "todo";

    li.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""} />
      <span class="text">${item.text}</span>
      <button type="button" class="delete-btn" data-index="${index}">✕</button>
    `;

    list.appendChild(li);
  });

  countAll.textContent = String(todos.length);
  countDone.textContent = String(todos.filter((t) => t.done).length);
};

// -------------------- Add Todo --------------------
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    showMessage("Please enter a task.", true);
    return;
  }

  todos.push({
    id: Date.now(),
    text,
    done: false,
  });

  todoInput.value = "";
  showMessage("", false);
  render();
});

// Initial render
render();
