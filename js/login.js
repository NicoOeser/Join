let users = [];


/**
 *  animated logo in the desktop view
 */
function initAnimation() {
    let animation = document.getElementById('initAnimation');
    let animationImg = document.getElementById('initAnimationImg');
    setTimeout(function () {
        animation.style.display = 'none';
        animationImg.style.display = 'none';
    }, 2400);
}


/**
 *  animated logo in the mobile view
 */
function initAnimationResponsiv() {
    let animation = document.getElementById('initAnimationResponsiv');
    let animationImg = document.getElementById('initAnimationImgResponsiv');
    setTimeout(function () {
        animation.style.display = 'none';
        animationImg.style.display = 'none';
    }, 2400);
}


/**
 *  function releases the button when the checkbox is checked 
 */
function toggleSignUpButton(checkbox) {
    const signUpButton = document.getElementById('signUpButton');
}


/**
 *  Handles the click event of the Sign Up button.
 *  Checks the state of the signup checkbox and resets it.
 */
function handleSignUpButtonClick() {
    const checkbox = document.getElementById('signUpCheckbox');
    toggleSignUpButton(checkbox); 
    checkbox.checked = false; 
}


/**
 *  functions to open other html pages 
 */
function privacyPolicy() {
    window.location.href = "../html/privacy_policy.html";
}

function loginHtml() {
    window.location.href = "../html/login.html";
}

function openSignUp() {
    window.location.href = "../html/sign_up.html";
}

function openForgotPassword() {
    window.location.href = "../html/forgot_password.html";
}

function redirectToSummaryPage() {
    window.location.href = '../html/summary.html';
}

function goBack() {
    window.history.back();
  }

  
/**
 * Redirects to the login page after a delay.
 */
function redirectToLoginPage() {
    setTimeout(() => {
        window.location.href = "../html/login.html";
    }, 1500);
}


/**
 *  Downloads the users array from the backend.
 */
async function loadUsers() {
    try {
        users = await loadJSON(KEY_for_JSON_PW); 
    } catch (e) {
        console.error("Loading error:", e);
    }
}


/**
 * Displays a message in the specified message container and hides it after a delay.
 *
 * @param {HTMLElement} messageContainer - The container element to display the message in.
 * @param {string} desktopMessage - The message to be displayed for desktop view.
 * @param {string} mobileMessage - The message to be displayed for mobile view.
 */
function displayAndHideMessage(messageContainer, desktopMessage, mobileMessage) {
    messageContainer.style.display = 'block';
    messageContainer.innerHTML = desktopMessage;
    const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
    confirmTextResponsivSignUp.style.display = 'block';
    confirmTextResponsivSignUp.innerHTML = mobileMessage;
    setTimeout(() => {
        messageContainer.style.display = 'none';
        confirmTextResponsivSignUp.style.display = 'none';
    }, 1500);
}


/**
 * Handles the case where the user's name is missing. 
 */
function handleMissingName() {
    const message = document.getElementById('messageNewUser');
    const desktopMessage = handleMissingNameDesktop();
    const mobileMessage = handleMissingNameMobile();
    displayAndHideMessage(message, desktopMessage, mobileMessage);
}


/**
 * Handles the case where the user's password does not match.
 */
function handlePasswordMismatch() {
    const message = document.getElementById('messageNewUser');
    const desktopMessage = passwordNotMatchDesktop();
    const mobileMessage = passwordNotMatchMobile();
    displayAndHideMessage(message, desktopMessage, mobileMessage);
}


/**
 * Handles the case where the user already exists.
 */
function handleExistingUser() {
    const message = document.getElementById('messageNewUser');
    const desktopMessage = handleExistingUserDesktop();
    const mobileMessage = handleExistingUserMobile();
    displayAndHideMessage(message, desktopMessage, mobileMessage);
    setTimeout(() => {
        window.location.href = "../html/login.html"; 
    }, 1500);
}


/**
 * Handles the case where the checkbox is not checked.
 */
function handleCheckboxNotChecked() {
    const message = document.getElementById('messageNewUser');
    const desktopMessage = privacyPolicyCheckboxDesktop();
    const mobileMessage = privacyPolicyCheckboxMobile();
    displayAndHideMessage(message, desktopMessage, mobileMessage);
}



/**
 * Handles the response from the server.
 *
 * @param {Object} response - The response object from the server.
 */
function handleResponse(response) {
    const message = document.getElementById('messageNewUser');
    const confirmTextResponsivSignUp = document.getElementById('confirmTextResponsivSignUp');
    let desktopMessage = "";
    let mobileMessage = "";
    if (response.status === "success") {
        desktopMessage = handleResponseDesktop(response);
        mobileMessage = handleResponseMobile(response);
        redirectToLoginPage();
    } else {
        desktopMessage = generateHTMLifNotUserDesktop();
        mobileMessage = generateHTMLifNotUserMobile();
    }
    displayAndHideMessage(message, desktopMessage, mobileMessage);
}


/**
 * Handles the success response by setting desktop and mobile messages,
 * and redirecting to the login page after a delay.
 *
 * @param {Object} response - The success response object.
 */
function handleSuccessResponse(response) {
    const desktopMessage = handleResponseDesktop(response);
    const mobileMessage = handleResponseMobile(response);
    redirectToLoginPage();
}


/**
 * Handles the failure response by setting desktop and mobile messages.
 */
function handleFailureResponse() {
    const desktopMessage = generateHTMLifNotUserDesktop();
    const mobileMessage = generateHTMLifNotUserMobile();
    displayAndHideMessage(message, desktopMessage, mobileMessage);
}


/**
 * Main function to add a new user.
 */
async function addUser() {
    const fullName = document.getElementById('newName').value.trim();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!validateFullName(fullName)) {
        return;
    }
    if (!validatePasswordMatch(password, confirmPassword)) {
        return;
    }
    const checkbox = document.getElementById('signUpCheckbox');
    if (!checkbox.checked) {
        handleCheckboxNotChecked();
        return;
    }
    await loadUsers();
    if (checkExistingUser(email)) {
        return;
    }
    addNewUser(fullName, email, password);
}


/**
 * Validates the full name.
 * @param {string} fullName - The full name to validate.
 * @returns {boolean} True if valid, otherwise false.
 */
function validateFullName(fullName) {
    const nameParts = fullName.split(' ');
    if (nameParts.length !== 2) {
        handleMissingName();
        return false;
    }
    return true;
}


/**
 * Validates whether the passwords match.
 * @param {string} password - The password to compare.
 * @param {string} confirmPassword - The confirmed password to compare.
 * @returns {boolean} True if passwords match, otherwise false.
 */
function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        handlePasswordMismatch();
        return false;
    }
    return true;
}


/**
 * Checks if the user already exists.
 * @param {string} email - The email to check.
 * @returns {boolean} True if user exists, otherwise false.
 */
function checkExistingUser(email) {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        handleExistingUser();
        return true;
    }
    return false;
}


/**
 * Adds a new user.
 * @param {string} fullName - The full name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
async function addNewUser(fullName, email, password) {
    setNewUser(fullName, email, password);
    try {
        const response = await setItem(KEY_for_JSON_PW, users); 
        handleResponse(response);
    } catch (error) {
        console.error(error);
    }
}


/**
 * This function clears the registration form fields
 */
function clearRegistrationForm() {
    document.getElementById('newName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}


/**
 * This function sets a new user with the given details and adds initial to the user object
 * 
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {string} Initials - The first letter of the first name and the first letter of the last name
 */
function setNewUser(fullName, email, password,) {
    const userInitials = memberInitials(fullName);
    users.push({
        name: fullName.trim(),
        email: email.trim(),
        password: password,
        initials: userInitials,
    });
    //debugger; //added by Alex
    saveNewUserInContacts(email);
}

// added by Alex
/**
 * This function checkes the contact JASON if the new user exist, if not new user will added
 * 
 * @param {string} email - email of new user
 */
async function saveNewUserInContacts(email) {
    contactJSON = await loadJSON(KEY_for_JSON_CONTACS);
    const NR = users.length - 1;
    const existingUser = contactJSON.some(contact => contact.email === email);
    const randomColorIndex = Math.floor(Math.random() * COLORS.length);
    if(existingUser === false){
        let contact = {"email": users[NR].email, "initials": users[NR].initials, "name": users[NR].name, "bgColor": COLORS[randomColorIndex]}
        contactJSON.push(contact);
        //debugger;
        setItem(KEY_for_JSON_CONTACS, contactJSON);
    }
}


/**
 * Check if user is already exist, if yes, forward to summary.html
 * if not, option to sign up
 */
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await loadUsers();
        const user = findUserByEmailAndPassword(email, password);
        displayUserMessageOrRedirect(user);
        resetInputFields();
    } catch (error) {
        console.error(error);
    }
}


/**
 * Finds a user by email and password in the users array.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {object} The user object if found, otherwise null.
 */
function findUserByEmailAndPassword(email, password) {
    return users.find(c => c.email === email && c.password === password);
}


/**
 * Displays appropriate user messages or redirects based on user existence.
 * @param {object} user - The user object if found, otherwise null.
 */
function displayUserMessageOrRedirect(user) {
    const message = document.getElementById('message');
    const messageResponsiv = document.getElementById('confirmTextResponsivLogin');
    if (!user) {
        displayUserNotFoundMessage();
    } else {
        localStorage.setItem('currentUser', JSON.stringify(user));
        redirectToSummaryPage();
    }
}


/**
 * Displays a message for user not found scenario.
 */
function displayUserNotFoundMessage() {
    const message = document.getElementById('message');
    const messageResponsiv = document.getElementById('confirmTextResponsivLogin');   
    message.style.display = 'flex';
    message.innerHTML = generateHTMLifNotUserDesktop();
    messageResponsiv.style.display = 'inline';
    document.getElementById('headerRightResponsiv').style.display = 'none';
    messageResponsiv.innerHTML = generateHTMLifNotUserMobile();
}


/**
 * Resets the input fields after login attempt.
 */
function resetInputFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}