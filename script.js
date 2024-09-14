const inputBox = document.getElementById('text-input');
const list = document.getElementById('list-container');

// Function to add a task
function addTask() {
    const task = inputBox.value.trim();  // Trim to remove leading/trailing spaces
    if (task === '') {
        alert("Please enter any task");
    } else {
        let li = document.createElement("li");
        li.textContent = task;
        let span = document.createElement("span");
        span.innerHTML = "X";
        li.appendChild(span);
        list.appendChild(li);
        saveTasks();  // Save tasks to localStorage
    }
    inputBox.value = '';
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.checked) {
            li.classList.add('checked');
        }
        let span = document.createElement("span");
        span.innerHTML = "X";
        li.appendChild(span);
        list.appendChild(li);
    });
}

// Event listener for list container
const listContainer = document.getElementById('list-container');
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();  // Save tasks to localStorage when a task is checked/unchecked
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();  // Save tasks to localStorage when a task is removed
    }
}, false);

// Load tasks when the page is loaded
window.addEventListener('load', loadTasks);
