const content = document.getElementById('content')
const mql = window.matchMedia("(max-width: 750px)");

checkScreen()


/**
 * This function is called when the screen size changes and updates the content based on the new screen size.
 *
 * @param {Event} e - The media query change event.
 */
mql.onchange = (e) => {
    if (e.matches) {
        content.innerHTML = addTaskMobileTemplate();
        content.classList.add('contentAlignMobile')
    } else {
        content.innerHTML = addTaskDektopTemplate();
        content.classList.remove('contentAlignMobile')
    }
    loadContacts()
}


/**
 * This function checks the screen size and updates the content accordingly.
 */
function checkScreen() {
    const big = window.matchMedia("(min-width: 750px)").matches
    const small = window.matchMedia("(max-width: 750px)").matches

    if (big) {
        content.innerHTML = addTaskDektopTemplate();
        content.classList.remove('contentAlignMobile')
    } else if (small) {
        content.innerHTML = addTaskMobileTemplate();
        content.classList.add('contentAlignMobile')
    }

    loadContacts()
}


/**
 * This function returns the HTML template for adding a task on a mobile device.
 *
 * @returns {string} - The HTML template for adding a task on a mobile device.
 */
function addTaskMobileTemplate() {
    return `
    <form id="addTaskForm" onsubmit="storeNewTask();return false">
        <h1><b>Add Task</b></h1>
        <div class="gap8px_flexDirCol">
            <span>Title</span>
            <input maxlength="48" class="inputdefault" id="inputTitle" type="text" placeholder="Enter a title" required>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Description</span>
            <textarea class="inputDescription" name="inputDescription" id="inputDescription" cols="30"
                rows="4" placeholder="Enter a Description" required></textarea>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Prio</span>
            <div class="prioDiv">
                <div id="urgent" onclick="highlight('urgent')" class="prioOption"><span>Urgent</span><img
                        id="urgentIMG" src="../assets/img/prio_urgent.svg" class="prioImg">
                </div>
                <div id="medium" onclick="highlight('medium')" class="prioOption"><span>Medium</span><img
                        id="mediumIMG" src="../assets/img/prio_medium.svg" class="prioImg">
                </div>
                <div id="low" onclick="highlight('low')" class="prioOption"><span>Low</span><img id="lowIMG"
                        src="../assets/img/prio_low.svg" class="prioImg"></div>
            </div>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Due Date</span>
            <input class="inputdefault" id="inputDueDate" type="date" required>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Category</span>
            <select class="inputdefault" name="category" id="inputCategory" required>
                <option value="" disabled selected hidden>Select task category</option>
                <option value="Technical Task">Technical Task</option>
                <option value="User Story">User Story</option>
            </select>
        </div>

        <div class="gap8px_flexDirCol">
            <span>Assigned To</span>
            <select class="inputdefault" name="assigned" id="inputAssignedTo" required>
                <option value="" disabled selected hidden>Select conntacts to assign</option>
            </select>
        </div>

            <div class="gap8px_flexDirCol">
                        <span>Subtask</span>
                        <div class="subtaskDiv">
                            <input class="subtaskInput" type="text" id="subtask" placeholder="Add new subtask">
                            <img src="../assets/img/plus.svg" onclick="addSubtask()">
                        </div>
                        </div>
                        <div >
                        <ul id="renderedSubtask"></ul>
                        </div>
            </div>

        <div class="buttonDiv">
            <button type="submit" class="taskButton">Create Task <img src="../assets/img/check.svg"></button>
        </div>
    </form>

    <div class="task_added_overlay">
        <span>Task added to board</span> <img src="../assets/img/task_added_to_board.svg">
    </div>`
}


/**
 * This function returns the HTML template for adding a task on a desktop device.
 *
 * @returns {string} - The HTML template for adding a task on a desktop device.
 */
function addTaskDektopTemplate() {
    return `
    <h1 class="headerDektop"><b>Add Task</b></h1>
    <form id="addTaskForm" onsubmit="storeNewTask();return false">
        <div class="addTaskDesktop">
        
            <div class="divLeft">
                <div class="gap8px_flexDirCol">
                    <span>Title</span>
                    <input maxlength="48" class="inputdefault" id="inputTitle" type="text" placeholder="Enter a title" required>
                </div>
                <div class="gap8px_flexDirCol">
                    <span>Description</span>
                    <textarea class="inputDescription" name="inputDescription" id="inputDescription" cols="30" rows="4"
                        placeholder="Enter a Description" required></textarea>
                </div>
                <div class="gap8px_flexDirCol">
                    <span>Assigned To</span>
                    <select class="inputdefault" name="assigned" id="inputAssignedTo" required>
                        <option value="" disabled selected hidden>Select conntacts to assign</option>
                    </select>
                </div>
            </div>

            <div class="divRight">
                <div class="gap8px_flexDirCol">
                    <span>Due Date</span>
                    <input class="inputdefault" id="inputDueDate" type="date" required>
                </div>
                <div class="gap8px_flexDirCol">
                    <span>Prio</span>
                    <div class="prioDiv">
                        <div id="urgent" onclick="highlight('urgent')" class="prioOption"><span>Urgent</span><img
                                id="urgentIMG" src="../assets/img/prio_urgent.svg" class="prioImg">
                     </div>
                        <div id="medium" onclick="highlight('medium')" class="prioOption"><span>Medium</span><img
                                id="mediumIMG" src="../assets/img/prio_medium.svg" class="prioImg">
                     </div>
                        <div id="low" onclick="highlight('low')" class="prioOption"><span>Low</span><img id="lowIMG"
                                src="../assets/img/prio_low.svg" class="prioImg"></div>
                    </div>
             </div>
                <div class="gap8px_flexDirCol">
                    <span>Category</span>
                    <select class="inputdefault" name="category" id="inputCategory" required>
                        <option value="" disabled selected hidden>Select task category</option>
                        <option value="Technical Task">Technical Task</option>
                        <option value="User Story">User Story</option>
                    </select>
                </div>

                <div class="gap8px_flexDirCol">
                        <span>Subtask</span>
                        <div class="subtaskDiv">
                            <input class="subtaskInput" type="text" id="subtask" placeholder="Add new subtask" >
                            <img src="../assets/img/plus.svg" onclick="addSubtask()">
                        </div>
                        <div >
                        <ul id="renderedSubtask"></ul>
                        </div>
                </div>
            </div>
        </div>
            <div class="buttonDiv">
                <button type="reset" class="clearButton" onclick="clearAddTaskForm()">Clear <img src="../assets/img/cancel_contactOverlay.svg" alt=""></button>
                <button type="submit" class="taskButton" >Create Task <img src="../assets/img/check.svg"></button>
            </div>
    </form>
</div>`
}