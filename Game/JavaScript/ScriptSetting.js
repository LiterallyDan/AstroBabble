//Resets all local storage values and removes them
window.onload = function setleaderboard(){
    /*Reference
    Toh, W. S. (2022, March 27). W.S. Toh. Code Boxx. Retrieved April 7, 2022, from https://code-boxx.com/pass-variables-between-pages-javascript/ */
    highscore1 = localStorage.getItem('highscore1');
    highscore2 = localStorage.getItem('highscore2');
    highscore3 = localStorage.getItem('highscore3');
    if (document.getElementById("page").innerHTML != "Settings"){ // this makes the following code only run on the leaderboard page and not the settings page
        if (highscore1 == null || highscore2 == null || highscore3 == null){
            highscore1 = 0, highscore2 = 0, highscore3 = 0;
        }
        document.getElementById("1st").innerText = "1st Highest : " + highscore1; // Display highest score
        document.getElementById("2nd").innerText = "2nd Highest : " + highscore2; // Display 2nd highest score
        document.getElementById("3rd").innerText = "3rd Highest : " + highscore3; // Display 3rd highest score
    }
}
function Reset (){
    /*Reference
    Toh, W. S. (2022, March 27). W.S. Toh. Code Boxx. Retrieved April 7, 2022, from https://code-boxx.com/pass-variables-between-pages-javascript/ */
    localStorage.clear();
}
//lets the tutorial reload again
function tutorialRestart(){
    /*Reference
    Toh, W. S. (2022, March 27). W.S. Toh. Code Boxx. Retrieved April 7, 2022, from https://code-boxx.com/pass-variables-between-pages-javascript/ */
    localStorage.removeItem("Disable");
}


//Bubble sound effect for buttons (our sound)
 function playSound()
 {
    var buttonNoise = new Audio('Sound/Buttons/buttonExpand.mp3');
    buttonNoise.play();
 }

 //Mouse Click Sound Effect - YouTube. (n.d.). Retrieved April 8, 2022, from https://www.youtube.com/watch?v=i0DON3AjhW4 
 //Sound effect for returning to home screen
 function playHome()
 {
    var buttonNoise = new Audio('Sound/Buttons/homeClick.mp3');
    buttonNoise.play();
 }