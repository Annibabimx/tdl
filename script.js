let tasks = [];

function addTask() {
  const text = document.getElementById('new-task').value;
  const due = document.getElementById('due-date').value;

  if (!text) return;

  tasks.push({
    text,
    completed: false,
    created: new Date(),
    due: due ? new Date(due) : null,
  });

  document.getElementById('new-task').value = '';
  document.getElementById('due-date').value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('task-list');
  const filter = document.getElementById('filter').value;
  const sort = document.getElementById('sort').value;

  let filtered = tasks;

  if (filter === 'completed') {
    filtered = tasks.filter(t => t.completed);
  } else if (filter === 'pending') {
    filtered = tasks.filter(t => !t.completed);
  }

  if (sort === 'due') {
    filtered.sort((a, b) => (a.due || Infinity) - (b.due || Infinity));
  } else {
    filtered.sort((a, b) => a.created - b.created);
  }

  list.innerHTML = '';

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <div class="task-text">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
        <span style="${task.completed ? 'text-decoration: line-through;' : ''}">${task.text}</span>
      </div>
      <div class="task-actions">
        <span>${task.due ? new Date(task.due).toLocaleDateString() : new Date(task.created).toLocaleDateString()}</span>
        <button class="edit" onclick="editTask(${index})">✏</button>
        <button class="delete" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}