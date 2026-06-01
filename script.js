const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateTaskCount();
});

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTask(task);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCount();
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Task text
    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;

    if (task.completed) {
        span.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed");
        updateTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateTasks();
        updateTaskCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

function updateTasks() {
    const tasks = [];

    document.querySelectorAll(".task-item").forEach(item => {
        tasks.push({
            text: item.querySelector(".task-text").textContent,
            completed: item.querySelector('input[type="checkbox"]').checked
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    const count = document.querySelectorAll(".task-item").length;
    taskCount.textContent = `Total Tasks: ${count}`;
}