// 1. QUESTIONNAIRES 
// Ein und Ausblenden der FB basierend auf Response
let audit = document.querySelectorAll("#audit");
let LA = document.querySelectorAll("#LA");
let RA = document.querySelectorAll("#RA");
let IU = document.querySelectorAll("#IU");
let SS = document.querySelectorAll("#SS");
let bis = document.querySelectorAll("#BIS");
toLABtn = document.querySelectorAll("#toLABtn");
toRABtn = document.querySelectorAll("#toRABtn");
toIUBtn = document.querySelectorAll("#toIUBtn");
toSSBtn = document.querySelectorAll("#toSSBtn");
toBisBtn = document.querySelectorAll("#toBisBtn");

// AUDIT zu LA
document.getElementById("toLABtn").addEventListener('click', function(e){
    e.preventDefault();
    // get audit form element to check validity
    let auditform = document.forms['auditform'];

    // checkValidity returns false if any item is invalid
    let auditcheck = auditform.checkValidity();

    if(!auditcheck) {
        // show error messages for invalid items
        auditform.reportValidity();
    } else {
        // remove finished survey and load new survey
        audit[0].style.display = "none";
        LA[0].style.display = "block";
    }
});

// LA zu RA
document.getElementById("toRABtn").addEventListener('click', function(e){
    e.preventDefault();
     // get LA form element to check validity
    let LAform = document.forms['LAform'];

    // checkValidity returns false if any item is invalid
    let LAcheck = LAform.checkValidity();

    if(!LAcheck) {
        // show error messages for invalid items
        LAform.reportValidity();
    } else {
        // remove finished survey and load new survey
        LA[0].style.display = "none";
        RA[0].style.display =  "block";
    }
});

// RA zu IU
document.getElementById("toIUBtn").addEventListener('click', function(e){
    e.preventDefault();
     // get RA form element to check validity
    let RAform = document.forms['RAform'];

    // checkValidity returns false if any item is invalid
    let RAcheck = RAform.checkValidity();

    if(!RAcheck) {
        // show error messages for invalid items
        RAform.reportValidity();
    } else {
        // remove finished survey and load new survey
        RA[0].style.display = "none";
        IU[0].style.display = "block";
    }
});

// IU zu SenSeek
document.getElementById("toSSBtn").addEventListener('click', function(e){
    e.preventDefault();
     // get IU form element to check validity
    let IUform = document.forms['IUform'];

    // checkValidity returns false if any item is invalid
    let IUcheck = IUform.checkValidity();

    if(!IUcheck) {
        // show error messages for invalid items
        IUform.reportValidity();
    } else {
        // remove finished survey and load new survey
        IU[0].style.display = "none";
        SS[0].style.display = "block";
    }
});

// SenSeek to BIS
document.getElementById("toBisBtn").addEventListener('click', function(e){
    e.preventDefault();
     // get SS form element to check validity
    let SSform = document.forms['SSform'];

    // checkValidity returns false if any item is invalid
    let SScheck = SSform.checkValidity();

    if(!SScheck) {
        // show error messages for invalid items
        SSform.reportValidity();
    } else {
        // remove finished survey and load new survey
        SS[0].style.display = "none";
        bis[0].style.display = "block";
    }
});

// BIS zu BIS abspeichern prep und in save Funktion dann triggern Exp Part 2
document.getElementById("toPart2").addEventListener('click', function(e){
    e.preventDefault();
    // get audit form element to check validity
    let bisform = document.forms['bisform'];

    // checkValidity returns false if any item is invalid
    let bischeck = bisform.checkValidity();

    if(!bischeck) {
        // show error messages for invalid items
        bisform.reportValidity();
    } else {
        // create FormData object
        let bisData = new FormData(bisform);
        //console.log(Array.from(bisData));
        const bisJSON = Object.fromEntries(bisData.entries());
        
        //audit
        const auditform = document.forms['auditform'];
        const auditData = new FormData(auditform);
        const auditJSON = Object.fromEntries(auditData.entries());
        console.log(auditJSON);

        //loss aversion
        const LAform = document.forms['LAform'];
        const LAData = new FormData(LAform);
        const laJSON = Object.fromEntries(LAData.entries());
        console.log(laJSON);

        //risk aversion
        const RAform = document.forms['RAform'];
        const RAData = new FormData(RAform);
        const raJSON = Object.fromEntries(RAData.entries());
        console.log(raJSON);

        //intolerance of uncertainty
        const IUform = document.forms['IUform'];
        const IUData = new FormData(IUform);
        const iuJSON = Object.fromEntries(IUData.entries());
        console.log(iuJSON);

        //sensation seeking
        const SSform = document.forms['SSform'];
        const SSData = new FormData(SSform);
        const ssJSON = Object.fromEntries(SSData.entries());
        console.log(ssJSON);

        // merge audit, LA, RA, IU, SS, and bis data
        const surveyData = Object.assign(auditJSON, laJSON, raJSON, iuJSON, ssJSON, bisJSON);

        // get date and time for storage
        let jsdate = new Date();
        let date = jsdate.toLocaleDateString();
        let time = jsdate.toLocaleTimeString();
        surveyData['date'] = date;
        surveyData['time'] = time;

        // AJAX to save data and redirect
        saveSurvey(surveyData);

    }
});

// Save Funktion + Triggern Exp part 2
function saveSurvey(data) {
    // creates object with prolific id and experiment data
    // sends json-object to php for storage
    let params = {
        //"prolific_id": prolific_id,
        "prolific_id": sessionStorage.getItem('prolific_id'),
        "data": data
    };    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'saveSurvey.php');
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Triggert Exp Part 2
    xhr.onload = function(){
        document.styleSheets[0].disabled = true;
        runExperiment(dataPath);
    };
    xhr.send(JSON.stringify(params));
};


// 2. LOOK FOR FILE 
// path to param data
const dataPath = `data/test_exp1.txt`;
const continueButton = document.querySelector('#toPart2');
// check for params file every 3 seconds and enable/disable button
searchFile = setInterval(function() {

    let xhr = new XMLHttpRequest();
    // HEAD request: look for file without loading
    xhr.open('HEAD', dataPath, true);
    xhr.onload = function() {
        console.log(xhr.status);
        if (xhr.status == "404") {
            continueButton.disabled = true;
            console.log('file not found');
        } else {
            continueButton.disabled = false;
            clearInterval(searchFile);
            console.log('file is ready');
        };
    }
    xhr.send();
}, 3000);


// 3. RUN EXP again when file is found
toPart2 = document.querySelectorAll("#toPart2");
function runExperiment(dataPath){

    document.getElementById("toPart2").addEventListener('click', function(e){
        e.preventDefault();
        
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', dataPath, true);

        // prompts exp again
        xhr.onload = function(){
            window.location.assign('exp_part1.html');
        };      
        xhr.send(); 
    });     
};
