/**
 * This function initializes the user interface.
 * It includes HTML content and displays the user's initials in the header element.
 * 
 */
async function init(){
    await includeHTML(); 
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    document.getElementById('userIntials').innerText = initials(currentUser); 
}

/**
 * This function returns the initials of the logged in user.
 * If a user is logged in, it extracts the user's name, retrieves their initials using memberInitials().
 * If no user is logged in, it returns 'G'.
 * 
 * @param {Object} currentUser - The user object containing the necessary information
 * @returns {string} The initials of the user
 */
function initials(currentUser) {
    if (currentUser) {
        const member = currentUser.name;  
        return memberInitials(member); 
    } else {
        return 'G'; 
    }
}


/**
 * This function looks for all elements with the attribute w3-include-html and loads the code from the source added as value for this attribute  
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * function will show toggle bar when clicking on the initials
 *
 */
function togglePopupBar() {
    let popupBar = document.getElementById("popupBar");
    popupBar.classList.toggle("d-none");
  }


/**
* This function logs that the user is logged out from the Website
*
*/
function logout(){
    localStorage.removeItem('currentUser');
  }