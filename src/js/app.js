// TODO: write your code here
import { save, load } from './saving';
import addingTask from './task';
import { pick, moving, droping } from './dnd';

const container = document.querySelector('.container');

container.addEventListener('mousedown', pick);
container.addEventListener('mousemove', moving);
container.addEventListener('mouseup', droping);

function closeInput(section) {
  section.removeChild(section.querySelector('.inputTask'));
  section.removeChild(section.querySelector('.buttonsBox'));
  const button = section.querySelector('.addbtn');
  button.textContent = '+ Add another card';
}

function addNewTask(event) {
  event.preventDefault();
  const section = event.currentTarget.closest('.section');
  const newTaskText = section.querySelector('.inputTask').value;
  if (!newTaskText) {
    alert('Enter a title for this card!');
  } else {
    addingTask(newTaskText, section);
    closeInput(section);
  }
}

function cancelNewTask(event) {
  event.preventDefault();
  const section = event.currentTarget.closest('.section');
  closeInput(section);
}

function addCard(event) {
  event.currentTarget.textContent = '';
  const inputEl = document.createElement('input');
  inputEl.className = 'inputTask';
  inputEl.placeholder = 'Enter a title for this card...';
  const buttonsBox = document.createElement('div');
  buttonsBox.className = 'buttonsBox';
  const addButton = document.createElement('button');
  addButton.className = 'addButton';
  addButton.textContent = 'Add Card';
  const cancelButton = document.createElement('button');
  cancelButton.className = 'cancelButton';
  buttonsBox.appendChild(addButton);
  buttonsBox.appendChild(cancelButton);
  const section = event.currentTarget.closest('.section');
  section.appendChild(inputEl);
  section.appendChild(buttonsBox);
  inputEl.focus();

  cancelButton.addEventListener('click', cancelNewTask);
  addButton.addEventListener('click', addNewTask);
}

const addButtons = Array.from(document.querySelectorAll('.addbtn'));
addButtons.forEach((item) => item.addEventListener('click', addCard));

load();

setInterval(() => {
  save();
}, 5000);

// функция для теста, чтобы не ругался appveyor
export default function demo(value) {
  return value;
}
