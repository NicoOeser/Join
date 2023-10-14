/**
 * This functions returns the HTML template for the contact that is displayed in the contactlist 
 * 
 * 
 * @param {JSON} contact - The specific contact JSON from the contacts JSON 
 * @param {number} contactIndex - The index of the given contact JSON
 * @returns The HTML template for the contact that is displayed in the contactlist 
 */
function generateContactHTML(contact, contactIndex) {
    return `
        <div class="contact" onclick="showContactInfo(${contactIndex})">
            <div class="circle" style="background-color: ${contact.bgColor};">${contact.initials}</div>
            <div class="nameDiv">
                <span class="textcap">${contact.name}</span>
                <span class="colorLink"> ${contact.email}</span>
            </div>
        </div>
    `;
}


/**
 * This functions returns the HTML template for the letter of the conatctlist and all contacts within that letter section 
 * 
 * @param {string} letter - The letter of the alphabete that contains contacts 
 * @param {const} contactHTML - All the contacts that start with the given letter 
 * @returns the HTML template for the letter of the conatctlist and all contacts within that letter section 
 */
function generateLetterSection(letter, contactHTML) {
    return `
        <div class="contact-letter">${letter.toUpperCase()}</div>
        <hr class="letter-line">
        <div class="contacts-list">
            ${contactHTML}
        </div>
    `;
}


/**
 * This functions returns the HTML template for the edit contact overlay
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 * @returns  HTML template for the edit contact overlay
 */
function editContactOverlayTemplate(i) {
    let form = document.getElementById("contactsFooterOverlay").innerHTML = `
    <form id="addContactForm" class="inputArea" onsubmit="addContactViaEditOverlay(${i});return false">
                          <input id="inputName" class="inputName" type="text" placeholder="Surname Name" required pattern="^(\\w+\\s\\w+)$" title="Surname Name">
                          <input id="inputMail" class="inputMail" type="email" placeholder="Email" required>
                          <input id="inputTel" class="inputTel" type="tel" placeholder="Phone" required pattern="^\\+?[0-9]{7,}$" title="At least seven digits with a optional leading + ">
                          <div id="overlayButtonDiv" class="buttonDiv">
                              <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
                                      src="../assets/img/cancel_contactOverlay.svg"></button>
                              <button id="createButton" class="createButton"><span>Create contact</span> <img
                                      src="../assets/img/check.svg"></button>
                          </div>
                      </form>
  
                      <img onclick="closeAddContactOverlay()" class="closeResponsive"
                          src="../assets/img/cancel_contactOverlay.svg">
    `;
    return form;
}


/**
 * This functions returns the HTML template for the add contact overlay
 * 
 * @returns the HTML template for the add contact overlay
 */
function addContactOverlayTemplate() {
    let form = document.getElementById("contactsFooterOverlay").innerHTML = `
    <form id="addContactForm" class="inputArea" onsubmit="addContact();return false">
    <input id="inputName" class="inputName" type="text" placeholder="Surname Name" required pattern="^(\\w+\\s\\w+)$" title="Surname Name">
    <input id="inputMail" class="inputMail" type="email" placeholder="Email" required>
    <input id="inputTel" class="inputTel" type="tel" placeholder="Phone" required pattern="^\\+?[0-9]{7,}$" title="At least seven digits with a optional leading + ">
    <div id="overlayButtonDiv" class="buttonDiv">
        <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
                src="../assets/img/cancel_contactOverlay.svg"></button>
        <button id="createButton" class="createButton"><span>Create contact</span> <img
                src="../assets/img/check.svg"></button>
    </div>
  </form>
  
  <img onclick="closeAddContactOverlay()" class="closeResponsive"
    src="../assets/img/cancel_contactOverlay.svg">
    `;
    return form;
}


/**
 * This functions returns the HTML template for the buttons of the add contact overlay
 * 
 * @returns the HTML template for the buttons of the add contact overlay
 */
function overlayAddButtonDivTemplate() {
    return `
    <button type="reset" onclick="closeAddContactOverlay()" id="cancelButton" class="cancelButton">Cancel <img
    src="../assets/img/cancel_contactOverlay.svg"></button>
  
    <button id="createButton" class="createButton"><span>Create contact</span> <img
    src="../assets/img/check.svg"></button>`
}


/**
 * This functions returns the HTML template for the buttons of the edit contact overlay
 * 
 * @returns the HTML template for the buttons of the edit contact overlay
 */
function overlayEditButtonDiv(i) {
    return `
    <button style="display: flex;" type="reset" onclick="deleteContact(${i})" id="cancelButton" class="cancelButton">Delete <img
    src="../assets/img/cancel_contactOverlay.svg"></button>
  
    <button id="createButton" class="createButton"><span>Save</span> <img
    src="../assets/img/check.svg"></button>`
}


/**
 * This function return the HTML template for the edit and delte buttons in desktop view
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 * @returns the HTML template for the edit and delte buttons in desktop view
 */
function editDelteContactDektop(i) {
    return `
    <span onclick="editContact(${i})"><img src="../assets/img/edit_subtask.svg">Edit </span>
    <span onclick="deleteContact(${i})"><img src="../assets/img/delete_subtask.svg">Delete</span>
    `
}


/**
* This function return the HTML template for the edit and delte buttons in mobile view
* 
* @param {number} i - index of the edited contact in the contacts JSON
* @returns the HTML template for the edit and delte buttons in mobile view
*/
function editDeletOverlay(i) {
    return `
    <button onclick="editContact(${i})" class="editDeletOverlayButton"><img src="../assets/img/edit_subtask.svg"> Edit</button>
    <button onclick="deleteContact(${i})" class="editDeletOverlayButton"><img src="../assets/img/delete_subtask.svg">Delete</button>
    `
}


/**
 * 
 *This funtion gets the needed HTML elements for displaying and reseting a conatct next to the contactlist and returns them 
 */
function getContactElements() {
    return {
        circle: document.getElementById('contactsCircle'),
        name: document.getElementById('contactsName'),
        mail: document.getElementById('contactsMail'),
        phone: document.getElementById('contactsPhone')
    };
}


/**
* This funtion gets the needed HTML elements for the add & edit contact overlays and returns them 
* 
*/
function getAddEditContactElements() {
    return {
        overlayHeader: document.getElementById('overlayHeader'),
        overlayHeaderText: document.getElementById('overlayHeaderText'),
        overlayCircle: document.getElementById('overlayCircle'),
        inputName: document.getElementById('inputName'),
        inputMail: document.getElementById('inputMail'),
        inputTel: document.getElementById('inputTel'),
        overlayButtonDiv: document.getElementById('overlayButtonDiv')
    };
}