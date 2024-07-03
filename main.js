let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask);

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
    let resultHTML = "";
    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteTask()">Delete</button>
                </div>
            </div>`;
        } else {
            resultHTML += `<div class="task">
                <div>${taskList[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                    <button onclick="deleteTask()">Delete</button>
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

function deleteTask() {
    console.log("삭제");
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
