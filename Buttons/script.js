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
let currentChar = null;                                 // Variable *that can change* containing the most recent button selection
let word = [];
/*  Can have a variable equivalent to number of unique characters that increments for every correct letter pressed, thus 
    when it reaches the correct value then the word is "correct".
*/

/*
    Universal function for when each character button is pressed to allow for swift editing,
    > Logs the button pressed
    > 
*/
function charPressed (button) {
    if (!button.classList.contains("used")) {           // If button has not already been used
        currentChar = button.innerText;
        console.log(currentChar + " pressed");
        button.classList.add("used");
        /*  Can put a for loop here to iterate through legal characters,
            and if it isn't any of them then it can call "incorrectBtn".
        */
        isValid(button);
    }
}

/*
    Determines whether or not the button is correct and then assigns the correct appearance.
*/
function isValid (button) {
    let valid = false;
    for (let i = 0; i < word.length; i++) {             // Iterates through all unique characters
        if (button.innerText == word[i]) {              // If there is a match:
            valid = true;                               // ^ The current character is valid.
        } 
    }
    if (valid) {
        button.classList.add("correct");               // Set the button's appearance to "correct"
    } else {
        button.classList.add("incorrect");             // Set the button's appearance to "incorrect"
    }
}

/*
    Resizes the "word" array to potentially fit *any* combo of characters.
*/
function resizeArray (array, size) {
    while (size > array.length) {
        array.push(null);
    }
    array.length=size;
}

/*
    Iterates through a string twice, adding all the unique characters to an array, serving as the answer key.
*/
function strArray (string) {
    let input = string.toUpperCase();

    resizeArray (word, [input.length]);
    for (let i = 0; i < word.length; i++) {             // Iterate through word

        for (let j = 0; j < word.length; j++) {         // Iterate through array
            if (word[j] == input[i]) {                  // If current character is in array, break
                break;
            } else if (j == word.length-1 && word[j] != input[i] && input[i].match(/[a-z]/i)) {
                word[i] = input[i];                     // If current character not in array, add it
            }
        }
    }
    console.log(word);
}

/*
    Clear all button "statuses" for when a new word is loaded.
*/
function clearBtn (button) {
    button.classList.remove("used");
    button.classList.remove("incorrect");
    button.classList.remove("correct");
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


