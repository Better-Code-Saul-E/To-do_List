const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const clearCompletedBtn = document.getElementById("clear-completed-button");
const localStorageBtn = document.getElementById("check-storage-button");
let tasks = [];

function isLocalStorageSupported() {
    try {
        const testKey = '__test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}


// ===== Core Functionaliy ===== //

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText });
        taskInput.value = "";
        saveTasks();
        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<label for="task-${index}">${task.text}</label>
        <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>`;
        li.querySelector("input").addEventListener("change", () => toggleTask(index));
        taskList.appendChild(li);
    });

}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
}



// ===== Local Storage ===== //

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false }); 
        taskInput.value = "";
        saveTasks(); 
        displayTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks(); 
    displayTasks();
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}




addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
localStorageBtn.addEventListener("click", () => {
    if (isLocalStorageSupported()) {
        alert('localStorage is supported in this browser!');
    } else {
        alert('Sorry, localStorage is not supported in this browser.');
    }
})

loadTasks();
displayTasks();