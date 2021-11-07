import addingTask from './task';

const todoBox = document.querySelector('.todo');
const inProgressBox = document.querySelector('.inProgress');
const doneBox = document.querySelector('.done');

export function save() {
  const todoTasks = [];
  const inProgressTasks = [];
  const doneTasks = [];

  let tasksEls = Array.from(todoBox.querySelectorAll('.task'));
  if (tasksEls) {
    tasksEls.forEach((item) => {
      todoTasks.push(item.textContent);
    });
  }

  tasksEls = Array.from(inProgressBox.querySelectorAll('.task'));
  if (tasksEls) {
    tasksEls.forEach((item) => {
      inProgressTasks.push(item.textContent);
    });
  }

  tasksEls = Array.from(doneBox.querySelectorAll('.task'));
  if (tasksEls) {
    tasksEls.forEach((item) => {
      doneTasks.push(item.textContent);
    });
  }
  localStorage.setItem('todoTasks', JSON.stringify({ tasks: todoTasks }));
  localStorage.setItem('inProgressTasks', JSON.stringify({ tasks: inProgressTasks }));
  localStorage.setItem('doneTasks', JSON.stringify({ tasks: doneTasks }));
}

export function load() {
  let savedTasks;

  try {
    savedTasks = JSON.parse(localStorage.getItem('todoTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addingTask(item, todoBox);
      });
    }
  } catch (e) {
    throw new Error('Invalid todoTasks');
  }

  try {
    savedTasks = JSON.parse(localStorage.getItem('inProgressTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addingTask(item, inProgressBox);
      });
    }
  } catch (e) {
    throw new Error('Invalid inProgressTasks');
  }

  try {
    savedTasks = JSON.parse(localStorage.getItem('doneTasks'));
    if (savedTasks.tasks) {
      savedTasks.tasks.forEach((item) => {
        addingTask(item, doneBox);
      });
    }
  } catch (e) {
    throw new Error('Invalid doneTasks');
  }
}
