const qbtn = document.getElementById('btn-q');          // Every button on the keyboard
const wbtn = document.getElementById('btn-w');          // v
const ebtn = document.getElementById('btn-e');          // v
const rbtn = document.getElementById('btn-r');          // v
const tbtn = document.getElementById('btn-t');          // v
const ybtn = document.getElementById('btn-y');          // v
const ubtn = document.getElementById('btn-u');          // v
const ibtn = document.getElementById('btn-i');          // v
const obtn = document.getElementById('btn-o');          // v
const pbtn = document.getElementById('btn-p');          // v
const abtn = document.getElementById('btn-a');          // v
const sbtn = document.getElementById('btn-s');          // v
const dbtn = document.getElementById('btn-d');          // v
const fbtn = document.getElementById('btn-f');          // v
const gbtn = document.getElementById('btn-g');          // v
const hbtn = document.getElementById('btn-h');          // v
const jbtn = document.getElementById('btn-j');          // v
const kbtn = document.getElementById('btn-k');          // v
const lbtn = document.getElementById('btn-l');          // v
const zbtn = document.getElementById('btn-z');          // v
const xbtn = document.getElementById('btn-x');          // v
const cbtn = document.getElementById('btn-c');          // v
const vbtn = document.getElementById('btn-v');          // v
const bbtn = document.getElementById('btn-b');          // v
const nbtn = document.getElementById('btn-n');          // v
const mbtn = document.getElementById('btn-m');          // v
const wordBox = document.getElementById('screen');      // The "screen" display for the word being guessed
const newbtn = document.getElementById('newWord-btn');  // The button for calling a new word if the user can't guess the current one
const timeID = document.getElementById('timer');        // The timer div @ the top of the document
const oxygen = document.getElementById('oxygen');       // The oxygen bar (or "HP" bar)
const playAgain = document.getElementById('btn-play');  // Button to initiate "play again"
let currentChar = null;                                 // Variable *that can change* containing the most recent button selection
let progress;                                           // Variable for containing the player's progress (word completion)
let word = null;                                        // Initialise present word to "null"
let score = 0;                                          // Initialise current score to 0
let key = [];                                           // Initialise the "answer key" (every valid letter)
let wordScore = [0, 0];                                 // Variable responsible for storing the user's progress toward the finished word
let newWordCounter = 3;                                 // Variable responsible for how many times the player can get a new word
let characterchoice;                                    // Variable for the user's chosen character model
let time = 120;                                         // Initialise specified amount of time for game (how much "oxygen" is in the bar)
let health = 100;                                       // Initialise health (bar fullness) to 100(%)
let increment = 100/time;                               // Initialise increment for hurt / heal functions to perform accurately
let numCorrect = 0;                                     // Correct word counter variable (for awesome = true)
let highScore1 = localStorage.getItem('highscore1') || 0; // Local storage variable for 1st place
let highScore2 = localStorage.getItem('highscore2') || 0; // Local storage variable for 2nd place
let highScore3 = localStorage.getItem('highscore3') || 0; // Local storage variable for 3rd place
let running = true;                                     // "Running" variable to stop unnecessary background damage at leaderboard
let awesome;                                    // ???


/*
    Function that runs when the page is loaded.
    > Responsible for starting the game
*/
window.onload = function() {
    getWord();                                          // Call the "getWord" function (pull word from API)
    updateBar();                                        // Call the "updateBar" function (update the oxygen bar)
    timeID.innerHTML = "Time remaining: " + time;       // Initialise current time remining

    characterchoice = localStorage.getItem("characterchoice")   // Initialise current user character model choice

    if (characterchoice == undefined){                          // If user has not played before:
        characterchoice = "Images/Characters/DefaultBasic.png"  // ... uses default character model
    }
    document.getElementById("characterimage").src = characterchoice // Sets current character model to intended character model
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Oxygen Bar Code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Function that initialises the timer.
    > Increments time value
*/
setInterval (function timer () {
    if (running) time--;                                // Decrement time variable by 1
    if (!(time <= 0)) timeID.innerHTML = "Time remaining: " + (time);   // If time's not up: updates the time every second
}, 1000);                                               // Perform the above two lines for every 1000 milliseconds (1 second)

/*
    Function that deals damage to the user over time.
    > Decreases health by health * increment every second
*/
setInterval (function damage() {
    if (running ) {
        health = health - increment;                    // Decrement health by increment
        oxygen.style.width = health + "%";              // Immediately decrease amount of visible health
        updateBar();                                    // Call "updateBar" function (update health bar's colour)
    }
}, 1000);

/*
    Function that heals the user.
    > Increases health by 10*increment (10%)
*/
function heal (){
    health = health + 10*increment;                     // Increase health by 10%
    oxygen.style.width = health + "%";                  // Immediately update health bar
    time = time + 10;                                   // Increment time by 10 seconds
    updateBar();                                        // Call "updateBar" function (update health bar's colour)
}

/*
    Function that deals damage to the user.
    > Decreases health by 5*increment (5%)
*/
function hurt () {
    health = health - 5*increment;                      // Decrease health by 5%
    oxygen.style.width = health + "%";                  // Immediately update health bar
    time = time - 5;                                    // Decrement time by 5 seconds
    updateBar();                                        // Call "updateBar" function (update health bar's colour)
}   

/*
    Function that controls the colour of the health bar.
    > Cycles between aqua, green, yellow, and red
*/
function updateBar() {
    if (health <= 0) {                                  // If game over:
        oxygen.style.width="0%";                        // ... Lock health bar at 0%
        timeID.innerHTML = "Time remaining: 0";         // ... Lock timer at 0 seconds
        playIncorrect()                                 // You lose audio
        gameOver();                                     // ... call gameOver function (end the game)
    }

    if (health > 100) {                                 // If health is over 100%
        oxygen.style.background="var(--hpaqua)";        // ... health bar is now aqua
    } else if (health >= 60) {                          // If health bar is between 100% and 60%
        oxygen.style.background="var(--green)";         // ... health bar is now green
    } else if (health >= 30){                           // If health bar is between 60% and 30%
        oxygen.style.background="var(--hpylw)";         // ... health bar is now yellow
    } else {                                            // If health bar is below 30%
        oxygen.style.background="var(--hpred)";         // ... health bar is now red
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             "Keyboard" Code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Function that allows the user to call a new word if they are struggling with the current one.
    > Can be used three times
*/
function newWord () {
    if (newWordCounter != 0) {                          // If new word button can still be used:
        getWord();                                      // ... call the "getWord" function (generate new word from API)
        newWordCounter--;                               // ... decrement number of times "newWord" can be called
        newbtn.innerHTML = "New word " + newWordCounter + " / 3";   // ... update button's displayed text to show remaining uses
    } 
    playHome();                                         // Plays sound when button is clicked
    if (newWordCounter == 0) newbtn.classList.add("hide");  // If new word button cannot be used anymore, hides it

}

/*
    Universal function for when each character button is pressed to allow for swift editing,
    > Logs the button pressed
*/
function charPressed (button) {

    if (!button.classList.contains("unusable")          
    && wordScore[0] != wordScore [1] 
    && time > 0) {                                      // If pressed letter is usable and the time has not run out and the word has not been completed:
        playButton();                                   // Plays sound for button press
        currentChar = button.innerText;                 // Set the currently selected button variable to the currently selected button's value
        //console.log(currentChar + " pressed");          // Log the pressed button (for bug testing)
        button.classList.add("unusable");               // Set current button to unusable
        isValid(button);                                // Call "isValid" function to see if the letter is in the word
    }
                                         //Plays sound when button is pressed
}

/*
    Determines whether or not the button is correct and then assigns the correct appearance.
    > Also determines whether or not the word has been finished
*/
function isValid (button) {
    let valid = false;
    for (let i = 0; i < key.length; i++) {              // Iterates through all unique characters
        if (button.innerText == key[i]) {               // If there is a match:
            valid = true;                               // ... the current character is valid.
            break;                                      // ... exit loop (for efficiency)
        } 
    }
    if (valid) {                                        // If letter is in word:
        button.classList.add("correct");                // ... set the button's appearance to "correct"
        updateWord(currentChar);                        // ... call "updateWord" function (to display progress)
        wordScore[0]++;                                 // ... increment user's progress towards finishing the word by 1
        score++;                                        // ... increment user's score
        document.getElementById("score").innerHTML = "Score: " + score; // ... update score on screen

        if (wordScore[0] == wordScore[1]) {             // ... If user has completed the word:
            //console.log("All correct letters entered.");   // ... Log that the word is completed (for bug testing)
            for (let i = 0; i < wordScore[1]; i++) heal();  // For every character in word, heal the user.
            nextWord();                                 // ... call "nextWord" function (to generate a new word)
            newbtn.classList.remove("unusable", "hide"); // ... reveal new word button (if it has been used 3 times prior)
            numCorrect++; // add one to the amount of words correct.
            if (numCorrect == 10) {
                awesome = "true";    // After 10 correct words set awesome to true
                localStorage.setItem("awesome", awesome); // stores the awesome variable to be loaded on the character customization page.
            }
        }
             

    } else {
        button.classList.add("incorrect");              // Set the button's appearance to "incorrect"
        hurt();                                         // Hurt the user
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Game Code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Function responsible for ending the game and moving on.
    > Calls the leaderboard.
*/
function gameOver () {
    running = false;                                    // Disable damage features

    for (let i = 0; i < word.length; i++) {             // For every character in word:
        if (progress[i] == '_') progress[i] = word [i]; // ... If there is an underscore, replace with correct letter
    }
    document.getElementById("screen").style.backgroundColor = "#f54242"; // Pastel red "error" fill
    document.getElementById("screen").style.color = "var(--bg)"; // White text to off-white
    wordBox.innerText = progress.join(" ");             // Updates progress on display so user can see
    newbtn.classList.add("hide");                       // Hide new word button

    setTimeout(function() {                             // Execute inner code after delay (1 second)
        showLBoard();                                   // Show the leaderboard
    }, 1000);                                           // ^ After one second

    health = 100;                                       // Stops game from immediately ending after starting again
}

/*
    Function that reaches out to the random word API and gets a random word.
    > Splits the word into an array for individual character checking
*/
async function getWord () {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1&swear=0");    // Calls API for a random word that is non-profane
    const data = await response.json();                 // Wait for the word from the API
    word = await data[0].toUpperCase();                 // Word variable = the API's word but ALL CAPS
    console.log(word);                                  // Log the generated word (for bug testing)
    progress = word.split("");                          // Progress variable initialised to a split array version of the new word
    for (let i = 0; i < progress.length; i++) progress[i] = "_"; // Initialise every character in new word to underscores
    strArray(word);                                     // Call "strArray" function (create an answer ke for the word)
    clearBtns();                                        // Call "clearBtns" function (reset all buttons)
    document.getElementById("screen").style.color = "var(--dark)";  // Reset the text colour to off-black
    document.getElementById("screen").style.backgroundColor = "var(--red)"; // Reset screen colour to red
}

/*
    Function that updates the word by displaying it on the screen.
    > Converts progress into a string and displays.
*/
function updateWord (character) {
    for (let i = 0; i < word.length; i++) {             // For every letter in the word:
        if (word[i].toUpperCase() == character) progress[i] = character; // ... if current letter = pressed letter, updates progress
    }
    wordBox.innerText = progress.join(" ");             // Updates progress on display so user can see
}

/*
    Function that loads the next word after getting the previous one correct.
    > Provides visual indication regarding success
*/
function nextWord () {
    newWordCounter = 3;                                 // Reset the newWordCounter variable
    newbtn.innerHTML = "New word " + newWordCounter + " / 3"; // Update newWord button to display correct count
    document.getElementById("screen").style.backgroundColor = "var(--green)"; // Set the screen to bright green (thus displaying "success")
    document.getElementById("screen").style.color = "var(--bg)"; // Set the text colour to off-white
    setTimeout(function() {                             // Execute inner code after delay (1 second)
        getWord();                                      // Call "getWord" function (to get a new word)
        newWordCounter = 3;                             // Reset newWordCounter
    }, 1000);                                           // After one second, continue   
    playCorrect();                                      // Correct noise
}

/*
    Resizes the "key" array to potentially fit *any* combo of characters.
    > Answer key size = word size
*/
function resizeArray (array, size) {
    while (size > array.length) array.push(null);       // Increase array size until it is as big as its intended size
    for (let i = 0; i < array.length; i++) array[i] = null; // Reset array (to null)
    array.length=size;                                  // Set the array's length to intended size
}

/*
    Iterates through a string twice, adding all the unique characters to an array, serving as the answer key.
    > Also stores a word's score
*/
function strArray (string) {
    wordScore = [0, 0];                                 // Sets user's progress to 0 and the word's total score to 0
    let input = string.toUpperCase();                   // Set word to ALLCAPS

    resizeArray (key, [input.length]);                  // Call "resizeArray" function (to make sure the answer key can fit the word)
    for (let i = 0; i < key.length; i++) {              // Iterate through key

        for (let j = 0; j < key.length; j++) {          // Iterate through key again:
            if (key[j] == input[i]) {                   // If current character is in array, break
                break;
            } else if (j == key.length-1 && key[j] != input[i]) {
                key[i] = input[i];                      // If current character not in array, add it to the answer key
                wordScore[1]++;                         // Increment word's score by 1
            }
        }
    }
    //console.log(key);                                   // Log the word's answer key (for bug testing)
    console.log("Word is worth "+wordScore[1]+" points.") // Log word's associated score (for bug testing)
    updateWord(' ');                                    // Includes spaces in word by default as users cannot guess "space"  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Leaderboard
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Function responsible for showing the leaderboard.
    > Hides the keyboard, score, and oxygen
*/
function showLBoard() {
    updateLBoard();
    document.getElementById("keyboard").classList.add("hide"); // Hide the keyboard
    document.getElementById("scoreOxygen").classList.add("hide"); // Hide the score and oxygen
    document.getElementById("leaderboard").classList.remove("hide"); // Show the leaderboard
}

/*
    Function responsible for hiding the leaderboard.
    > Shows the keyboard, score, and oxygen
*/
function hideLBoard() {
    document.getElementById("keyboard").classList.remove("hide"); // Show the keyboard
    document.getElementById("scoreOxygen").classList.remove("hide"); // Show the score and oxygen
    document.getElementById("leaderboard").classList.add("hide"); // Hide the leaderboard
}

/*
    Function responsible for updating the leaderboard.
    > Updates and shifts the scores

    Local storage usage learned from: 
    https://stackoverflow.com/questions/16245536/setting-a-variable-in-local-storage
*/
function updateLBoard() {
    highScore1 = localStorage.getItem('highscore1') || 0; // Load 1st score, if null, set to 0
    highScore2 = localStorage.getItem('highscore2') || 0; // Load 2nd score, if null, set to 0
    highScore3 = localStorage.getItem('highscore3') || 0; // Load 3rd score, if null, set to 0

    if (score > highScore3 && score < highScore2) {     // If score is higher than third score but lower than second
        localStorage.setItem('highscore3', score);      // ... Set 3rd score to current score
    } else if (score > highScore2 && score < highScore1) { // If score is higher than second score but lower than first
        localStorage.setItem('highscore3', highScore2); // ... Set 3rd score to 2nd
        localStorage.setItem('highscore2', score);      // ... Set the 2nd score to current score
    } else if (score > highScore1) {                    // If score is higher than highest score
        localStorage.setItem('highscore3', highScore2); // ... Set 3rd score to 2nd
        localStorage.setItem('highscore2', highScore1); // ... Set the 2nd score to 1st
        localStorage.setItem('highscore1', score);      // ... Set the 1st score to current score
    }

    document.getElementById("1st").innerText = "1st Highest : " + localStorage.getItem('highscore1'); // Display highest score
    document.getElementById("2nd").innerText = "2nd Highest : " + localStorage.getItem('highscore2'); // Display 2nd highest score
    document.getElementById("3rd").innerText = "3rd Highest : " + localStorage.getItem('highscore3'); // Display 3rd highest score
    document.getElementById("final-score").innerHTML = "Your score: " + score; // Display most recent score
}

/*
    Function that starts a new game.
    > Resets variables and clears "things"
*/
function newGame (){
    currentChar = null;                                 // Reset the current character
    word = null;                                        // Reset the current word
    score = 0;                                          // Reset score
    key = [];                                           // Reset answer key
    wordScore = [0, 0];                                 // Reset word progress / scoring
    newWordCounter = 3;                                 // Reset new word counter
    time = 120;                                         // Reset time
    health = 100;                                       // Reset health
    numCorrect = 0;                                     // Reset number of correct characters
    running = true;

    clearBtns();                                        // Call "clearBtns" function (reset all buttons)
    document.getElementById("screen").style.color = "var(--dark)";  // Reset the text colour to off-black
    document.getElementById("screen").style.backgroundColor = "var(--red)"; // Reset screen colour to red
    document.getElementById("score").innerHTML = "Score: " + score; // ... update score on screen
    wordBox.innerText = "Loading . . .";                // Reset "current" word

    hideLBoard();
    getWord();                                          // Call the "getWord" function (pull word from API)
    updateBar();                                        // Call the "updateBar" function (update the oxygen bar)
    timeID.innerHTML = "Time remaining: " + time;       // Initialise current time remining
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             Individual Button Content
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    Clear all button "statuses" for when a new key is loaded.
*/
function clearBtns () {
    qbtn.classList.remove("unusable", "incorrect", "correct");
    wbtn.classList.remove("unusable", "incorrect", "correct");
    ebtn.classList.remove("unusable", "incorrect", "correct");
    rbtn.classList.remove("unusable", "incorrect", "correct");
    tbtn.classList.remove("unusable", "incorrect", "correct");
    ybtn.classList.remove("unusable", "incorrect", "correct");
    ubtn.classList.remove("unusable", "incorrect", "correct");
    ibtn.classList.remove("unusable", "incorrect", "correct");
    obtn.classList.remove("unusable", "incorrect", "correct");
    pbtn.classList.remove("unusable", "incorrect", "correct");
    abtn.classList.remove("unusable", "incorrect", "correct");
    sbtn.classList.remove("unusable", "incorrect", "correct");
    dbtn.classList.remove("unusable", "incorrect", "correct");
    fbtn.classList.remove("unusable", "incorrect", "correct");
    gbtn.classList.remove("unusable", "incorrect", "correct");
    hbtn.classList.remove("unusable", "incorrect", "correct");
    jbtn.classList.remove("unusable", "incorrect", "correct");
    kbtn.classList.remove("unusable", "incorrect", "correct");
    lbtn.classList.remove("unusable", "incorrect", "correct");
    zbtn.classList.remove("unusable", "incorrect", "correct");
    xbtn.classList.remove("unusable", "incorrect", "correct");
    cbtn.classList.remove("unusable", "incorrect", "correct");
    vbtn.classList.remove("unusable", "incorrect", "correct");
    bbtn.classList.remove("unusable", "incorrect", "correct");
    nbtn.classList.remove("unusable", "incorrect", "correct");
    mbtn.classList.remove("unusable", "incorrect", "correct");
}

/*
    Add event listeners to every button on the keyboard
*/
qbtn.addEventListener('click', () => { charPressed(qbtn);} )    
wbtn.addEventListener('click', () => { charPressed(wbtn);} )
ebtn.addEventListener('click', () => { charPressed(ebtn);} )
rbtn.addEventListener('click', () => { charPressed(rbtn);} )
tbtn.addEventListener('click', () => { charPressed(tbtn);} )
ybtn.addEventListener('click', () => { charPressed(ybtn);} )
ubtn.addEventListener('click', () => { charPressed(ubtn);} )
ibtn.addEventListener('click', () => { charPressed(ibtn);} )
obtn.addEventListener('click', () => { charPressed(obtn);} )
pbtn.addEventListener('click', () => { charPressed(pbtn);} )
abtn.addEventListener('click', () => { charPressed(abtn);} )
sbtn.addEventListener('click', () => { charPressed(sbtn);} )
dbtn.addEventListener('click', () => { charPressed(dbtn);} )
fbtn.addEventListener('click', () => { charPressed(fbtn);} )
gbtn.addEventListener('click', () => { charPressed(gbtn);} )
hbtn.addEventListener('click', () => { charPressed(hbtn);} )
jbtn.addEventListener('click', () => { charPressed(jbtn);} )
kbtn.addEventListener('click', () => { charPressed(kbtn);} )
lbtn.addEventListener('click', () => { charPressed(lbtn);} )
zbtn.addEventListener('click', () => { charPressed(zbtn);} )
xbtn.addEventListener('click', () => { charPressed(xbtn);} )
cbtn.addEventListener('click', () => { charPressed(cbtn);} )
vbtn.addEventListener('click', () => { charPressed(vbtn);} )
bbtn.addEventListener('click', () => { charPressed(bbtn);} )
nbtn.addEventListener('click', () => { charPressed(nbtn);} )
mbtn.addEventListener('click', () => { charPressed(mbtn);} )
newbtn.addEventListener('click', () => { newWord() } );
playAgain.addEventListener('click', () => { newGame() });

/* If you get the correct word */
 function playCorrect()
 {
    var buttonNoise = new Audio('Sound/Buttons/correctWord.mp3');
    buttonNoise.play();
 }

 /* If you get incorrect word */
 function playIncorrect()
 {
     var buttonNoise = new Audio('Sound/Buttons/losingSound.mp3');
     buttonNoise.play();
 }

 /* Sound on button click */
 function playButton()
 {
     var buttonNoise = new Audio('Sound/Buttons/buttonExpand.mp3');
     buttonNoise.play();
 }

 /* Return to homepage sound */
  function playHome()
 {
    var buttonNoise = new Audio('Sound/Buttons/homeClick.mp3');
    buttonNoise.play();
 }