//Resets all local storage values and removes them
window.onload = function setleaderboard(){
    if (document.getElementById("page").innerHTML != "Settings"){ // this makes the following code only run on the leaderboard page and not the settings page
        document.getElementById("1st").innerText = "1st Highest : " + localStorage.getItem('highscore1'); // Display highest score
        document.getElementById("2nd").innerText = "2nd Highest : " + localStorage.getItem('highscore2'); // Display 2nd highest score
        document.getElementById("3rd").innerText = "3rd Highest : " + localStorage.getItem('highscore3'); // Display 3rd highest score
    }
}
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