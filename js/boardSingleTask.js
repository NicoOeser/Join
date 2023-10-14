/**
 * this function calls all functions for adding values to the html code within the active task
 * 
 * @param {object} activeTask 
 * @param {number} taskNumber 
 */
function callFunctionForSingleTask(activeTask, taskNumber) {
    colorTaskType(activeTask.taskType, taskNumber);
    addTaskTitle(activeTask.headline, taskNumber);
    addTaskTxt(activeTask.description, taskNumber);
    subTaskBarProgress(activeTask.doneSubTasks, activeTask.subTaskTotal, taskNumber);
    taskMember(activeTask.member, taskNumber);
    taskUrgency(activeTask.urgency, taskNumber);
    selectionHTML(activeTask.status, taskNumber);
}

/**
 * This function returns the HTML code for a task
 * 
 * @param {string} taskNr - to create a uniqe identifier 
 * @returns - html code
 */
function taskTemplate(taskNr) {
    return /*html*/ `
    <div id="idTaskId${taskNr}"  role="button" draggable='true' ondragstart="dragStart(${taskNr})" onclick="renderOverlayTask(${taskNr})" class="singleTaskContainer">
        <div class="d-flex justify-content-between align-item-center">
            <div id="idTaskType${taskNr}" class="singlTaskType">User Story </div>
            <select id="idChangeStatus${taskNr}" onclick="innerClick(event)" onchange="changeStatus(this)" class="changeStatus">
             </select> 
        </div>
        <div id="idTaskTxts${taskNr}" class="singelTaskTexts">
            <div id="idTaskHeadline${taskNr}" class="singleTaskHeadline">Headline
            </div>
            <div id="idTaskShortTxt${taskNr}" class="singleTaskTxt">Create a contact form and
                imprint page...</div>
        </div>
        <div id="idTaskSubTask${taskNr}" class="TaskSubTask">
            <div class="SingleTaskSubProgressOuterCon"> 
                <div id="idSingleTaskSubProgress${taskNr}" class="SingleTaskSubProgress"></div>
            </div>
            <div id="idSingleTaksCount${taskNr}" class="SingleTaksCount">
                <span id="idSingleTaksCountPart${taskNr}">1</span>
                <span>/</span>
                <span id="idSingleTaksCountTotal${taskNr}">2</span>
                <span> Subtasks</span>
            </div>
        </div>
        <div id="idSingleTaskMemberPrio${taskNr}" class="SingleTaskMemberPrio">
            <div id="idSingleTaskMember${taskNr}" class="SingleTaskMember">
            </div>
            <div id="idSingleTaskPrio${taskNr}" class="SingleTaskPrio">
                <img id="idSingleTaskPrioImg${taskNr}" src="../assets/img/prio_urgent.svg" alt="">
            </div>
        </div>
    </div>`
}

/**
 * 
 * @param {string} taskStatus provides the actual status of task
 * @param {string} taskNr - used to find the specific element id
 */
function selectionHTML(taskStatus, taskNr) {
    const statusArr = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    let htmlOptions = `<option value="${taskStatus}">${taskStatus}</option>`;
    for (let i = 0; i < statusArr.length; i++) {
        if (taskStatus !== statusArr[i]) {
            htmlOptions += `<option value="${statusArr[i]}">${statusArr[i]}</option>`;
        }  
    }
    document.getElementById('idChangeStatus' + taskNr).innerHTML = htmlOptions;
}


/**
 * this function returns the background color for the specific task type
 * 
 * @param {string} taskType - this is the specific task type
 * @param {string} taskNr - used to find the specific element id
 */
function colorTaskType(taskType, taskNr) {
    document.getElementById('idTaskType' + taskNr).innerText = taskType;
    switch (taskType) {
        case "User Story":
            document.getElementById('idTaskType' + taskNr).style.backgroundColor = '#0038FF';
            break;
        case "Technical Task":
            document.getElementById('idTaskType' + taskNr).style.backgroundColor = '#1FD7C1';
            break;
        default:
            break;
    }
}

/**
 * This function adds the Headline of task to the html element
 * 
 * @param {string} taskHeadline - text from task title
 * @param {string} taskNr - used to find the specific element id
 */
function addTaskTitle(taskHeadline, taskNr) {
    document.getElementById('idTaskHeadline' + taskNr).innerText = taskHeadline;
}

/**
 * This function adds the limited text to the html code of the task
 * 
 * @param {string} taskText - text from task description
 * @param {string} taskNr - used to find the specific element id
 */
function addTaskTxt(taskText, taskNr) {
    document.getElementById('idTaskShortTxt' + taskNr).innerText = limitTextTo37Char(taskText);
}

/**
 * This function retuns string of 37 chars plus '...' if the lenght of the string is graeter than 37 chars
 * 
 * @param {string} text - just a text
 * @returns - text limited to 37 chars plus three dots
 */
function limitTextTo37Char(text) {
    if (text.length <= 37) {
        return text
    } else {
        return text.substring(0, 37) + '...';
    }
}

/**
 * This function changes the progress bar width
 * 
 * @param {number} doneSubTasks - count of solved tasks
 * @param {number} subTaskTotal - count of total tasks
 * @param {string} taskNr - used to find the specific element id
 */
function subTaskBarProgress(doneSubTasks, subTaskTotal, taskNr) {
    let faktor = 1;
    document.getElementById('idSingleTaksCountPart' + taskNr).innerText = doneSubTasks;
    document.getElementById('idSingleTaksCountTotal' + taskNr).innerText = subTaskTotal;
    if (subTaskTotal != 0) {
        faktor = doneSubTasks / subTaskTotal;
        document.getElementById('idSingleTaskSubProgress' + taskNr).style.width = Math.round(128 * faktor) + 'px';
        
    } else {
        document.getElementById('idSingleTaskSubProgress' + taskNr).style.width = 0;
    }
}

/**
 * This function add html container to a container with id 'idSingleTaskMember'
 * used in renderStatusContainer()
 * 
 * @param {array} arrMember - array of full names of all members connected to the task
 * @param {string} taskNr - used to find the specific element id
 */
function taskMember(arrMember, taskNr) {
    for (let i = 0; i < arrMember.length; i++) {
        const member = contactJSON.find(contact => contact.name === arrMember[i]);
        if (member) {
            const membInitials = member.initials;
            const memberColor = member.bgColor.slice(1);
            const memberSingleTask = `<div id="idMemberSingleTask${taskNr}_${i}" class="memberDisk memberBgColor${memberColor}">${membInitials}</div>`;
            document.getElementById('idSingleTaskMember' + taskNr).innerHTML += memberSingleTask;
        }
    }
}

/**
 * This function changes the img urgency belonging to task urgency
 * 
 * @param {string} urgency - for low, medium, urgent
 * @param {string} taskNr - used to find the specific element id
 */
function taskUrgency(urgency, taskNr) {
    switch (urgency) {
        case 'low':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_low.svg";
            break;
        case 'medium':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_medium.svg";
            break;
        case 'urgent':
            document.getElementById('idSingleTaskPrioImg' + taskNr).src = "../assets/img/prio_urgent.svg";
            break;
    }
}