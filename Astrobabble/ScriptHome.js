/* ----------------------------------
           Home Page JS
------------------------------------*/
//Disable and enable variable
localStorage.setItem("Disable", Disable);
var Disable = localStorage.setItem("Disable", Disable);




//Changes setting cog to darker color
function changeSettings()
{
    document.getElementById("myImage").src = "Images/settingsCog2.png";
}

//Resets settings cog to original color
function resetSettings()
{
    document.getElementById("myImage").src = "Images/settingsCog.png";
}




var characterchoice
// loads the variable of the character image to this page from the customization page. this is just a test piece of code to be inserted on other pages. 
window.onload = function (begin){
    characterchoice = localStorage.getItem("characterchoice")
    //if you've never played sets values to default
    if (characterchoice == undefined){
        characterchoice = "Images/DefaultBasic.png"
    }
    document.getElementById("characterimage").src = characterchoice
    console.log(characterchoice)

    if ()
    {
        console.log("Instructions Are Disabled");
        document.getElementById("generalInstruct").style.display = "none";
    }
}



//closes the instructions/help page 
function exitInstruct ()
{
    console.log("Closed Help Page");
    var c = document.getElementById("generalInstruct");
    c.style.display = "none";   
}

//Makes it so that instructions are disabled or enabled based on what they input
function checkChange()
{
    console.log("In");

      var v = document.getElementById("showHide");
      if (v.style.display === "none") 
      {
          //When checkmark is on, page won't load again
         console.log("Instructions won't load ever again");
         v.style.display = "block";
          localStorage.setItem('Disable', 'DISABLED');
      } 
      else 
      {
         // when checkmark is off, page will load again next time Home is opened
         console.log("Instructions re-enabled");
         v.style.display = "none";
          localStorage.setItem('Disable', 'ENABLED');
      }
}



