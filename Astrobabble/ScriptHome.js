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
    console.log (characterchoice)
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
         v.style.display = "block";
         Disable = 1;
      } 
      else 
      {
         v.style.display = "none";
         Disable = 0;
      }
}

/* window.onload = function()
{
    console.log("Disabled Check");
    var v = document.getElementById("showHide");
    v.style.display = "none";
}

window.onload = function()
{
    if(Disable === 1)
        {
            var w = document.getElementById("generalInstruct");
            w.style.display = "none";
        }
}

*/