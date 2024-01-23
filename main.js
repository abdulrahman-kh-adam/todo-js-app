// Catch html elements
const textInput = document.querySelector(".input");
const submitBut = document.querySelector(".submit");
const tasksCont = document.querySelector(".tasks");

// Empty array to store tasks
let tasksArray = [];

// Check if there is tasks in local storage
if(localStorage.getItem("Tasks")){
    tasksArray = JSON.parse(localStorage.getItem("Tasks"));
    getFromLocalStorage();
}

// If there is no task
if(tasksArray.length === 0){
    tasksCont.innerHTML = "There are no tasks to display!";
}

// Add task function
submitBut.onclick = function () {
    if(textInput.value !== ""){
        addToTasks(textInput.value);
        textInput.value = "";
    }
};

// Click on task
tasksCont.addEventListener("click", e => {
    if(e.target.classList.contains("delete")){
        deleteFromLocalStorage(e.target.parentElement.getAttribute("task-id"));
        e.target.parentElement.remove();
        if(tasksArray.length === 0){
            tasksCont.innerHTML = "There are no tasks to display!";
        }
    }
    if(e.target.classList.contains("task")){
        for(let i = 0; i < tasksArray.length; i++){
            if(tasksArray[i].id == e.target.getAttribute("task-id")){
                tasksArray[i].completed = !tasksArray[i].completed;
                console.log(tasksArray);
                addToLocalStorage(tasksArray);
                displayTasks(tasksArray);
                break;
            }
        }
    }
});

// Add a task to tasks array
function addToTasks(taskDetails){
    let task = {
        id: Date.now(),
        details: taskDetails,
        completed: false
    }
    tasksArray.push(task);
    displayTasks(tasksArray);
    addToLocalStorage(tasksArray);
}

// Display all tasks in tasks div
function displayTasks(tasksArr){
    tasksCont.innerHTML = "";
    tasksArr.forEach(task => {
        // Create a div to contain task
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";
        if(task.completed) {
            taskDiv.className = "task done";
        }
        taskDiv.setAttribute("task-id", task.id);
        taskDiv.appendChild(document.createTextNode(task.details));
        // Create a span to hold the delete button
        let deleteSpan = document.createElement("span");
        deleteSpan.className = "delete";
        deleteSpan.appendChild(document.createTextNode("Delete"));
        // Append button to task div
        taskDiv.appendChild(deleteSpan);
        // Add task div to html file
        tasksCont.appendChild(taskDiv);
    });
}

function addToLocalStorage(arr){
    window.localStorage.setItem("Tasks", JSON.stringify(arr));
}

function getFromLocalStorage() {
    let data = window.localStorage.getItem("Tasks");
    if(data) {
        let tasks = JSON.parse(data);
        displayTasks(tasks);
    }
}

function deleteFromLocalStorage(taskId) {
    tasksArray = tasksArray.filter(task => task.id != taskId);
    addToLocalStorage(tasksArray);
}