function htmlAddTaskOverlay() {
    document.getElementById('idAddTaskOverlay').innerHTML = /*html*/`
    <section id="idBgAddTaskOverlay" class="backgroundAddTaskOverlay" onclick="closeAddTaskOv('idBgAddTaskOverlay')">
        <form id="idAddTaskForm" onsubmit="storeNewTask(true); return false" class="addTaskOvGeneralSettings" onclick="innerClick(event)" autocomplete="off">
            <div class="d-flex justify-content-between align-items-center headlineAddTaskOv"> 
                <h1 id="idHeadlineAddTask" class="">Add Task</h1>
                <img onclick="closeAddTaskOv('idBgAddTaskOverlay')" class="closeResponsive" src="../assets/img/cancel_contactOverlay.svg">
            </div>
            <div id="idContentContainerAddTaskOv" class="contentContainerAddTaskOv">
                <div id="idContentDeskLeftContainerAddTaskOv" class="ContentDeskContainerAddTaskOv">
                    <div id="idInputTitleContainerAddTaskOv" class="d-flex flex-column">
                        <label for="idInputTitleAddTaskOv">Title</label>
                        <input id="idInputTitleAddTaskOv" maxlength="48" class="inputTitleAddTaskOv" type="text"
                            placeholder="Enter a title" required>
                        <div class="readWarningTexbox"><span id="idSpanTitle" class="requiredInfo d-none">This field is required</span></div>
                    </div>
                    <div id="idInputDescriptionContainerAddTaskOv" class="mt-1 d-flex flex-column">
                        <label for="idInputDescriptionAddTaskOv">Description</label>
                        <textarea id="idInputDescriptionAddTaskOv" class="inputDescriptionAddTaskOv" name="inputDescription"
                            placeholder="Enter a Description" required></textarea>
                        <div class="readWarningTexbox"><span id="idSpanDesr" class="requiredInfo d-none">This field is required</span></div>
                    </div>
                    <div id="idInputAssignedToContainerDesktopAddTaskOv" class="assingToDesk mt-3 flex-column"> 
                        <label for="idInputAssignedToAddTaskDeskOv">Assigned To</label>
                        <div id="idSelectMultUserDeskOv" class="selectMultUserOv" onclick="showUserNames('DeskOv')"> 
                            <input type="text" id="idInputAssignedToAddTaskDeskOv" class="selectContainerOv selectArrow"
                                placeholder="Select contacts to assign" onkeypress="return event.keyCode != 13;">
                        </div>
                        <div id="idSelectedUserAddTaskDeskOv" class="d-flex"></div>
                        <div id="idChkSelectMultUserOuterConDeskOv" class=""> 
                            <div id="idCheckboxesSelectMultUserDeskOv" class="checkboxesSelectMultUserOv">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="idContentDeskmiddleContainerAddTaskOv" class="ContentDeskmiddleContainerAddTaskOv"></div>
                <div  id="idContentDeskRightContainerAddTaskOv" class="ContentDeskContainerAddTaskOv">
                    <div id="idContentDeskRightContainerFlipConAddTaskOv" class="flip">
                        <div id="idPriorityContainerAddTaskOv" class="mt-1 d-flex flex-column">
                            <span for="idPriorityAddTaskOv">Prio</span>
                            <div id="idPriorityAddTaskOv"
                                class="d-flex flex-row justify-content-between priorityButtonContainerAddTaskOv">
                                <div id="idurgentContainerAddTaskOv" onclick="highlight('urgent')" class="prioContainerAddTaskOv">
                                    <span for="idUrgentIMGAddTaskOv">Urgent</span>
                                    <img id="idurgentIMGAddTaskOv" src="../assets/img/prio_urgent.svg" class="">
                                </div>
                                <div id="idmediumContainerAddTaskOv" onclick="highlight('medium')" class="prioContainerAddTaskOv">
                                    <span for="idMediumIMGAddTaskOv">Medium</span>
                                    <img id="idmediumIMGAddTaskOv" src="../assets/img/prio_medium.svg" class="">
                                </div>
                                <div id="idlowContainerAddTaskOv" onclick="highlight('low')" class="prioContainerAddTaskOv">
                                    <span for="idLowIMGAddTaskOv">Low</span>
                                    <img id="idlowIMGAddTaskOv" src="../assets/img/prio_low.svg" class="">
                                </div>
                            </div>
                        </div>
                        <div id="idDueDateContainerAddTaskOv" class="d-flex flex-column">
                            <label for="idInputDueDateAddTaskOv">Due Date</label>
                            <input id="idInputDueDateAddTaskOv" class="inputDueDateAddTaskOv" type="date" value="" min="2023-08-31"
                                required>
                            <div class="readWarningTexbox"><span id="idSpanDueDate" class="requiredInfo d-none">This field is required</span></div>
                        </div>
                    </div>
                    <div id="idInputCategoryContainerAddTaskOv" class="mt-1 d-flex flex-column">
                        <label for="idSelectCategoryAddTaskOv">Category</label>
                        <select id="idSelectCategoryAddTaskOv" class="selectContainerOv selectArrow" name="category" required>
                            <option value="" disabled selected hidden>Select task category</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                        <div class="readWarningTexbox"><span id="idSpanSelectCat" class="requiredInfo d-none">This field is required</span></div>
                    </div>
                    <div id="idInputAssignedToContainerAddTaskOv" class="assingToMob mt-3 d-flex flex-column">
                        <label for="idInputAssignedToAddTaskOv">Assigned To</label>
                        <div id="idSelectMultUserOv" class="selectMultUserOv" onclick="showUserNames('Ov')"> 
                            <input type="search" id="idInputAssignedToAddTaskOv" class="selectContainerOv selectArrow"
                                placeholder="Select contacts to assign" onkeypress="return event.keyCode != 13;">
                        </div>
                        <div id="idSelectedUserAddTaskOv" class="d-flex"></div>
                        <div id="idChkSelectMultUserOuterConOv" class=""> 
                            <div id="idCheckboxesSelectMultUserOv" class="checkboxesSelectMultUserOv">
                            </div>
                        </div>
                    </div>
                    <div id="idSubtaskContainerAddTaskOv" class="mt-3">
                        <label for="idSubtaskAddTaskOv">Subtask</label>
                        <div id="idSubtaskSubContainerAddTaskOv" onfocus="switchIons(1)" onblur="switchIons(1)" 
                            class="d-flex flex-row justify-content-between align-items-center subtaskSubContainerAddTaskOv">
                            <input id="idSubtaskAddTaskOv" onfocus="switchIons(1)" 
                                class="subtaskAddTaskOv" type="text" placeholder="Add new subtask" onkeypress="return event.keyCode != 13;">
                            <div id="idSwitchIcons">
                                <img id="idSubtaskPlus" src="../assets/img/plus.svg" onclick="switchIons(2)">
                                <div id="idSubtaskIconContainer" class="subtaskIconContainer d-none">
                                    <img src="../assets/img/taskOverlayClose.svg" alt="" onclick="switchIons(4)">
                                    <div id="idSubTaskDivider" class="subTaskDivider"></div>
                                    <img src="../assets/img/checkBlack.svg" alt="" onclick="addSubtask(); switchIons(4)">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="idRenderedSubtaskContainerAddTaskOv">
                        <ul id="idRenderedSubtaskAddTaskOv"></ul>
                    </div>
                    <div id="idSubmitContainerAddTaskOv" onsubmit="storeNewTask(true)"
                class="submitContainerAddTaskOv d-flex justify-content-end align-items-center">
                <button id="idSubmitButtonAddTaskOv" type="submit" class="taskButton">Create Task <img
                        src="../assets/img/check.svg"></button>
            </div>
                </div>
            </div>

        </form>    
    </section>`
}



function userOvHTML(memberName, memberColor, memberinitials, i) {
    return `
    <div id="idAssingedToCon${i}" class="assingedToMembers hoverAssingedTo" onclick="toggleChkBox(${i})">
        <div id="idAssingedToInitialsOv${i}" class="memberDiskOv memberBgColor${memberColor}">${memberinitials}
        </div>
        <span id="idAssingedToName${i}" class="assignToName">${memberName}</span>
        <div class="chkContainerAssingdTo">
            <input id=idAssingedToChk${i} type="checkbox" class="check_box chkHeight">
            <label for=idAssingedToChk${i}></label>
        </div>
    </div>`
}


function subtaskHTML(count) {
    return /*html*/`
    <li id="idSubTask${count}" class="subTaskElement">
        <div id="idSubTaskdefaultContainer${count}" class="d-flex justify-content-between mt-2">
            <span id="idSubTaskText${count}">${subtaskObj[count]}</span>
            <div id="idSubTaskEditDeleteContainer${count}">
                <img onclick="editSubtask(${count})" src="../assets/img/edit_subtask.svg" class="customButton" role="button">
                <img onclick="deleteSubtask(${count})" src="../assets/img/delete_subtask.svg" class="customButton" role="button">
            </div>
        </div>
        <div id="idSubTaskTextEditContainer${count}"
            class="d-none flex-row justify-content-between align-items-center mt-2 subtaskSubEditOv">
            <input id="idSubTaskTextEdit${count}" class="" type="text">
            <div id="idSubtaskEditIconContainer${count}" class="d-flex flex-row SubtaskEditIconContainer">
                <img src="../assets/img/delete_subtask.svg" class="customButton" role="button" alt="" onclick="deleteSubtask(${count})">
                <div id="idSubTaskDivider2${count}" class="subTaskDivider"></div>
                <img src="../assets/img/checkBlack.svg" alt="" class="customButton" role="button" onclick="editSubtaskText(${count})">
            </div>
        </div>
    </li>`
}
