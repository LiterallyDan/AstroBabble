function Reset (){
    localStorage.clear();
}
//lets the tutorial reload again
function tutorialRestart(){
    localStorage.removeItem("Disable");
}

var audio
var playbtn
var mutebt
var neek_bar
        function initAudioPlayer(){
            audio = new Audio();
            audio.src = "Sound/bensound-scifi.mp3";
            audio.loop = true;
            audio.play();
            // Set object references
            playbtn = document.getElementById("playpausebtn");
            mutebtn = document.getElementById("mutebtn");
            halfvolbtn = document.getElementById("halfvolbtn");
            // Add Event Handling
            playbtn.addEventListener("click",playPause);
            mutebtn.addEventListener("click", mute);
            halfvolbtn.addEventListener("click", halfVolume);
            // Functions
            function playPause(){
                if(audio.paused){
                    audio.play();
                    playbtn.style.background = "url(../Images/Icons/pause.png) no-repeat";
                } else {
                    audio.pause();
                    playbtn.style.background = "url(../Images/Icons/play.png) no-repeat";
                }
            }
            function mute(){
                if(audio.muted){
                    audio.muted = false;
                    mutebtn.style.background = "url(../Images/Icons/speaker.png) no-repeat";
                } else {
                    audio.muted = true;
                    mutebtn.style.background = "url(../Images/Icons/speaker_muted.png) no-repeat";
                }
            }
        }
        function halfVolume(){
            audio.loop = true;
            audio.volume = 0.5;
        }
        window.addEventListener("load", initAudioPlayer);


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