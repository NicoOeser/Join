const colors = ['#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF', '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B'];
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const contactsContainer = document.getElementById('contactsContainer');

let contactJSONBE = [];

let contactJSON1 = {
  "email": "",
  "initials": "",
  "name": "",
  "bgColor": "",
  "phone": ""
}


/**
 * This function loads the contacts from the backend into the local contact JSON
 * 
 */
async function loadContacts() {
  contactJSONBE = await loadJSON(KEY_for_JSON_CONTACS);
}


/**
 * This funtion renders the contactlist and fills it with the loaded contacts
 * 
 */
async function createContactList() {
  await loadContacts();
  const contacts = contactJSONBE;

  for (const letter of alphabet) {
    const filteredContacts = contacts
      .filter(contact => contact.name.toLowerCase().startsWith(letter))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (filteredContacts.length > 0) {
      const contactHTML = filteredContacts.map((contact, index) => {
        const contactIndex = contacts.indexOf(contact);
        return generateContactHTML(contact, contactIndex);
      }).join('');

      const html = generateLetterSection(letter, contactHTML);
      contactsContainer.innerHTML += html;
    }
  }
}


/**
 * This funtion adds new contacts to the contacts JSON 
 * 
 */
async function addContact() {
  createButton.disabled = true;
  loadContacts();
  getContactsValues();
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact();
  createButton.disabled = false;
}


/**
 * This function renders the contactlist with new contacts, closes the overlay and displays the new contact
 * 
 */
function closeOvelayAfterNewContact() {
  displayNewContact();
  contactsContainer.innerHTML = '';
  createContactList();
  closeAddContactOverlay();
  showAndHideContactAddedOverlay();
}


/**
 * This function displays the newly added contact 
 * 
 */
function displayNewContact() {
  let display = contactJSONBE.length - 1;
  showContactInfo(display);
}


/**
 * This funtion adds the newly edited contact to the contacts JSON and renders teh contactlist
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function addContactViaEditOverlay(i) {
  createButton.disabled = true;
  getContactsValues(i)
  contactJSONBE.splice(i, 1);
  contactJSONBE.push(contactJSON1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  closeOvelayAfterNewContact();
  createButton.disabled = false;
}


/**
 * This function gets the values from the overlay inputfields that are needed for adding & editing a contact 
 * 
 */
function getContactsValues(i) {
  let name = document.getElementById('inputName').value;
  let mail = document.getElementById('inputMail').value;
  let phone = document.getElementById('inputTel').value;
  let initial = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  if (i) {
    let bgColor = contactJSONBE[i].bgColor;
    contactJSON1.bgColor = bgColor;
   } else {
    let bgColor = setColor()
    contactJSON1.bgColor = bgColor;
   }

  contactJSON1.email = mail;
  contactJSON1.initials = initial;
  contactJSON1.name = name;
  contactJSON1.phone = phone;
}


/**
 * This funtion gives every new contact a color
 * 
 * @returns the color of the newly added contact 
 */
function setColor() {
  let i = contactJSONBE.length;
  let color = colors[i % colors.length];
  return color;
}


/**
 * This function sets the desktop view css for the contacts page
 * 
 */
function hideContactInfoDektop() {
  document.getElementById('ContactsInfoContainer').classList.add('dd-none');
}


/**
 * This function sets the responsive css for the contacts page 
 * 
 */
function showHideContactInfo(a, b, c, d, e, f) {
  document.getElementById(a).classList[c](e);
  document.getElementById(b).classList[d](e);
  document.getElementById(b).classList[c](f);
}


/**
 * This function displays the selected contact from the contactlist next to it
 * 
 * @param {number} i - index of the selected contact in the contacts JSON 
 */
function showContactInfo(i) {
  document.getElementById('ContactsInfoContainer').classList.remove('dd-none');

  if (window.innerWidth < 750) {
    showHideContactInfo('leftDiv', 'rightDiv', 'add', 'remove', 'dd-none', 'rightDivRes')
  }

  setContactInfo(i);
  setEditDeleteDivDesktop(i);
}


/**
 * This funtion gets the values that are needes to display a selected conatct next to the conatctlist 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setContactInfo(i) {
  const contactElements = getContactElements();

  contactElements.circle.innerHTML = contactJSONBE[i].initials;
  contactElements.circle.style.backgroundColor = contactJSONBE[i].bgColor;
  contactElements.name.innerHTML = contactJSONBE[i].name;
  contactElements.mail.innerHTML = contactJSONBE[i].email;

  if (contactJSONBE[i].phone == undefined) {
    contactElements.phone.innerHTML = 'Please edit phone number';
  } else {
    contactElements.phone.innerHTML = contactJSONBE[i].phone;
  }
}


/**
 * This function resets the HTML in the area where the selected contacts are displayed
 * 
 */
function resetContactInfo() {
  const contactElements = getContactElements();

  contactElements.circle.innerHTML = '';
  contactElements.circle.style.backgroundColor = 'transparent';
  contactElements.name.innerHTML = '';
  contactElements.mail.innerHTML = '';
  contactElements.phone.innerHTML = '';
}


/**
 * This function assigns the contact that is going to be edited/deleted to the edit and delted buttons 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditDeleteDivDesktop(i) {
  document.getElementById('editDelteContactDektop').innerHTML = editDelteContactDektop(i);

  document.getElementById('editDeletOverlay').innerHTML = editDeletOverlay(i);
}


/**
 * This function edits a selected contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function editContact(i) {
  openAddContactOverlay();
  setEditContactOverlay(i);
}


/**
 * This function sets the edit contact interface and fills the inputfileds and initialscircle with the infotmation of the contact that is gooing to be edited
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
function setEditContactOverlay(i) {
  editContactOverlayTemplate(i);

  getAddEditContactElements();

  overlayHeader.innerHTML = 'Edit Contact';
  overlayHeaderText.classList.add('dd-none');
  overlayCircle.innerHTML = contactJSONBE[i].initials;
  overlayCircle.style.backgroundColor = contactJSONBE[i].bgColor;

  inputName.value = contactJSONBE[i].name;
  inputMail.value = contactJSONBE[i].email;
  inputTel.value = contactJSONBE[i].phone;

  overlayButtonDiv.innerHTML = overlayEditButtonDiv(i);
  document.getElementById('overlayButtonDiv').classList.add('JCspacebetween');
}


/**
 * This function sets the add contact interface
 * 
 */
function setAddContactOVerlay() {
  addContactOverlayTemplate();

  getAddEditContactElements();

  overlayHeader.innerHTML = 'Add contact';
  overlayHeaderText.classList.remove('dd-none');
  overlayCircle.style.backgroundColor = '#d1d1d1';
  overlayCircle.innerHTML = '<img src="../assets/img/person_add_contact_overlay.svg">';

  inputName.value = '';
  inputMail.value = '';
  inputTel.value = '';

  overlayButtonDiv.innerHTML = overlayAddButtonDivTemplate();
}


/**
 * This function deletes a contact from the contact JSON and renders the contactlist without the deleted contact 
 * 
 * @param {number} i - index of the edited contact in the contacts JSON
 */
async function deleteContact(i) {
  contactJSONBE.splice(i, 1);
  await setItem(KEY_for_JSON_CONTACS, contactJSONBE);
  hideContactInfoDektop();
  document.getElementById('contactsContainer').innerHTML = '';
  resetContactInfo();
  createContactList();
  closeAddContactOverlay()

  if (window.innerWidth < 750) {
    showHideContactInfo('leftDiv', 'rightDiv', 'remove', 'add', 'dd-none', 'rightDivRes')
  }
}


/**
 * This function sets the CSS for the opening and closing the add and edit contact overlay
 * 
 */
function setOverlayCSS(a, b, c, d, e, f, g) {
  document.getElementById(a).classList[c](e);
  document.getElementById(b).classList[d](f);
  document.getElementById(b).classList[c](g);
}


/**
 * This function opens the add contact overlay
 * 
 */
function openAddContactOverlay() {
  setOverlayCSS('addContactMenu', 'createContactOverlay', 'add', 'remove', 'dd-none', 'hide', 'show')
  setAddContactOVerlay();
}


/**
 * This function closes the add contact overlay 
 * 
 */
function closeAddContactOverlay() {
  document.getElementById("addContactForm").reset();
  setOverlayCSS('addContactMenu', 'createContactOverlay', 'remove', 'add', 'dd-none', 'hide', 'show')
}


/**
 * This function shows and hides the contact succesfully created overlay after 2 seconds
 * 
 */
function showAndHideContactAddedOverlay() {
  setTimeout(function () {
    showHideOverlay('show', 'hide', 'contactAddedOVerlay')
  }, 300);
  setTimeout(function () {
    showHideOverlay('hide', 'show', 'contactAddedOVerlay')
  }, 2000);
}

/**
 * This function shows and hides the overlays
 * 
 */
function showHideOverlay(x, y, z) {
  document.getElementById(z).classList.add(x);
  document.getElementById(z).classList.remove(y);
}