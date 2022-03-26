let colour = "Basic"
let avatar = "Default"
let characterchoice
let avatarchoice = 0
let awesome
// tells it to run the charfinal function upon loading the page which gets it to display the basic character right away
window.onload = function (begin){
    CharFinal();
}
//the right arrow button tells the avatar choice variable to go up by one
function Right (){
avatarchoice++
}
//the left arrow button tells the avatar choice variable to go down by one
function Left (){
avatarchoice--
}
//this function activates when the basic colour button is clicked
function Basic(){
    colour = "Basic"
}
//this function activates when the first alt colour button is clicked
function Alt1(){
    colour = "Alt1"
} 
//this function activates when the second alt colour button is clicked
function Alt2(){
    colour = "Alt2"
} 
//this function activates when the third alt colour button is clicked note: it's only available for the default avatar and is disabled until you reach level 10 atleast once.
function Alt3(){
    colour = "Alt3"
} 
//this function takes the avatarchoice and colour variables from above to decide the look and image displayed on the page
function CharFinal(){
    //if the variable is less than 0 cycle back up to 3
    if(avatarchoice < 0){
        avatarchoice = 3
    }
    //if the variable is more than 3 cycle back down ot 0
    if(avatarchoice > 3){
        avatarchoice = 0
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 0){
        avatar = "Default"
        document.getElementById("basic").style.background = "whitesmoke"
        document.getElementById("alt1").style.background = "darkorchid"
        document.getElementById("alt2").style.background = "orangered"
        document.getElementById("alt3").style.background = "goldenrod"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 1){
        avatar = "Cat"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "seagreen"
        document.getElementById("alt2").style.background = "plum"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 2){
        avatar = "Fish"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "seagreen"
        document.getElementById("alt2").style.background = "plum"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 3){
        avatar = "Skull"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "seagreen"
        document.getElementById("alt2").style.background = "plum"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if you've reached level 10 this will be set to true and you will unlock the gold style for the default space explorer
    if (awesome == true){
        document.getElementById("alt3").disabled = false
        document.getElementById("alt3").style.opacity = "100%"
    }
    //if you are yet to beat level 10 then you will not be able to use the gold style. 
    else {
        document.getElementById("alt3").disabled = true
        document.getElementById("alt3").style.opacity = "0%"
    }
    // this combines all the above variables to create the image file location so that it can load the correct images. 
    characterchoice = "Images/" + avatar + colour +".png"
    //this sets the image source to the above mentioned variable
    document.getElementById("avatarimage").src = characterchoice
    //can be removed, good for testing purposes
    console.log (characterchoice)
    console.log (avatarchoice)
    //this transfers the variable of the character choice from this page to any other that wants to use it. 
    localStorage.setItem("characterchoice", characterchoice);

}
