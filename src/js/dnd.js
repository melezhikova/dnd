let draggedEl = null;
let ghostEl = null;
let elementLeft = null;
let elementTop = null;

export function pick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('task')) {
    return;
  }
  draggedEl = event.target;
  ghostEl = event.target.cloneNode(true);
  ghostEl.classList.add('dragged');
  document.body.appendChild(ghostEl);
  elementLeft = event.pageX - event.target.getBoundingClientRect().left;
  elementTop = event.pageY - window.scrollY - event.target.getBoundingClientRect().top;
  ghostEl.style.left = `${event.target.getBoundingClientRect().left}px`;
  ghostEl.style.top = `${window.scrollY + event.target.getBoundingClientRect().top}px`;
  ghostEl.style.width = `${event.target.offsetWidth}px`;
  event.target.classList.add('shaded');
}

export function moving(event) {
  event.preventDefault();
  if (!draggedEl) {
    return;
  }
  const newPlace = document.elementFromPoint(event.clientX, event.clientY);
  if (newPlace.classList.contains('task')) {
    newPlace.closest('.tasks-container').insertBefore(draggedEl, newPlace);
  } else if (newPlace.closest('.section')) {
    newPlace.closest('.section').querySelector('.tasks-container').appendChild(draggedEl);
  }
  ghostEl.style.left = `${event.pageX - elementLeft}px`;
  ghostEl.style.top = `${event.pageY - elementTop}px`;
}

export function droping(event) {
  if (!draggedEl) {
    return;
  }
  const newPlace = document.elementFromPoint(event.clientX, event.clientY);
  if (newPlace.classList.contains('section')) {
    newPlace.querySelector('.tasks-container').appendChild(draggedEl);
  } else if (newPlace.classList.contains('task')) {
    newPlace.closest('.tasks-container').insertBefore(draggedEl, newPlace);
  } else if (newPlace.closest('.section')) {
    newPlace.closest('.section').querySelector('.tasks-container').appendChild(draggedEl);
  }
  document.body.removeChild(ghostEl);
  draggedEl.classList.remove('shaded');
  draggedEl = null;
  ghostEl = null;
}
