document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function renderTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
            <label>
                    <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
             </label>        
                <span>${task.text}</span>
                <div>
                    <button data-action="done" data-index="${index}">Done</button>
                    <button data-action="delete" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            todoInput.value = '';
            saveTasks();
            renderTasks();
        }
    });
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName === 'BUTTON') {
            const action = target.dataset.action;
            const index = parseInt(target.dataset.index);

            if (action === 'done') {
                tasks[index].completed = !tasks[index].completed;
            } else if (action === 'delete') {
                tasks.splice(index, 1);
            }
            saveTasks();
            renderTasks();
        }
    });
    renderTasks();
});