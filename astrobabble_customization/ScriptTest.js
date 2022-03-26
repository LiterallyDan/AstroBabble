var characterchoice = localStorage.getItem("characterchoice")
// loads the variable of the character image to this page from the customization page. this is just a test piece of code to be inserted on other pages. 
window.onload = function (begin){
    document.getElementById("avatarimage").src = characterchoice

}