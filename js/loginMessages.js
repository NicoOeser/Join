/**
 * Closes the overlay by hiding it.
 */
function closeOverlay() {
    const overlay = document.getElementById('popUpBg');
    overlay.style.display = 'none';
}


/**
 * Prevents the overlay from closing when clicked inside the overlay content.
 *
 * @param {Event} event - The event object.
 */
function doNotCloseOverlay(event) {
    event.stopPropagation(); 
}


/**
 * This function generates HTML for desktop view if the user's name is missing
 */
function handleMissingNameDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                Enter first and last name
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user's name is missing
 */
function handleMissingNameMobile() {
    return /*html*/ `
        Enter first and last name`;
}


/**
 * This function generates HTML for desktop view if the user already exists
 */
function handleExistingUserDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                User already exists. Please Login
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user already exists
 */
function handleExistingUserMobile() {
    return /*html*/ `
        User already exists. Please Login`;
}


/**
 * This function generates HTML for desktop view when a user has registered
 */
function handleResponseDesktop(response) {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                You have successfully registered.
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view when a user has registered 
 */
function handleResponseMobile(response) {
    return /*html*/ `
        You have successfully registered.`;
}


/**
 * This function generates HTML for desktop view if the user is not registered
 */
function generateHTMLifNotUserDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">You are not registered yet.<br> Click 
                    <span class="here" onclick="openSignUp(this)">here</span> to sign up
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user is not registered
 */
function generateHTMLifNotUserMobile() {
    return /*html*/`
        You are not registered yet.<br> Click 
            <span class="here-responsiv" onclick="openSignUp(this)">here</span> to sign up`;
}


/**
 * This function generates HTML for desktop view send an email to the user
 */
function sendPasswordDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    <img src="../assets/img/email-send.svg">
                    An E-Mail has been sent to you
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view send an email to the user
 */
function sendPasswordMobile() {
    return /*html*/ `
        An E-Mail has been sent to you`;
}


/**
 * This function generates HTML for desktop view if the user resets their password
 */
function resetPasswordDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    You reset your password
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user resets their password
 */
function resetPasswordMobile() {
    return /*html*/ `
        You reset your password`;
}


/**
 * This function generates HTML for desktop view if the user password not match
 */
function passwordNotMatchDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                    Passwords do not match. Please try again.
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if the user password not match
 */
function passwordNotMatchMobile() {
    return /*html*/ `
        Passwords do not match. Please try again.`;
}


/**
 * This function generates HTML for desktop view if the pravacy policy is not accept
 */
function privacyPolicyCheckboxDesktop() {
    return /*html*/ `
        <div id="popUpBg" class="confirm-send-mail" onclick="closeOverlay()">
            <div class="confirm-box">
                <div onclick="doNotCloseOverlay(event)" class="register-text">
                Please accept the privacy policy
                </div>
            </div>
        </div>`;
}


/**
 * This function generates HTML for mobile view if pravacy policy is not accept
 */
function privacyPolicyCheckboxMobile() {
    return /*html*/ `
        Please accept the privacy policy`;
}