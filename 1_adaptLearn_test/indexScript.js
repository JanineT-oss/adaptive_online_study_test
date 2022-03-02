
let prolific = document.querySelectorAll("#prolific");
let consent = document.querySelectorAll("#consent");
let demographics = document.querySelectorAll("#demographics");
let expplaceholder = document.querySelectorAll("#expplaceholder");
toConsBtn = document.querySelectorAll("#toConsBtn");
toDemoBtn = document.querySelectorAll("#toDemoBtn");
toExpBtn = document.querySelectorAll("#toExpBtn");

// 1. PROLIFIC ID TO CONSENT FORM (display info, check if user interacts, move on)
document.getElementById("toConsBtn").addEventListener('click', function(e){
  e.preventDefault();
  // get prolific id form element to check validity
  let prolificform = document.forms['prolificform'];

  // checkValidity returns false if any item is invalid
  let prolicheck = prolificform.checkValidity();

  if(!prolicheck) {
      // show error messages for invalid items
      prolificform.reportValidity();
  } else {
      // remove finished survey and load new survey
      prolific[0].style.display = "none";
      consent[0].style.display = "block";

  }
});

// 2. CONSENT FORM TO DEMOGRAPHICS (display info, check if user interacts, move on, prep infos to store)
document.getElementById("toDemoBtn").addEventListener('click', function(e){
  e.preventDefault();
  // get consent form element to check validity
  let consentform = document.forms['consentform'];

  // checkValidity returns false if any item is invalid
  let consentcheck = consentform.checkValidity();

  if(!consentcheck) {
      // show error messages for invalid items
      consentform.reportValidity();
  } else {
      // remove finished survey and load new survey
      consent[0].style.display = "none";
      demographics[0].style.display = "block";

      // create FormData object for validity check and AJAX
      const consentData = new FormData(consentform);
      const consentArray = Array.from(consentData);

      // convert FormData to JSON
      let consentJSON = Object.fromEntries(consentData.entries());

      // add id to json
      consentJSON['prolific_id'] = sessionStorage.getItem('prolific_id');
      console.log(sessionStorage.getItem('prolific_id'));

      // get date and time for storage
      let jsdate = new Date();
      let date = jsdate.toLocaleDateString();
      let time = jsdate.toLocaleTimeString();
      consentJSON['date'] = date;
      consentJSON['time'] = time;
    
      //console.log(consentJSON);
      saveConsent(consentJSON);
  }
});

// 3. DEMOGRAPHICS TO EXPERIMENT (display info, check if user interacts, move on, prep infos to store)
document.getElementById("toExpBtn").addEventListener('click', function(e){
  e.preventDefault();
  // get consent form element to check validity
  let demographicsform = document.forms['demographicsform'];

  // checkValidity returns false if any item is invalid
  let democheck = demographicsform.checkValidity();

  if(!democheck) {
      // show error messages for invalid items
      demographicsform.reportValidity();
  } else {
     // remove finished survey and load new survey
      demographics[0].style.display = "none";
      expplaceholder[0].style.display = "block";

      // create FormData object
      let formData = new FormData(demographicsform);

      // convert FormData to JSON
      let formJSON = Object.fromEntries(formData.entries());
      
      // get date and time for storage
      let jsdate = new Date();
      let date = jsdate.toLocaleDateString();
      let time = jsdate.toLocaleTimeString();
      formJSON['date'] = date;
      formJSON['time'] = time;

      // AJAX to save data and redirect
      saveSurvey(formJSON);

  }
});

// 4. CALL SAVE REQUEST CONSENT
function saveConsent(data) {
  // creates object with prolific id and experiment data
  // sends json-object to php for storage
  let params = data;   

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'saveConsent.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  // cross check echos in php script in console
  xhr.onload=function(){
    console.log(this.responseText);
    
  }

  xhr.send(JSON.stringify(params));

  console.log('i want store this data:');
  console.log(params);

  
};

// 5. CALL SAVE REQUEST DEMOGRAPHICS AND TRIGGER EXP 
function saveSurvey(data) {
  // creates object with prolific id and experiment data
  // sends json-object to php for storage
  let params = {
      "prolific_id": sessionStorage.getItem('prolific_id'),
      "data": data
  };    
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'saveDemographics.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  // cross check echos in php script in console
  xhr.onload=function(){
    console.log(this.responseText);
    
  }

  xhr.send(JSON.stringify(params));

  console.log('i want store this data:');
  console.log(params);

  // CALLS EXP!
  xhr.onload = function(){
    window.location.assign("exp_part1.html");
  };
};