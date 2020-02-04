const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
};

loadEventListeners();

function getTasks() {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = task;
  
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
  
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();

  if(taskInput.value === '') {
    alert('Please fill the input!');
    return false;
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.textContent = taskInput.value;

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);
  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

};

function storeTaskInLocalStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {

  const parentItem = e.target.parentElement.parentElement;

  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      taskList.removeChild(parentItem);

      removeTaskFromLocalStorage(parentItem);
    }
  }
};

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  const filtered = tasks.filter(task => taskItem.textContent !== task);
  localStorage.setItem('tasks', JSON.stringify(filtered));

};

function clearTasks(e) {
  e.preventDefault();

  if(confirm('Are you sure?')) {
    taskList.innerHTML = '';  
    clearTasksFromLocalStorage();
  }  
};

function clearTasksFromLocalStorage() {
  localStorage.clear();
};

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.textContent;
    if(item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

};