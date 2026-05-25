/* =========================
   Elements
========================= */

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');

const emptyMessage = document.getElementById('emptyMessage');

const darkModeToggle = document.getElementById('darkModeToggle');

const searchTask = document.getElementById('searchTask');

const dueDateInput = document.getElementById('dueDate');

const taskCounter = document.getElementById('taskCounter');

/* =========================
   Mobile Menu Toggle
========================= */

menuBtn.addEventListener('click', () => {

    navLinks.classList.toggle('show');

});

/* =========================
   Dark Mode
========================= */

darkModeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {

        darkModeToggle.textContent = '☀️';

        localStorage.setItem('theme', 'dark');

    }
    else {

        darkModeToggle.textContent = '🌙';

        localStorage.setItem('theme', 'light');
    }

});

/* =========================
   Load Theme
========================= */

window.addEventListener('DOMContentLoaded', () => {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {

        document.body.classList.add('dark-mode');

        darkModeToggle.textContent = '☀️';
    }

});

/* =========================
   Load Tasks
========================= */

window.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {

        createTask(
            task.text,
            task.completed,
            task.dueDate
        );

    });

    checkEmptyMessage();

    updateTaskCounter();
}

/* =========================
   Add Task
========================= */

addTaskBtn.addEventListener('click', () => {

    const taskText = taskInput.value.trim();

    const dueDate = dueDateInput.value;

    if (taskText === '') {

        alert('Please enter a task');

        return;
    }

    createTask(taskText, false, dueDate);

    saveTasks();

    taskInput.value = '';

    dueDateInput.value = '';

    checkEmptyMessage();

    updateTaskCounter();
});

/* =========================
   Create Task
========================= */

function createTask(taskText, completedStatus, dueDate) {

    /* Create List Item */
    const li = document.createElement('li');

    li.classList.add('task-item');

    /* Task Content Container */
    const taskContent = document.createElement('div');

    /* Task Text */
    const span = document.createElement('span');

    span.textContent = taskText;

    if (completedStatus) {

        span.classList.add('completed');
    }

    /* Complete Task */
    span.addEventListener('click', () => {

        span.classList.toggle('completed');

        saveTasks();
    });

    /* Due Date */
    const dueDateText = document.createElement('small');

    dueDateText.classList.add('due-date');

    dueDateText.textContent = dueDate
        ? `Due: ${dueDate}`
        : 'No Due Date';

    /* Append Text + Date */
    taskContent.appendChild(span);

    taskContent.appendChild(dueDateText);

    /* Delete Button */
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';

    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {

        li.remove();

        saveTasks();

        checkEmptyMessage();

        updateTaskCounter();
    });

    /* Append */
    li.appendChild(taskContent);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

/* =========================
   Save Tasks
========================= */

function saveTasks() {

    const tasks = [];

    document.querySelectorAll('.task-item').forEach(task => {

        const taskText =
            task.querySelector('span').textContent;

        const completed =
            task.querySelector('span')
                .classList.contains('completed');

        const dueDate =
            task.querySelector('.due-date')
                .textContent.replace('Due: ', '');

        tasks.push({
            text: taskText,
            completed: completed,
            dueDate: dueDate
        });

    });

    localStorage.setItem(
        'tasks',
        JSON.stringify(tasks)
    );
}

/* =========================
   Empty Message
========================= */

function checkEmptyMessage() {

    if (taskList.children.length === 0) {

        emptyMessage.style.display = 'block';
    }
    else {

        emptyMessage.style.display = 'none';
    }
}

/* =========================
   Task Counter
========================= */

function updateTaskCounter() {

    const totalTasks =
        document.querySelectorAll('.task-item').length;

    taskCounter.textContent =
        `Total Tasks: ${totalTasks}`;
}

/* =========================
   Search Tasks
========================= */

searchTask.addEventListener('keyup', () => {

    const searchValue =
        searchTask.value.toLowerCase();

    const tasks =
        document.querySelectorAll('.task-item');

    tasks.forEach(task => {

        const taskText =
            task.innerText.toLowerCase();

        if (taskText.includes(searchValue)) {

            task.style.display = 'flex';
        }
        else {

            task.style.display = 'none';
        }

    });

});