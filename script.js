"use strict";

let addTaskButton = document.querySelector('#add-task-button');
let removeButtons = document.querySelectorAll('.delete-btn');
let listTask = document.querySelector('#task-list');
let inputTask = document.querySelector('#input-task');
let toDoList = [
];

document.getElementById('input-task').addEventListener('keyup',(e)=>{
    if (e.keyCode === 13){
        addTask();
    }
})
function loadLocalStorage() {
    if (localStorage.getItem("tasks")) {
        toDoList = JSON.parse(localStorage.getItem("tasks")) || [];
        showTasks();
    }
}

loadLocalStorage();

function addTask() {

    let newTask = {
        taskName: inputTask.value,
        checked: false
    }

    if (inputTask.value !== "") {
        toDoList.push(newTask);
        showTasks();
        updateLocalStorage();
    }
}

function showTasks() {
    let tasksTemplate = '';

    toDoList.forEach(function(item, index) {
        document.getElementById("input-task").value = '';

        tasksTemplate += `
        <li>
            <input type="checkbox" class="check" onclick="checkedTask(${index})" ${item.checked ? 'checked' : ''}>
            <span class="task">${item.taskName}</span>
            <button class="delete-btn"  onclick="removeTask(${index})">x</button>
        </li>
        `;
    });

    listTask.innerHTML = tasksTemplate;
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(toDoList));
}

function removeTask(index) {
    toDoList.splice(index, 1);
    updateLocalStorage();
    showTasks();
    return this.parentNode.remove();
}

function checkedTask(index) {
    toDoList[index].checked = !toDoList[index].checked;
    updateLocalStorage();
    showTasks();
}

function clearAll() {
    localStorage.clear();
    while (listTask.firstChild) {
        listTask.removeChild(listTask.firstChild);
    }
    toDoList = [];    
}

function toggleTheme(theme) {
    const body = document.body;
    body.classList.remove('dark', 'light')
    if (theme == 'dark') {
        body.classList.add('dark')
    } else {
        body.classList.add('light')
    }
}
