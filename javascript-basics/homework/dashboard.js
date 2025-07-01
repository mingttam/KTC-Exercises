// Theme handling
let isDarkTheme = false;
const themeToggle = document.getElementById('themeToggle');

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = isDarkTheme ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', toggleTheme);

// Clock and greeting
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('clock').textContent = timeString;

    const hour = now.getHours();
    let greeting = '';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    document.getElementById('greeting').textContent = greeting;
}

setInterval(updateClock, 1000);
updateClock();

// Todo list 
const todoColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
let currentFilter = 'all';

function addTodo() {
    const input = document.getElementById('todoInput');
    const errorElement = document.getElementById('todoError');
    
    if (!input.value.trim()) {
        errorElement.style.display = 'block';
        return;
    }
    errorElement.style.display = 'none';

    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        filterTodos(currentFilter);
    });

    const span = document.createElement('span');
    span.textContent = input.value;
    span.style.marginLeft = '10px';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.style.marginLeft = 'auto';
    deleteBtn.onclick = () => li.remove();

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    input.value = '';
}

function filterTodos(filter) {
    currentFilter = filter;
    const todos = document.querySelectorAll('.todo-item');
    
    todos.forEach(todo => {
        switch(filter) {
            case 'completed':
                todo.style.display = todo.classList.contains('completed') ? '' : 'none';
                break;
            case 'incomplete':
                todo.style.display = !todo.classList.contains('completed') ? '' : 'none';
                break;
            default:
                todo.style.display = '';
        }
    });
}

// Sticky notes functionality
function getRandomColor() {
    return todoColors[Math.floor(Math.random() * todoColors.length)];
}

function addNote() {
    const input = document.getElementById('noteInput');
    const errorElement = document.getElementById('noteError');
    
    if (!input.value.trim()) {
        errorElement.style.display = 'block';
        return;
    }
    errorElement.style.display = 'none';

    const notesContainer = document.getElementById('notesContainer');
    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = getRandomColor();

    const text = document.createElement('p');
    text.textContent = input.value;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = () => note.remove();

    note.appendChild(deleteBtn);
    note.appendChild(text);
    notesContainer.appendChild(note);
    
    input.value = '';
}

// Enter key handling
document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

document.getElementById('noteInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNote();
});