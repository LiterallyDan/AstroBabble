/* ----------------------------------
           Home Page JS
------------------------------------*/

//Changes setting cog to darker color
function changeSettings()
{
    document.getElementById("myImage").src = "Images/Icons/settingsCog2.png";
}
//Resets settings cog to original color
function resetSettings()
{
    document.getElementById("myImage").src = "Images/Icons/settingsCog.png";
}

//Variables
var Disable;
var characterchoice;
// loads the variable of the character image to this page from the customization page. this is just a test piece of code to be inserted on other pages. 
window.onload = function (begin){

    

    //local storage
    document.getElementById("showHide").style.display = "none";
    characterchoice = localStorage.getItem("characterchoice")
    Disable = localStorage.getItem("Disable");

    //set variable for editing 
////////////////// <<<<<DELETE LATER>>>>>>> ///////////////////

///////////////////////////////////////////////////////////////

    //if you've never played sets values to default
    if (characterchoice == null){
        characterchoice = "Images/Characters/DefaultBasic.png";
    }
    document.getElementById("characterimage").src = characterchoice;
    console.log(characterchoice);
    localStorage.setItem('Disable', 'null');
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



