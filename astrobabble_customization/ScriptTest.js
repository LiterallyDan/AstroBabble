
var characterchoice
// loads the variable of the character image to this page from the customization page. this is just a test piece of code to be inserted on other pages. 
window.onload = function (begin){
    characterchoice = localStorage.getItem("characterchoice")
    //if you've never played sets values to default
    if (characterchoice == undefined){
        characterchoice = "Images/DefaultBasic.png"
        console.log("hello")
    }
    //if the variables called do have info, meaning you've played before, do this:
    else {
        console.log("goodbye")
    }
    document.getElementById("avatarimage").src = characterchoice
    console.log (characterchoice)


}