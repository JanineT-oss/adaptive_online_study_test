

//3. get path to testfile.json
let dataPath = "testfiles/testfile_j.json";

//4. run experiment on page load
document.addEventListener(
    'DOMContentLoaded',
    () => {
        runExperiment(dataPath);
});

//4. define function runExperiment
function runExperiment(dataPath) {
    /*
    RUN EXPERIMENT
    - loads json trial
    - converts json data to an array of trial objects
    - calls run2FC (2-forced-choice) function with the trial array
    */

    // AJAX get request
    let xhr = new XMLHttpRequest();
    xhr.open('GET', dataPath, true);
    xhr.onload = function() {

        // load and parse JSON
        let trialObj = JSON.parse(this.responseText);
        console.log(trialObj);
        
        // object to array
        let trialList = Object.values(trialObj);
        console.log(trialList);
        
        // create reward and loss timelines to get 4 chunks
        let triallisting = createTimeline(trialList);

        console.log(triallisting);
        
        // run Exp
        runExp(triallisting);

    }
    xhr.send();

};

//5. creat timeline function to define properties of a given trial
function createTimeline(trialArray) {
    /*
    input: array of Objects with stimulus type, correct response, picture link
    output: jsPsych-Timeline with html stimuli
    */
    const trialTimeline = [];

    // add trials to timeline: loop through trialList
    trialArray.map(trial => {
        let trialData = {
            // 
            stimulus: constructStim(trial.picture, trial.task, trial.correct, trial.images),

            data: {
                picture: trial.picture,
                task: trial.task,
                correct: trial.correct,
                images: trial.images
            }
        }
        trialTimeline.push(trialData);
        });
    return trialTimeline;
};


//6. stimulus template 
function constructStim(picture, task, correct, images) {

    var trialtype = {
        type: jsPsychImageKeyboardResponse,
        stimulus: images,
        choices: ['f', 'j']
      };
    
      console.log(trialtype);
};

//7. 
function runExp(triallisting) {

    // input: jsPsych timeline (array)
    let timeline = [];
    /* 
    INSTRUCTIONS AND TEST TRIALS
    - verbal instructions
    - one test trial per condition: loss and reward
    -> total timeline: [instructions, testProcedure, trialProcedure]
    */
    let instructionsText1 =`
        <p>In this experiment, a circle will appear in the center 
        of the screen.</p><p>If the circle is <strong>blue</strong>, 
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J 
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
        `

        let instructionsText2 = `
        <p>You have accomplished the test trials!</p>
        <p>The experiment is going to start now.</p>
        <p>Press F or J as fast as you can.</p>
        <p>Press any key to begin.</p>
        `
    let instructions1 = {
        type: "html-button-response",
        stimulus: instructionsText1,
        choices: ['Continue'],
        margin_vertical: '100px',
    };

    let instructions2 = {
        type: "html-button-response",
        stimulus: instructionsText2,
        choices: ['Continue to test trials'],
        margin_vertical: '100px',
    };


    let testingProcedure = {

        timeline: [
            testingBlock = {
                type: jsPsychImageKeyboardResponse,
                stimulus: jsPsych.timelineVariable('stimulus'),
                choices: ['f', 'j'],
                on_finish: function(data) {
                    // add timelineType
                    data.timelineType = "test";
                }
            },
            fixation = {
                type: jsPsychHtmlKeyboardResponse,
                stimulus: '<div style="font-size:60px;">+</div>',
                choices: "NO_KEYS",
                trial_duration: function(){
                    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
                  },
                  data: {
                    task: 'fixation'
                }
            }
        ],
        timeline_variables: [
            {   stimulus: 'img/blue.png' },
            {   stimulus: 'img/orange.png' },
        ],
        randomize_order: false
    };

    
  

    timeline.push(instructions1, instructions2, 
        testingProcedure);

    jsPsych.init({
        timeline: timeline,
        minimum_valid_rt: 200,
        on_finish: function() {
            // save only trial data, not feedback
            // let dataToSave = jsPsych.data.get().filter({timelineType: "trial"}).csv();
            // saveData(dataToSave);
            //jsPsych.data.displayData('json');
        },
        on_close: function(){
            //saveData();
        }
    });
};

//END. start the experiment 
jsPsych.run(timeline);