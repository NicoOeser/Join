const STORAGE_TOKEN = 'JCBM19KHMDXFWN16VAJWOY8L41ZV33EX7L3HYKWY';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
const KEY_for_JSON_TASKS = 'Join-Group655_tasks';
const KEY_for_JSON_PW = 'Join-Group655_pw';
const KEY_for_JSON_CONTACS = 'Join-Group655_contacts';
const COLORS =['#FF7A00', '#FF5EB3','#6E52FF','#9327FF','#00BEE8','#1FD7C1','#FF745E','#FFA35E','#FC71FF','#FFC701','#0038FF','#C3FF2B','#FFE62B','#FF4646','#FFBB2B'];
let taskJson = [];
let contactJSON = {};
let loginJson = {};
let afterSetItemServerAnswer = {};

/**
 * This function saves Data into the backend.
 * 
 * @param {string} key - Takes a key for any sort of data.
 * @param {string} value - Takes a value in form of JSON.
 * @returns the stringifyed data.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * This function recieves and loads Data from the backend.
 * 
 * @param {string} key - Key of an data type e.g. an object 
 * @returns parsed Data from the backend.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

/**
 * This function returns the first letters of member name i.e. "John Doe"
 * used in headFootTemplate.js and board.js
 * 
 * @param {string} member - this ist the full name of the member
 * @returns initials of user i.e. "JD" in upper case
 */
function memberInitials(member){
    let initials = member.split(' ').map(name => name[0]).join('');
    return initials.toUpperCase();
}

/**
 * this funktion returns the JSON based on the key
 * 
 * 
 * @param {const} key - which data should be requested
 * @returns - JSON
 */
async function loadJSON(key) {
    let serverAnswer = await getItem(key);
    return JSON.parse(serverAnswer.data.value);
}

/**
 * This function prevents the onclick event of the parent, used in boardSigleTask.js and boardSingleTaskOverlay.js
 * 
 * @param {event} event - onclick event
 */
function innerClick(event) {
    event.stopPropagation(); // prevents event bubbling
  }

 