const state = {
  todos: [],
  filter: "all",
};

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}

function loadTodos() {
  const raw = localStorage.getItem("todos");

  state.todos = raw ? JSON.parse(raw) : [];
}

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const itemCount = document.getElementById("itemCount");
const clearBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

function render() {
  const visible = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  todoList.innerHTML = "";

  visible.forEach((todo) => {
    const li = createTodoElement(todo);
    todoList.appendChild(li);
  });

  updateCount();
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = `todo-item${todo.completed ? " completed" : ""}`;
  li.dataset.id = todo.id;

  const check = document.createElement("span");
  check.className = "todo-check";
  check.dataset.action = "toggle";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;
  span.dataset.action = "toggle";

  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.textContent = "✕";
  delBtn.dataset.action = "delete";
  delBtn.setAttribute("aria-label", "Delete todo");

  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(delBtn);

  return li;
}

function updateCount() {
  const activeCount = state.todos.filter((t) => !t.completed).length;
  itemCount.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTodo = {
    id: Date.now(),
    text: trimmed,
    completed: false,
  };

  state.todos.push(newTodo);
  saveTodos();
  render();
}

function deleteTodo(id) {
  state.todos = state.todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = state.todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function updateTodoText(id, newText) {
  const trimmed = newText.trim();

  if (!trimmed) {
    deleteTodo(id);
    return;
  }
  const todo = state.todos.find((t) => t.id === id);
  if (todo) {
    todo.text = trimmed;
    saveTodos();
    render();
  }
}

function clearCompleted() {
  state.todos = state.todos.filter((t) => !t.completed);
  saveTodos();
  render();
}

function startEditing(li) {
  if (li.classList.contains("editing")) return;
  li.classList.add("editing");

  const id = Number(li.dataset.id);
  const todo = state.todos.find((t) => t.id === id);
  const span = li.querySelector(".todo-text");

  const input = document.createElement("input");
  input.className = "edit-input";
  input.type = "text";
  input.value = todo.text;

  span.classList.add("hidden");
  li.insertBefore(input, span);
  input.focus();

  input.setSelectionRange(input.value.length, input.value.length);

  function finishEdit() {
    updateTodoText(id, input.value);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEdit();
    if (e.key === "Escape") render();
  });

  input.addEventListener("blur", finishEdit);
}

todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;

  const id = Number(li.dataset.id);
  const action = e.target.dataset.action;

  if (action === "delete") {
    deleteTodo(id);
  } else if (action === "toggle") {
    toggleTodo(id);
  }
});

todoList.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("todo-text")) {
    const li = e.target.closest(".todo-item");
    if (li) startEditing(li);
  }
});

addBtn.addEventListener("click", () => {
  addTodo(todoInput.value);
  todoInput.value = "";
  todoInput.focus();
});

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo(todoInput.value);
    todoInput.value = "";
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    state.filter = btn.dataset.filter;
    render();
  });
});

clearBtn.addEventListener("click", clearCompleted);

loadTodos();
render();
