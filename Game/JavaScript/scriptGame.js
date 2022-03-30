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
    time--;                                             // Decrement time variable by 1
    if (!(time <= 0)) timeID.innerHTML = "Time remaining: " + (time);   // 
}, 1000);                                               // Perform the above two lines for every 1000 milliseconds (1 second)

setInterval (function damage() {
    health = health - increment;
    oxygen.style.width = health + "%";

    updateBar();
}, 1000);

function heal (){
    health = health + 10*increment;
    oxygen.style.width = health + "%";
    time = time + 10;

    updateBar();
}

function hurt () {
    health = health - 5*increment;
    oxygen.style.width = health + "%";
    time = time - 5;

    updateBar();
}

function updateBar() {
    if (health <= 0) {
        oxygen.style.width="0%";
        timeID.innerHTML = "Time remaining: 0";

    }

    if (health > 100) {
        oxygen.style.background="var(--hpaqua)";
    } else if (health >= 60) {
        oxygen.style.background="var(--green)";
    } else if (health >= 30){
        oxygen.style.background="var(--hpylw)";
    } else {
        oxygen.style.background="var(--hpred)";
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                             "Keyboard" Code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function gameOver () {

}

async function getWord () {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await response.json();
    word = await data[0].toUpperCase();
    console.log(word);
    progress = word.split("");
    for (let i = 0; i < progress.length; i++) progress[i] = "_";
    strArray(word);
    clearBtns();
    document.getElementById("screen").style.backgroundColor = "var(--red)";
}

function updateWord (character) {
    for (let i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() == character) {
            progress[i] = character;
        }
    }
    wordBox.innerText = progress.join(" ");
}

function nextWord () {
    var delayInMs = 1000;
    newWordCounter = 3;
    newbtn.innerHTML = "New word " + newWordCounter + " / 3";
    document.getElementById("screen").style.backgroundColor = "var(--green)";
    setTimeout(function() {
        getWord();
        newWordCounter = 3;

    }, delayInMs);
}

function newWord () {
    if (newWordCounter != 0) {
        getWord();
        newWordCounter--;
        newbtn.innerHTML = "New word " + newWordCounter + " / 3";
    } 

    if (newWordCounter == 0) newbtn.classList.add("hide");
}

/*
    Universal function for when each character button is pressed to allow for swift editing,
    > Logs the button pressed
*/
function charPressed (button) {
    if (!button.classList.contains("unusable") 
    && wordScore[0] != wordScore [1] 
    && time > 0) { 
        currentChar = button.innerText;
        console.log(currentChar + " pressed");
        button.classList.add("unusable");
        isValid(button);
    }
}

/*
    Determines whether or not the button is correct and then assigns the correct appearance.
*/
function isValid (button) {
    let valid = false;
    for (let i = 0; i < key.length; i++) {             // Iterates through all unique characters
        if (button.innerText == key[i]) {              // If there is a match:
            valid = true;                               // ^ The current character is valid.
        } 
    }
    if (valid) {
        button.classList.add("correct");               // Set the button's appearance to "correct"
        updateWord(currentChar);
        wordScore[0]++;
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;

        if (wordScore[0] == wordScore[1]) {
            console.log("All correct letters enetered.");
            for (let i = 0; i < wordScore[1]; i++) {
                heal();
            }
            nextWord();
            newbtn.classList.remove("unusable", "hide");
        }

    } else {
        button.classList.add("incorrect");             // Set the button's appearance to "incorrect"
        hurt();
    }
}

/*
    Resizes the "key" array to potentially fit *any* combo of characters.
*/
function resizeArray (array, size) {
    while (size > array.length) array.push(null);
    for (let i = 0; i < array.length; i++) array[i] = null;
    array.length=size;
}

/*
    Iterates through a string twice, adding all the unique characters to an array, serving as the answer key.
*/
function strArray (string) {
    wordScore = [0, 0];
    let input = string.toUpperCase();

    resizeArray (key, [input.length]);
    for (let i = 0; i < key.length; i++) {             // Iterate through key

        for (let j = 0; j < key.length; j++) {         // Iterate through array
            if (key[j] == input[i]) {                  // If current character is in array, break
                break;
            } else if (j == key.length-1 && key[j] != input[i] && input[i].match(/[a-z]/i)) {
                key[i] = input[i];                     // If current character not in array, add it
                wordScore[1]++;
            }
        }
    }
    console.log(key);
    console.log("Word is worth "+wordScore[1]+" points.")
    updateWord(' ');
}

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
