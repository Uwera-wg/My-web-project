// Select elements
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const table = document.getElementById("weeklySchedule");

// Load tasks and schedule from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let scheduleTasks = JSON.parse(localStorage.getItem("scheduleTasks")) || [];

// Display tasks and schedule on page load
displayTasks();
displaySchedule();

// Add Task
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newTask = { id: Date.now(), text: input.value };
    tasks.push(newTask);
    saveTasks();
    displayTasks();
    input.value = "";
});

// Display Tasks in Task Manager
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.text}
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="submitTask(${task.id})">Submit</button>
        `;
        taskList.appendChild(li);
    });
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

// Edit Task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText;
        saveTasks();
        displayTasks();
        displaySchedule(); // update schedule if edited task is already submitted
    }
}

// Submit Task to Schedule (first empty Monday slot for now)
function submitTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Find first empty Monday cell
    const mondayCells = Array.from(table.querySelectorAll("tr td:nth-child(2)"));
    const rowIndex = mondayCells.findIndex(cell => cell.textContent.trim() === "");

    if (rowIndex !== -1) {
        scheduleTasks.push({
            text: task.text,
            dayIndex: 1, // Monday column
            rowIndex: rowIndex
        });
        saveTasks();
        displaySchedule();
        deleteTask(id);
        alert(`Task "${task.text}" added to Weekly Schedule!`);
    } else {
        alert("No empty  slots available!");
    }

    // UPDATE (Toggle Status)
function toggleStatus(id) {
    const task = tasks.find(t => t.id === id);

    task.status = task.status === "pending"
        ? "completed"
        : "pending";

    saveTasks();
    displayTasks();
}
}

// Display Schedule
function displaySchedule() {
    // Default schedule
    const defaultSchedule = [
        ["Sport", "Breakfast", "Business talk", "Office", "Online reachout"],
        ["Meeting", "Lunch", "Office", "Business talk", "Travel prep"],
        ["Meeting", "Business talk", "Kids pickup", "Sport", "Get back home"]
    ];

    // Fill table with default
    for (let r = 0; r < defaultSchedule.length; r++) {
        for (let c = 0; c < 5; c++) {
            table.rows[r + 1].cells[c + 1].textContent = defaultSchedule[r][c];
        }
    }

    // Add user-submitted tasks
    scheduleTasks.forEach(item => {
        table.rows[item.rowIndex + 1].cells[item.dayIndex].textContent = item.text;
    });
}

// Select elements
const form = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const taskList = document.getElementById("taskList");

// Store tasks in an array
let tasks = [];

// Add new task
form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop page refresh

    const newTask = {
        id: Date.now(),
        title: titleInput.value,
        description: descInput.value
    };

    tasks.push(newTask);

    displayTasks();

    form.reset(); // clear form after adding
});

// Display tasks in list
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.title + " - " + task.description;
        taskList.appendChild(li);
    });
}
// Save tasks and schedule to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("scheduleTasks", JSON.stringify(scheduleTasks));
}