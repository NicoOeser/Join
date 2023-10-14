//shows welcome screen
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.getElementById("idWelcome");
    if (window.innerWidth <= 960) {
        welcomeMessage.classList.remove('d-none');
        welcomeMessage.classList.add('welcome');
        setTimeout(() => {
            welcomeMessage.classList.add('d-none');
            welcomeMessage.classList.remove('welcome');
        }, 2000);
    }
});

/**
 * This function returns the greeting phrase
 * 
 * 
 * @returns - greeting which fits to the daytime
 */
function greetingText() {
    let daytime = new Date().getHours();
    if (daytime >= 5 && daytime < 12) {
        return "Good Morning!";
    } else if (daytime >= 12 && daytime < 19) {
        return "Good Afternoon!";
    } else {
        return "Good Evening!";
    }
}

function activeUser(params) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let activeUserName = currentUser ? currentUser.name : '';   
    return activeUserName;
} 



/**
 * this function adds the greeting texed provided by the call of greetingText() to the HTML Code
 */
function addGreetingPhrase() {
    document.getElementById('idWelcomeMessage').innerText = greetingText();
    document.getElementById('idWelcomeUserName').innerText = activeUser(); 
}


/**
 * This function returns from an object(array) a count of all emements which contains a specific value
 * 
 * 
 * @param {string} srcValue - lookup value
 * @param {string} compValue - variable where the value for comparison is stored in array
 * @param {string} chkArr - array which should checked
 * @returns count
 */
function countTasks(srcValue, compValue, chkArr) {
    let count = 0;
    for (let i = 0; i < chkArr.length; i++) {
        if (srcValue == chkArr[i][compValue]) {
            count++;
        }
    }
    return count
}

/**
 * This function calls function for adding counts and upcommingDeadline to summary it adds also the greeting formula too.
 * 
 */
async function addValuesToSummary() {
    addGreetingPhrase();  
    taskJson = await loadJSON(KEY_for_JSON_TASKS);
    addNumToSummary(); 
    upcommingDeadline();  
    
}

/**
 * this function adds the counts of each tasktype to summary
 * 
 */
function addNumToSummary() {
    document.getElementById('idCountAllTasks').innerText = taskJson.length;
    document.getElementById('idCountTasksInProgress').innerText = countTasks('inProgress', 'status', taskJson);
    document.getElementById('idCounttaskAwaitingFeedback').innerText = countTasks('awaitFeedback', 'status', taskJson);
    document.getElementById('idTaskUrgent').innerText = countTasks('urgent', 'urgency', taskJson);
    document.getElementById('idTaskToDd').innerText = countTasks('toDo', 'status', taskJson);
    document.getElementById('idTaskDone').innerText = countTasks('done', 'status', taskJson);
}

/**
 * This function looks for the youngest date and calls function buildDateFormat which returns the correkt Format for idTaksUrgentDate 
 * 
 */
function upcommingDeadline() {
    let youngestDate = new Date(taskJson[0].dueDate);
    for (let i = 1; i < taskJson.length; i++) {
        let taskDate = new Date(taskJson[i].dueDate);
        if (taskDate < youngestDate) {
            youngestDate = taskDate;
        }
    }
    document.getElementById('idTaksUrgentDate').innerHTML = `<strong>${buildDateFormat(youngestDate)}</strong>`;
}

/**
 * This function returns the date in Format Full month name, day and full year.
 * 
 * 
 * @param {date} youngestDate 
 * @returns formated date
 */
function buildDateFormat(youngestDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = months[youngestDate.getMonth()];
    let day = youngestDate.getDate();
    let year = youngestDate.getFullYear();
    return monthName + " " + day + ", " + year;
}