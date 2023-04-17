const taskForm = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  for (const task of tasks) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'task-item');
    taskItem.innerHTML = `
      <span class="task-title${task.status === 'completed' ? ' task-completed' : ''}">${task.title}</span>
      <div class="btn-group">
        <button type="button" class="btn btn-danger task-remove">Remove</button>
        <button type="button" class="btn btn-success task-complete">Complete</button>
      </div>
    `;
    taskItem.querySelector('.task-remove').addEventListener('click', () => {
      const index = tasks.indexOf(task);
      if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
      }
    });
    taskItem.querySelector('.task-complete').addEventListener('click', () => {
      task.status = task.status === 'completed' ? 'pending' : 'completed';
      renderTasks();
    });
    taskList.appendChild(taskItem);
  }
}

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#task-title').value;
  const priority = document.querySelector('#task-priority').value;
  const status = document.querySelector('input[name="task-status"]:checked').value;
  const task = {
    title,
    priority,
    status,
  };
  tasks.push(task);
  renderTasks();
  taskForm.reset();
});
