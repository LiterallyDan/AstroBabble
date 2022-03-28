/* ----------------------------------
           Home Page JS
------------------------------------*/

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
        console.log("hello")
    }
    document.getElementById("characterimage").src = characterchoice
    console.log (characterchoice)


}