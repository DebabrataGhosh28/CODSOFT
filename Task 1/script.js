document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        addTask();
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button')) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains('edit-button')) {
            editTask(e.target.parentElement);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        taskList.appendChild(taskItem);
        saveTasks();
        taskInput.value = '';
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text').textContent;
        taskInput.value = taskText;
        taskItem.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            tasks.push(taskItem.querySelector('.task-text').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
});
