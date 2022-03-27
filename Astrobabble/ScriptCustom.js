let colourchoice
let avatar
let characterchoice
let avatarchoice
let awesome
// tells it to run the charfinal function upon loading the page which gets it to display the basic character right away
window.onload = function (begin){
    //this section loads in the previous choice of avatar and colour so that it's the same as where you left off, unless you haven't picked before in which case, it sets the values to their defaults

    colourchoice = localStorage.getItem("colourchoice")
    avatarchoice = localStorage.getItem("avatarchoice")
    //if you've never played sets values to default
    if (colourchoice == undefined){
        colourchoice = "Basic"
    }
    //if the variables called do have info, meaning you've played before, do this:
    else {
        colourchoice = localStorage.getItem("colourchoice")
    }
     //if you've never played sets values to default
    if (avatarchoice == null){
    avatarchoice = 0
    }
    //if the variables called do have info, meaning you've played before, do this:
    else {
    avatarchoice = localStorage.getItem("avatarchoice")
    }
    //load the charfinal function
    CharFinal();
}
//the right arrow button tells the avatar choice variable to go up by one
function Right (){
avatarchoice++
colourchoice = "Basic"
}
//the left arrow button tells the avatar choice variable to go down by one
function Left (){
avatarchoice--
colourchoice = "Basic"
}
//this function activates when the basic colour button is clicked
function Basic(){
    colourchoice = "Basic"
}
//this function activates when the first alt colour button is clicked
function Alt1(){
    colourchoice = "Alt1"
} 
//this function activates when the second alt colour button is clicked
function Alt2(){
    colourchoice = "Alt2"
} 
//this function activates when the third alt colour button is clicked note: it's only available for the default avatar and is disabled until you reach level 10 atleast once.
function Alt3(){
    colourchoice = "Alt3"
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
        document.getElementById("charName").innerHTML = "Space Cadet"
        document.getElementById("basic").style.background = "whitesmoke"
        document.getElementById("alt1").style.background = "darkorchid"
        document.getElementById("alt2").style.background = "orangered"
        document.getElementById("alt3").style.background = "goldenrod"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 1){
        avatar = "Cat"
        document.getElementById("charName").innerHTML = "Captain Cuddle"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "seagreen"
        document.getElementById("alt2").style.background = "plum"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 2){
        avatar = "Fish"
        document.getElementById("charName").innerHTML = "Gillian Gobb"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "seagreen"
        document.getElementById("alt2").style.background = "plum"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if the variable is 0 then load this character, and set the button colours to the following options
    if(avatarchoice == 3){
        avatar = "Skull"
        document.getElementById("charName").innerHTML = "Spooks"
        document.getElementById("basic").style.background = "darkcyan"
        document.getElementById("alt1").style.background = "aqua"
        document.getElementById("alt2").style.background = "purple"
        document.getElementById("alt3").style.background = "lightgrey"
    }
    //if you've reached level 10 this will be set to true and you will unlock the gold style for the default space explorer
    if (awesome == true){
        document.getElementById("alt3").disabled = false
        document.getElementById("alt3").style.opacity = "100%"
    }
    //if you are yet to beat level 10 then you will not be able to use the gold style. 
    if (awesome == null){
        document.getElementById("alt3").disabled = true
        document.getElementById("alt3").style.opacity = "0%"
    }
    // this combines all the above variables to create the image file location so that it can load the correct images. 
    characterchoice = "Images/" + avatar + colourchoice +".png"
    //this sets the image source to the above mentioned variable
    document.getElementById("avatarImage").src = characterchoice
    //can be removed, good for testing purposes
    console.log (characterchoice)
    console.log (avatarchoice)
    //this transfers the variable of the character choice from this page to any other that wants to use it. 
    localStorage.setItem("characterchoice", characterchoice);
    localStorage.setItem("avatarchoice", avatarchoice);
    localStorage.setItem("colourchoice", colourchoice);


}
