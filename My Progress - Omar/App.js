// ======================= Splash Screen =================== 
//*************Moving Through Menus*********************
let startGameMenu = document.getElementsByClassName("strgame-button")[0];
let scoreMenu = document.getElementsByClassName("scr-button")[0];
let howtoplayMenu = document.getElementsByClassName("htp-button")[0];
let settingsMenu = document.getElementsByClassName("stg-button")[0];

function Scrolling() {
    let catchStart = document.getElementsByClassName("startgame-menu")[0];
    let catchScore = document.getElementsByClassName("score-menu")[0];
    let catchHowToPlay = document.getElementsByClassName("howto-menu")[0];
    let catchSettings = document.getElementsByClassName("settings-menu")[0];

    startGameMenu.addEventListener('click', function () {
        catchStart.style.display="inline-block";
    });
    scoreMenu.addEventListener('click', function () {
        catchScore.style.display="inline-block";
        
    });
    howtoplayMenu.addEventListener('click', function () {
        catchHowToPlay.style.display="inline-block";
    });
    settingsMenu.addEventListener('click', function () {
        catchSettings.style.display="inline-block";
    });
};

// Sound Effect on All buttons
let butn = document.getElementsByClassName("control-buttons");
console.log(butn);
let effect = document.getElementById("buttonSound");
console.log(effect);

function buttonSoundEffect(){
    for (let i=0; i<butn.length;i++){
        butn[i].addEventListener('mouseover',()=>{
            effect.play();
        });
        
        butn[i].addEventListener('mouseleave',()=>{
            effect.pause();
        });
    }
}






// =========================== Functions of the Game ============================

//get the cards (divs containing the front and back images)
const cards = document.querySelectorAll(".memory-card");
function flipCard(){
console.log(this);
    
}
cards.forEach(card => card.addEventListener("click", flipCard));



// let theme = document.getElementById("theme")
// console.log(theme);
// let Theme = function(){
//     if(theme.checked == true)
//     {
//         document.body.style.backgroundColor = "#121212";
//     }
// }

