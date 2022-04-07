
/* ----------------------------------
           Home Page JS
------------------------------------*/


//Variables
//lineNum is 0 from the beginning this means it will start at the first slide each time!
let lineNum = 0;
let voiceAudio = document.getElementById("voiceLines");
let voiceSource;
let voiceLines;
let Disable;
let characterchoice;
let slideSource;
let buttonNoise;
//music is muted by default, as such mute is true to begin with. 
let mute = true;
//gets an audio section from the html
var musicAudio = document.getElementById("music");


// loads the variable of the character image to this page from the customization page. this is just a test piece of code to be inserted on other pages. 
window.onload = function (begin){
    //local storage variables
    document.getElementById("showHide").style.display = "none";
    characterchoice = localStorage.getItem("characterchoice")
    Disable = localStorage.getItem("Disable");

    //loads the correct button setup for the tutorial page, doesn't matter if the tutorial page is off for the user.
    document.getElementById("tutorialScrollRight").disabled = true;
    document.getElementById("tutorialScrollLeft").disabled = true;
    document.getElementById("tutorialScrollLeft").style.display = "none";
    document.getElementById("tutorialScrollRight").style.display = "none";

    //if you've never played sets values to default
    if (characterchoice == null){
        characterchoice = "Images/Characters/DefaultBasic.png";
    }
    document.getElementById("characterimage").src = characterchoice;
    console.log(characterchoice);

    //Enables instructions if they haven't disabled them
    console.log (Disable)
    if (Disable != "off")
    { 
        console.log ("Enabled");
        console.log("Instructions still load");
        document.getElementById("generalInstruct").style.display = "block";
    }
}

//closes the instructions/help page 
function exitInstruct ()
{
    console.log("Closed Help Page");
    document.getElementById("generalInstruct").style.display = "none";
    //pauses any tutorial voice lines that may be playing when you leave the tutorial.
    voiceAudio.pause();
}

//Makes it so that instructions are disabled or enabled based on what they input
function checkChange()
{
      document.getElementById("showHide");
      if (document.getElementById("showHide").style.display == "none")
      {
          //When checkmark is on, page won't load again
         console.log("Instructions disabled");
         document.getElementById("showHide").style.display = "block";
         localStorage.setItem('Disable', 'off');
      } 
      else 
      {
         // when checkmark is off, page will load again next time Home is opened
         console.log("Instructions re-enabled");
         document.getElementById("showHide").style.display = "none";
         localStorage.setItem('Disable', 'null');
      }
}




//the right arrow button tells the avatar choice variable to go up by one
function tutorialRight (){
    //adds one to lineNum
    lineNum++;
    //pauses the current sound in preperation for the new one.
    voiceAudio.pause();
    //loads the function below
    voiceLoad();
    }
    //the left arrow button tells the avatar choice variable to go down by one
function tutorialLeft (){
    //removes one from lineNum
    lineNum--;
    //pauses the current sound in preperation for the new one.
    voiceAudio.pause();
    //loads the function below
    voiceLoad();
    }
    //this is the function the plays the sound and decides what buttons to use
function voiceLoad(){
    
    //if the variable is less than 0 cycle back up to 17
    if(lineNum < 0){
        lineNum = 17;
    }
    //if the variable is more than 17 cycle back down ot 0, pretty much once you've gone through all the tutorial slides go to back to the start tutorial screen.
    if(lineNum > 17){
        lineNum = 0;
    }
    //If you are a a default starting position (0) then display a start button rather than the arrow ones
    if(lineNum == 0){
        document.getElementById("tutorialScrollRight").disabled = true;
        document.getElementById("tutorialScrollLeft").disabled = true;
        document.getElementById("tutorialScrollLeft").style.display = "none";
        document.getElementById("tutorialScrollRight").style.display = "none";
        document.getElementById("tutorialStart").style.display="inline";
        document.getElementById("tutorialStart").disabled = false;
    }
    // for every other case show the arrow buttons and not the start button.
    else {
        document.getElementById("tutorialScrollRight").disabled = false;
        document.getElementById("tutorialScrollLeft").disabled = false;
        document.getElementById("tutorialScrollLeft").style.display = "inline";
        document.getElementById("tutorialScrollRight").style.display = "inline";
        document.getElementById("tutorialStart").style.display="none";
        document.getElementById("tutorialStart").disabled = true;
    }
    //sets the variable voiceSource so that it's the sound file location
    voiceSource = "Sound/Voice/Line"+ lineNum + ".wav";
    slideSource = "Images/Tutorial/Tutorial"+ lineNum + ".png";
    document.getElementById ("Slide").src = slideSource;
    //sets the audio source to the correct file
    document.getElementById ("voiceLines").src = voiceSource;
    //plays sound. 
    voiceAudio.play();
    
 } 
 //function for music playing on the homescreen
 //if true and muted then play music, if false and unmuted then stop music
 function menuMusic(){
    if (mute == false) {
        mute = true;
        //changes icon to look muted
        document.getElementById("speaker").src = "Images/Icons/musicIconMuted.png";
        console.log("muted");
        musicAudio.pause();
    }
    else if (mute == true){
        mute = false;
        console.log("unmuted");
        //changes icon to look unmuted
        document.getElementById("speaker").src = "Images/Icons/musicIcon.png";
        //sets volume to half
        musicAudio.volume = 0.5;
        //sets audio to loop forevor
        musicAudio.loop = true;
        //plays music!
        musicAudio.play();
    }
    
 }
 //Bubble sound effect for buttons
 function playSound()
 {
    buttonNoise = new Audio('Sound/Buttons/buttonExpand.mp3');
    buttonNoise.play();
 }

  /* Return to homepage sound */
  function playHome()
 {
    buttonNoise = new Audio('Sound/Buttons/homeClick.mp3');
    buttonNoise.play();
 }

 