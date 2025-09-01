const API_URL = "http://localhost:5000/tasks";

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    if (task.completed) li.style.textDecoration = "line-through";

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Complete";
    toggleBtn.onclick = () => toggleTask(task._id, !task.completed);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(toggleBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value }),
  });
  input.value = "";
  fetchTasks();
}

async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
