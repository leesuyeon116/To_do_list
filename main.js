let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

for(let i = 1; i < tabs.length; i ++) {
    tabs[i].addEventListener("click", function (event) {
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        mode = event.target.id;
        filter(event);
    });
}

function addTask() {
    let task = { 
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    render();
    console.log(taskList);
}

function render() {
    let list = [];
    if(mode === "all") {
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        list = filterList;
    }

    let resultHTML = "";
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div class="button-box">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; // 현재 값의 반대 값을 넣어줌 (true는 false로, false는 true로)
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }

    filterList = taskList.filter(task => {
        if (mode === "ongoing") {
            return !task.isComplete;
        } else if (mode === "done") {
            return task.isComplete;
        } else {
            return true;
        }
    });

    render();
}

function filter(event) {
    mode = event.target.id;
    filterList = [];
    if(mode === "all") {   
        render();
    } else if(mode === "ongoing") {  
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행 중", filterList);
    } else if(mode === "done") {   
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
