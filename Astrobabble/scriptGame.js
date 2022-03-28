const qbtn = document.getElementById('btn-q');
const wbtn = document.getElementById('btn-w');
const ebtn = document.getElementById('btn-e');
const rbtn = document.getElementById('btn-r');
const tbtn = document.getElementById('btn-t');
const ybtn = document.getElementById('btn-y');
const ubtn = document.getElementById('btn-u');
const ibtn = document.getElementById('btn-i');
const obtn = document.getElementById('btn-o');
const pbtn = document.getElementById('btn-p');
const abtn = document.getElementById('btn-a');
const sbtn = document.getElementById('btn-s');
const dbtn = document.getElementById('btn-d');
const fbtn = document.getElementById('btn-f');
const gbtn = document.getElementById('btn-g');
const hbtn = document.getElementById('btn-h');
const jbtn = document.getElementById('btn-j');
const kbtn = document.getElementById('btn-k');
const lbtn = document.getElementById('btn-l');
const zbtn = document.getElementById('btn-z');
const xbtn = document.getElementById('btn-x');
const cbtn = document.getElementById('btn-c');
const vbtn = document.getElementById('btn-v');
const bbtn = document.getElementById('btn-b');
const nbtn = document.getElementById('btn-n');
const mbtn = document.getElementById('btn-m');
const wordBox = document.getElementById('screen');
const newbtn = document.getElementById('newWord-btn');
const timeID = document.getElementById('timer');
const oxygen = document.getElementById('oxygen');
let currentChar = null;                                 // Variable *that can change* containing the most recent button selection
let progress;
let word = null;
let score = 0;
let key = [];
let wordScore = [0, 0];
let characterchoice

window.onload = function() {
    getWord();
    updateBar();
    timeID.innerHTML = "Time remaining: " + time;

    characterchoice = localStorage.getItem("characterchoice")
    //if you've never played sets values to default
    if (characterchoice == undefined){
        characterchoice = "Images/DefaultBasic.png"
        console.log("hello")
    }
    document.getElementById("characterimage").src = characterchoice
} 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  Oxygen Bar Code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let time = 120;
let health = 100;
let increment = 100/time;

setInterval (function timer () {
    time--;
    if (!(time <= 0)) timeID.innerHTML = "Time remaining: " + (time);
}, 1000);

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
    health = health - 10*increment;
    oxygen.style.width = health + "%";
    time = time - 10;

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

async function getWord () {
    const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
    const data = await response.json();
    word = await data[0].toUpperCase();
    console.log(word);
    progress = "";
    progress = word.split("");
    for (let i = 0; i < progress.length; i++) progress[i] = "_";
    strArray(word);
    clearBtns();
}

function updateWord (character) {
    for (let i = 0; i < word.length; i++) {
        if (word[i].toUpperCase() == character) {
            progress[i] = character;
        }
    }
    wordBox.innerText = progress.join(" ");
}

/*
    Universal function for when each character button is pressed to allow for swift editing,
    > Logs the button pressed
    > 
*/
function charPressed (button) {
    if (!button.classList.contains("used") 
    && wordScore[0] != wordScore [1] 
    && time > 0) { 
        currentChar = button.innerText;
        console.log(currentChar + " pressed");
        button.classList.add("used");
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
    qbtn.classList.remove("used", "incorrect", "correct");
    wbtn.classList.remove("used", "incorrect", "correct");
    ebtn.classList.remove("used", "incorrect", "correct");
    rbtn.classList.remove("used", "incorrect", "correct");
    tbtn.classList.remove("used", "incorrect", "correct");
    ybtn.classList.remove("used", "incorrect", "correct");
    ubtn.classList.remove("used", "incorrect", "correct");
    ibtn.classList.remove("used", "incorrect", "correct");
    obtn.classList.remove("used", "incorrect", "correct");
    pbtn.classList.remove("used", "incorrect", "correct");
    abtn.classList.remove("used", "incorrect", "correct");
    sbtn.classList.remove("used", "incorrect", "correct");
    dbtn.classList.remove("used", "incorrect", "correct");
    fbtn.classList.remove("used", "incorrect", "correct");
    gbtn.classList.remove("used", "incorrect", "correct");
    hbtn.classList.remove("used", "incorrect", "correct");
    jbtn.classList.remove("used", "incorrect", "correct");
    kbtn.classList.remove("used", "incorrect", "correct");
    lbtn.classList.remove("used", "incorrect", "correct");
    zbtn.classList.remove("used", "incorrect", "correct");
    xbtn.classList.remove("used", "incorrect", "correct");
    cbtn.classList.remove("used", "incorrect", "correct");
    vbtn.classList.remove("used", "incorrect", "correct");
    bbtn.classList.remove("used", "incorrect", "correct");
    nbtn.classList.remove("used", "incorrect", "correct");
    mbtn.classList.remove("used", "incorrect", "correct");
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
newbtn.addEventListener('click', () => { getWord() } );
