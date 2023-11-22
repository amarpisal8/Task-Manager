document.addEventListener('DOMContentLoaded', function () {
    const codeInput = document.getElementById('codeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const timeInput = document.getElementById('timeInput');
    const todoList = document.getElementById('todo-list');
    const deletedTasksCount = document.getElementById('deletedTasksCount');

    addTaskBtn.addEventListener('click', addTask);

    let taskCount = 0;
    let deletedCount = 0;

    function addTask() {
        const taskText = codeInput.value.trim();
        const timeValue = timeInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        taskCount++;

        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskInfo = document.createElement('span');
        taskInfo.textContent = `${taskCount}. Task: ${taskText} - Date: ${getCurrentDate()} - Time: ${timeValue}`;

        const editBtn = createButton('edit', 'edit', '', editTask);
        const deleteBtn = createButton('delete', 'trash-alt', '', deleteTask);
        const completeBtn = createButton('complete', 'check', '', completeTask);
        const cancelBtn = createButton('cancel', 'times', 'gray', cancelTask);

        taskItem.appendChild(taskInfo);
        taskItem.appendChild(deleteBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(completeBtn);
        taskItem.appendChild(cancelBtn);

        todoList.appendChild(taskItem);

        // Clear input fields
        codeInput.value = '';
        timeInput.value = '';
    }

    function createButton(className, icon, color, clickHandler) {
        const button = document.createElement('button');
        button.className = className;
        button.style.backgroundColor = color; // Set background color

        const iconSpan = document.createElement('span');
        iconSpan.className = `fas fa-${icon}`; // Add Font Awesome icon
        button.appendChild(iconSpan);

        // Add margin to the right
        button.style.marginRight = '15px';

        button.addEventListener('click', (event) => clickHandler(event));

        return button;
    }

    function editTask(event) {
        const taskItem = event.target.parentNode;
        const taskInfo = taskItem.querySelector('span');
        const newTaskText = prompt('Edit task:', taskInfo.textContent.split('Task: ')[1].split(' - Date: ')[0]);
        if (newTaskText !== null) {
            taskInfo.textContent = `${taskCount}. Task: ${newTaskText} - Date: ${getCurrentDate()} - Time: ${timeInput.value.trim()} (Edited)`;
        }
    }

    function deleteTask(event) {
        const taskItem = event.target.parentNode;
        if (confirm('Are you sure you want to delete this task?')) {
            taskItem.remove();
            deletedCount++;
            deletedTasksCount.textContent = `Deleted Tasks: ${deletedCount}`;
        }
    }

    function completeTask(event) {
        const taskItem = event.target.parentNode;
        // taskItem.style.backgroundColor = 'rgba(135, 206, 250, 0.2)';
        taskItem.querySelector('.complete').disabled = true;
    }

    function cancelTask(event) {
        const taskItem = event.target.parentNode;
        taskItem.style.textDecoration = 'line-through';
        taskItem.style.color = 'gray';
        taskItem.querySelector('.cancel').disabled = true;
    }

    function getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        // Add leading zero if month or day is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    }
});
