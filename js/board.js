let taskToMove = '';
let searchTaskObj = [];
/**
 * this function renders all tasks.
 */
async function renderTasks() {
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    contactJSON = await loadJSON(KEY_for_JSON_CONTACS);
    loginJson = await loadJSON(KEY_for_JSON_PW);
    clearContainer();
    renderAllContainer(taskJson)
}

/**
 * This function renders all status container based on the JSON
 * 
 * @param {object} jsonObj - contains data which schould used for rendering
 */
function renderAllContainer(jsonObj){
    renderStatusContainer('toDo', 'idTaskToDo', jsonObj);
    renderStatusContainer('inProgress', 'idTaskInProgress', jsonObj);
    renderStatusContainer('awaitFeedback', 'idTaskAwaitFeedback', jsonObj);
    renderStatusContainer('done', 'idTaskDone', jsonObj);
}


/**
 * this function renders all tasks from JSON which flagged with the given status.
 * 
 * @param {string} status 
 * @param {string} taskContainerId 
 */
function renderStatusContainer(status, taskContainerId, jsonObj) {
    let singleTaskCount = 0;
    for (let i = 0; i < jsonObj.length; i++) {
        //let taskNumber = i + 1;
        let activeTask = jsonObj[i];
        if (status == activeTask.status) {
            document.getElementById(taskContainerId).innerHTML += taskTemplate(i);
            callFunctionForSingleTask(activeTask, i);
            singleTaskCount++;
        }
    }
    toggleDefaultContainer(taskContainerId, singleTaskCount);
}

/**
 * This function hides the default task container in case tasks exist
 * 
 * @param {string} taskContainerId 
 */
function toggleDefaultContainer(taskContainerId, taskCount) {
    const taskContainer = document.getElementById(taskContainerId + 'Default');
    if (taskCount == 0 && taskContainer.classList.contains('d-none')) {
        taskContainer.classList.toggle('d-none');
    } else if (taskCount > 0 && !taskContainer.classList.contains('d-none')) {
        taskContainer.classList.toggle('d-none');
    }
}

/**
 * This function juste stores the number of the task which should moved
 * 
 * @param {number} taskNummer -- provides the task number i.e. 2 which ist storred on place 1 in array because count in array starts with 0
 */
function dragStart(taskNummer) {
    taskToMove = taskNummer;
}
/**
 * This function prevents the standard behavior for event dragover
 * 
 * @param {event} ev - event dragover
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function saves the new status of the task in backend and calls the render function.
 * 
 * @param {string} newStatus - status of target container
 */
async function moveTo(newStatus) {
    taskJson[taskToMove].status = newStatus;
    afterSetItemServerAnswer = await setItem(KEY_for_JSON_TASKS, taskJson);
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    renderTasks();
}

/**
 * this function clears all status containers
 * 
 */
function clearContainer() {
    document.getElementById('idTaskToDo').innerHTML = '';
    document.getElementById('idTaskInProgress').innerHTML = '';
    document.getElementById('idTaskAwaitFeedback').innerHTML = '';
    document.getElementById('idTaskDone').innerHTML = '';
}

/**
 * This function is called by the onchange attribut of a specific task with the purpose of moving task to another status area. It is needed in mobile version
 * 
 * @param {object} task - contains the complete task (HTML)
 */
function changeStatus(task) {
    taskToMove = +task.id.replace("idChangeStatus", "");
    moveTo(task.value);
}

/**
 * Tih is the search and render function for the tasks. It call the search function and renders the result
 */
function searchTask() {
    let search = document.getElementById('idBoardSearch').value;
    search = search.toLowerCase();
    search !== '' ? searchFunction(search) : renderTasks();
}

/**
 * This function stores all tasks which matches the search value in a seperate objekt
 * 
 * @param {string} search - value to search
 */
function searchFunction(search) {
    clearContainer();
    searchTaskObj = [];
    let searchIndex = 0;
    for (let i = 0; i < taskJson.length; i++) {
        if (taskJson[i].headline.toLowerCase().includes(search)) {
            searchTaskObj[searchIndex] = taskJson[i];
            searchIndex++;
        }
    }
    renderAllContainer(searchTaskObj);
}

function openNav() {
    document.getElementById("idBgAddTaskOverlay").style.width = "100%";
  }
  
  
