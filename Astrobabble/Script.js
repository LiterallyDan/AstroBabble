let health = 100
let score
let time = 120
let interval = time
let increment
let word
let letter0
let letter1
let letter2
let letter3
let letter4
let letter5
let letter6
let letter7
let letter8
let letter9
let anskey0
let anskey1
let anskey2
let anskey3
let anskey4
let anskey5
let anskey6
let anskey7
let anskey8
let anskey9
let lettercount = 0
let wordscomplete = 0
let keycount = 0
let letterscomplete = 0
let freetries = 3

// this controls the timer and tells it to go down once every second
// --not sure how to stop the timer yet...
setInterval(function timer () {
    time = time - 1;
    //tells it to display the changing variable
    document.getElementById("timer").innerHTML = time;
    
// 1000 = 1 second of time 2000 = 2 seconds....
},1000);


//any action that will make the player loose oxygen can go through this function
setInterval(function damage () {
    //increment is the percentage that the width of the life bar will change at every second. It's 100/interval because 100% of the bar divided by the total time
    //gives the percentage that it should drop each second for both the health bar and timer to reach 0 simultaniously
    increment = 100/interval;
    //health drops by this increment every second
    health = health - increment;
    //simply adds the percentage to the health variable to make it usable as a width value.
    document.getElementById("life").style.width = health + "%";
    
    // if health reaches 0 this stuff happens, can be changed to do what you want, it currently displays a simple message saying you died.
    if (health <= 0){
        //this line was created as there was an error that when dropping at imperfect intervals (non integers) 
        //the code would never hit 0 and would instead become negative, and negative values are invalid for width values.
        document.getElementById("life").style.width = "0%";
        document.getElementById("message").innerHTML = "You died :(";
    }
    //if you aren't dead you're alive, so this message displays
    else { document.getElementById("message").innerHTML = "Keep up that word solving!";
    }
    //this can happen if the player's time remaining surpasses the initial given time.
    if (health >= 100){
        document.getElementById("message").innerHTML = "Woah You're on fire!!";
        document.getElementById("life").style.background ="aqua";
        
    }
    //the following if statement just tells the health bar to change colours depending on the amount of time, or oxygen remaining in your tank.

    //between 100 and 60 it's green, above 100 it's aqua, shown above.
    else if (health >= 60){
        document.getElementById("life").style.background ="green";
    }
    //between 60% and 30% it's yellow
    else if (health >= 30){
        document.getElementById("life").style.background ="yellow";
    }
    //below 30% it's red
    else{ 
        document.getElementById("life").style.background ="red";
    }

    //enables all buttons after the time starts because there were issues that were caused if you clicked one before it had begun.
    document.querySelectorAll('button[id="btn"]').forEach(element => {

        element.removeAttribute("disabled");
    });


// an interval of 1 second.     
},1000);
//when the window loads, disables all buttons as a default
window.onload = function start (){
    document.querySelectorAll('button[id="btn"]').forEach(element => {

        element.setAttribute("disabled", "disabled");
    });
    document.getElementById("nextlvl").disabled = true;
    document.getElementById("freetry").disabled = true;
}
// this function can be used to reward the player with extra time
function heal () {
    health = health + 10*increment;
    document.getElementById("life").style.width = health + "%";
    time = time + 10;
    document.getElementById("timer").innerHTML = time;
    // if health is above 0 display this message
    if (health >= 1){
    document.getElementById("message").innerHTML = "Keep up that word solving!";
    }
    if (health >= 100){
        document.getElementById("message").innerHTML = "Woah You're on fire!!";
        document.getElementById("life").style.background ="aqua";   
    }
    //the following if statement just tells the health bar to change colours depending on the amount of time, or oxygen remaining in your tank.
    //between 100 and 60 it's green, above 100 it's aqua, shown above.
    else if (health >= 60){
        document.getElementById("life").style.background ="green";
    }
    //between 60% and 30% it's yellow
    else if (health >= 30){
        document.getElementById("life").style.background ="yellow";
    }
    //below 30% it's red
    else{ 
        document.getElementById("life").style.background ="red";
    }



    
} // heal health bar used when you get an answer right
function hurt () {
    health = health - 10*increment;
    document.getElementById("life").style.width = health + "%";
    
    time = time - 10;
    document.getElementById("timer").innerHTML = time;
    // if health is below 0 display this message 
    if (health <= 0){
        document.getElementById("life").style.width = "0%";
        document.getElementById("message").innerHTML = "You died :(";
    }
    //otherwise display this message
    else { document.getElementById("message").innerHTML = "Keep up that word solving!";
    }
    //between 100 and 60 it's green, above 100 it's aqua, shown above.
    if (health >= 100){
        document.getElementById("message").innerHTML = "Woah You're on fire!!";
        document.getElementById("life").style.background ="aqua";  
    } 
    else if (health >= 60){
        document.getElementById("life").style.background ="green";
    }
    //between 60% and 30% it's yellow
    else if (health >= 30){
        document.getElementById("life").style.background ="yellow";
    }
    //below 30% it's red
    else { 
        document.getElementById("life").style.background ="red";
    }
}


// this function takes the word you've entered and assigns each letter from the string into their own variables
function words() {
    //sets the word value to the one you entered, this will change when an api or other method for word picking is implemented, 
    word = document.getElementById("newword").value;
    letter0 = word.charAt(0);
    console.log (letter0)
    letter1 = word.charAt(1);
    console.log (letter1)
    letter2 = word.charAt(2);
    console.log (letter2)
    letter3 = word.charAt(3);
    console.log (letter3)
    letter4 = word.charAt(4);
    console.log (letter4)
    letter5 = word.charAt(5);
    console.log (letter5)
    letter6 = word.charAt(6);
    console.log (letter6)
    letter7 = word.charAt(7);
    console.log (letter7)
    letter8 = word.charAt(8);
    console.log (letter8)
    letter9 = word.charAt(9);
    console.log (letter9)
    //disables the text input box and makes it invisible, this won't be needed in the final without the text box. 
    document.getElementById("newword").style.opacity = "0%";
    document.getElementById("newword").disabled = true;
    // this grabs the lenght of the word so that the game knows when you have enought letters to move on. 
    lettercount = word.length;
    document.getElementById("freetry").disabled = false;
}
// checks to see if the guessed keys match any of the entered letters, could be made a lot more effiecient most likely
function keycheck () {
    let guess = document.getElementById("guess").value;

    if (guess == letter0 || document.getElementsByClassName("keybrd").innerHTML == letter0){
        anskey0 = letter0
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter0").innerHTML = anskey0;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter1 || document.getElementsByClassName("keybrd").innerHTML == letter1){
        anskey1 = letter1
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter1").innerHTML = anskey1;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter2 || document.getElementsByClassName("keybrd").innerHTML == letter2){
        anskey2 = letter2
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter2").innerHTML = anskey2;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter3 || document.getElementsByClassName("keybrd").innerHTML == letter3){
        anskey3 = letter3
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter3").innerHTML = anskey3;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter4 || document.getElementsByClassName("keybrd").innerHTML == letter4){
        anskey4 = letter4
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter4").innerHTML = anskey4;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    }
    if (guess == letter5 || document.getElementsByClassName("keybrd").innerHTML == letter5){
        anskey5 = letter5
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter5").innerHTML = anskey5;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter6 || document.getElementsByClassName("keybrd").innerHTML == letter6){
        anskey6 = letter6
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter6").innerHTML = anskey6;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    }
    if (guess == letter7 || document.getElementsByClassName("keybrd").innerHTML == letter7){
        anskey7 = letter7
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter7").innerHTML = anskey7;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter8 || document.getElementsByClassName("keybrd").innerHTML == letter8){
        anskey8 = letter8
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter8").innerHTML = anskey8;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 
    if (guess == letter9 || document.getElementsByClassName("keybrd").innerHTML == letter9){
        anskey9 = letter9
        //this adds 1 to the total correct guessed key count
        keycount++;
        //this counts the letters of all the words you've guessed
        letterscomplete++
        document.getElementById("letter9").innerHTML = anskey9;
        //makes the input box null and empty
        document.getElementById("guess").value = null;
    } 


    if (keycount == lettercount){
        console.log ("you did it!")
        // add one to total words finished
        //this adds 1 to the total correct words count
        wordscomplete++
        console.log (wordscomplete)
        console.log (letterscomplete)
        //display this value in a box or use it on a final score screen.
        document.getElementById("nextlvl").disabled = false;
        document.getElementById("freetry").disabled = true;
    }
    
    console.log ()
}
function newword () {
    if (keycount == lettercount){
        document.getElementById("newword").disabled = false;
        document.getElementById("newword").value = null;
        document.getElementById("newword").style.opacity = "100%";
        document.getElementById("letter0").innerHTML = null;
        document.getElementById("letter1").innerHTML = null;
        document.getElementById("letter2").innerHTML = null;
        document.getElementById("letter3").innerHTML = null;
        document.getElementById("letter4").innerHTML = null;
        document.getElementById("letter5").innerHTML = null;
        document.getElementById("letter6").innerHTML = null;
        document.getElementById("letter7").innerHTML = null;
        document.getElementById("letter8").innerHTML = null;
        document.getElementById("letter9").innerHTML = null;
        document.getElementById("guess").value = null;
        keycount = 0
        
    }
    else if (freetries >= 1) {
        document.getElementById("newword").disabled = false;
        document.getElementById("newword").value = null;
        document.getElementById("newword").style.opacity = "100%";
        document.getElementById("letter0").innerHTML = null;
        document.getElementById("letter1").innerHTML = null;
        document.getElementById("letter2").innerHTML = null;
        document.getElementById("letter3").innerHTML = null;
        document.getElementById("letter4").innerHTML = null;
        document.getElementById("letter5").innerHTML = null;
        document.getElementById("letter6").innerHTML = null;
        document.getElementById("letter7").innerHTML = null;
        document.getElementById("letter8").innerHTML = null;
        document.getElementById("letter9").innerHTML = null;
        document.getElementById("guess").value = null;
        keycount = 0
        freetries--
        document.getElementById("freeword").innerHTML = "Free Tries Remaining: " + freetries;

    }
    else{
    console.log ("you have no free words left.")
    }
    document.getElementById("nextlvl").disabled = true;
}








    

