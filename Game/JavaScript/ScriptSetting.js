//Resets all local storage values and removes them
function Reset (){
    localStorage.clear();
}
//lets the tutorial reload again
function tutorialRestart(){
    localStorage.removeItem("Disable");
}
//Bubble sound effect for buttons
 function playSound()
 {
    var buttonNoise = new Audio('Sound/Buttons/buttonExpand.mp3');
    buttonNoise.play();
 }

 //Sound effect for returning to home screen
 function playHome()
 {
    var buttonNoise = new Audio('Sound/Buttons/homeClick.mp3');
    buttonNoise.play();
 }