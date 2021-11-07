function activeTask(event) {
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.taskDelete').classList.add('visible');
}

function deactiveTask(event) {
  event.currentTarget.classList.remove('active');
  event.currentTarget.querySelector('.taskDelete').classList.remove('visible');
}

function deleteTask(event) {
  event.preventDefault();
  event.currentTarget.closest('.task').remove();
}

export default function addingTask(text, section) {
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = text;
  section.querySelector('.tasks-container').appendChild(task);
  task.addEventListener('mouseover', activeTask);
  task.addEventListener('mouseout', deactiveTask);

  const taskDelete = document.createElement('button');
  taskDelete.className = 'taskDelete';
  task.appendChild(taskDelete);
  taskDelete.addEventListener('click', deleteTask);
}
