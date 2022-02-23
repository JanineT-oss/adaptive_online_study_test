var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

// add eventlistener for buttons
document.getElementById("nextBtn").addEventListener('click', function() {
    nextPrev(1);
});


/// ich muss hier nochmal schauen wie ich den Button klick mit dem submitten und dam speichern verbinde

function submitConsent() {
  let consentForm = document.forms['consentform'];
  let messageField = document.querySelector('#message');

  // create FormData object for validity check and AJAX
  const consentData = new FormData(consentForm);
  const consentArray = Array.from(consentData);

  // checkValidity returns false if any item is invalid
  let consentCheck = consentForm.checkValidity();

  if(!consentCheck) {
    // show error messages for invalid items
    consentForm.reportValidity();
    // show warning if any value is "no"
  } else if (JSON.stringify(consentArray).includes("no")) {
    messageField.style.display = "block";
    messageField.innerHTML = `Thank you for your interest in our study.
                              You did not consent to proceed.`;
  } else {
    // delete error message if still present
    messageField.style.display = "none";
    // convert FormData to JSON
    let consentJSON = Object.fromEntries(consentData.entries());

    // add id to json
    consentJSON['prolific_id'] = sessionStorage.getItem('prolific_id');

    // create random ID, replace sessionStorage id and save both in consent
    let newID = randomID();
    consentJSON['new_id'] = newID;
    sessionStorage.setItem('prolific_id', newID);

    // get date and time for storage
    let jsdate = new Date();
    let date = jsdate.toLocaleDateString();
    let time = jsdate.toLocaleTimeString();
    consentJSON['date'] = date;
    consentJSON['time'] = time;
    
    //console.log(consentJSON);
    saveConsent(consentJSON);

    // save consent and move to next tab
    let infoBlocks = document.getElementsByClassName("info");
    // Hide the current tab:
    infoBlocks[currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + 1;
      // Display the next tab:
      showTab(currentTab);
  }
}

function submitID() {
  let idForm = document.forms['prolific'];

  // check correct ID
  let idCheck = idForm.checkValidity();
  // show error if ID is invalid
  if(!idCheck) {
    idForm.reportValidity();
  
  // if ID is valid: save ID and move to next tab
  } else {
    // ID as session storage
    let prolific = document.querySelector('#prolific_id').value;
    sessionStorage.setItem('prolific_id', prolific);

    // move to next tab
    let infoBlocks = document.getElementsByClassName("info");
    // Hide the current tab:
    infoBlocks[0].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + 1;
      // Display the next tab:
      showTab(currentTab);
  }
}

function saveConsent(data) {
  // creates object with prolific id and experiment data
  // sends json-object to php for storage
  let params = data;   

  console.log(params);
  
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'saveConsent.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
 
  console.log('i want store data');
  
 xhr.send(JSON.stringify(params));
};

// random ID to replace prolific ID
function randomID() {
  return Math.random().toString(36).substr(2, 9);
};