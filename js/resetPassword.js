
/**
 * This function confirms sending the email
 */
async function confirmSendMail() {
    const emailInput = document.getElementById('forgotMail');
    const enteredEmail = emailInput.value;
    await processEmailConfirmation(enteredEmail);   
    emailInput.value = '';
}


/**
 * Processes email confirmation based on user existence.
 * @param {string} email - The email address entered by the user.
 */
async function processEmailConfirmation(email) {
    await loadUsers();
    const existingUser = findUserByEmail(email);  
    if (existingUser) {
        displaySendPasswordMessageAndRedirect(email);
    } else {
        displayUserNotFoundMessageForEmail();
    }
}


/**
 * Finds a user by email in the users array.
 * @param {string} email - The user's email.
 * @returns {object} The user object if found, otherwise null.
 */
function findUserByEmail(email) {
    return users.find(user => user.email === email);
}


/**
 * Displays a message and redirects for successful email confirmation.
 * @param {string} email - The user's email.
 */
function displaySendPasswordMessageAndRedirect(email) {
    const message = document.getElementById('confirmSendMail');
    const messageResponsiv = document.getElementById('confirmTextResponsiv');
    message.style.display = 'block';
    message.innerHTML = sendPasswordDesktop();
    messageResponsiv.style.display = 'block';
    messageResponsiv.innerHTML = sendPasswordMobile();
    setTimeout(() => {
        window.location.href = `../html/reset_password.html?email=${email}`;
    }, 2000);
}


/**
 * Displays a message for user not found scenario during email confirmation.
 */
function displayUserNotFoundMessageForEmail() {
    const message = document.getElementById('confirmSendMail');
    const messageResponsiv = document.getElementById('confirmTextResponsiv');   
    message.style.display = 'flex';
    message.innerHTML = generateHTMLifNotUserDesktop();
    messageResponsiv.style.display = 'inline';
    messageResponsiv.innerHTML = generateHTMLifNotUserMobile();
}


/**
 * This function resets the user's password.
 */
async function resetPassword() {
    const firstPasswordInput = document.getElementById('firstPassword');
    const secondPasswordInput = document.getElementById('secondPassword');
    const resetMessage = document.getElementById('message');
    const resetMessageResponsiv = document.getElementById('confirm-send-mail-responsiv');    
    const firstPassword = firstPasswordInput.value;
    const secondPassword = secondPasswordInput.value;   
    if (!arePasswordsMatching(firstPassword, secondPassword)) {
        displayPasswordMismatchErrorMessage(resetMessage, resetMessageResponsiv);
        return;
    }   
    resetUserPasswordOrDisplayError(resetMessage, resetMessageResponsiv, firstPassword);
}



/**
 * Resets the user's password if user exists, otherwise displays an error message.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 * @param {string} newPassword - The new password.
 */
async function resetUserPasswordOrDisplayError(messageElement, messageResponsivElement, newPassword) {
    const email = getEmailFromURLParams();
    await loadUsers();
    const existingUser = findUserByEmail(email);
    if (existingUser) {
        resetUserPassword(existingUser, newPassword, messageElement, messageResponsivElement);
    } else {
        displayUserNotFoundErrorMessage(messageElement, messageResponsivElement);
    }
}


/**
 * Checks if two passwords match.
 * @param {string} password1 - The first password.
 * @param {string} password2 - The second password.
 * @returns {boolean} True if passwords match, otherwise false.
 */
function arePasswordsMatching(password1, password2) {
    return password1 === password2;
}


/**
 * Displays a password mismatch error message.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 */
function displayPasswordMismatchErrorMessage(messageElement, messageResponsivElement) {
    displayErrorMessage("Passwords do not match.", messageElement, messageResponsivElement);
}


/**
 * Gets the email from the URL parameters.
 * @returns {string} The email from the URL parameters.
 */
function getEmailFromURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('email');
}


/**
 * Resets the user's password and handles response.
 * @param {object} user - The user object.
 * @param {string} newPassword - The new password.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 */
async function resetUserPassword(user, newPassword, messageElement, messageResponsivElement) {
    user.password = newPassword;
    try {
        const response = await setItem(KEY_for_JSON_PW, JSON.stringify(users)); // Benutzerdaten im Backend aktualisieren
        if (response.status === "success") {
            displaySuccessMessageAndRedirect(resetPasswordDesktop(), messageElement, messageResponsivElement);
        }
    } catch (error) {
        console.error(error);
    }
}


/**
 * Displays a user not found error message.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 */
function displayUserNotFoundErrorMessage(messageElement, messageResponsivElement) {
    displayErrorMessage("User not found.", messageElement, messageResponsivElement);
}


/**
 * Displays an error message.
 * @param {string} errorMessage - The error message to display.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 */
function displayErrorMessage(errorMessage, messageElement, messageResponsivElement) {
    messageElement.style.display = 'block';
    messageElement.innerHTML = errorMessage;
    messageResponsivElement.style.display = 'inline';
    messageResponsivElement.innerHTML = errorMessage;
}


/**
 * Displays a success message and redirects after a delay.
 * @param {string} successMessage - The success message to display.
 * @param {HTMLElement} messageElement - The message element.
 * @param {HTMLElement} messageResponsivElement - The responsive message element.
 */
function displaySuccessMessageAndRedirect(successMessage, messageElement, messageResponsivElement) {
    displayErrorMessage(successMessage, messageElement, messageResponsivElement);
    setTimeout(() => {
        window.location.href = '../html/login.html';
    }, 1500);
}


