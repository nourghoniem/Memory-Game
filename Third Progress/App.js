// ======================= Splash Screen =================== 
//*************Moving Through Menus*********************
let startGameMenu = document.getElementsByClassName("strgame-button")[0];
let scoreMenu = document.getElementsByClassName("scr-button")[0];
let howtoplayMenu = document.getElementsByClassName("htp-button")[0];
let settingsMenu = document.getElementsByClassName("stg-button")[0];
let catchStart = document.getElementsByClassName("startgame-menu")[0];
let catchScore = document.getElementsByClassName("score-menu")[0];
let catchHowToPlay = document.getElementsByClassName("howto-menu")[0];
let catchSettings = document.getElementsByClassName("settings-menu")[0];
let start = document.getElementsByClassName("startPlayBTN")[0];
let allSplash = document.getElementsByClassName("control-menu")[0];


var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");
var buttons = document.querySelectorAll(".LevelStages");
var cards_container = document.querySelector(".memory-game-container");
//cards_container.style.display="none";
var front_images = [];
var front_images_hard = [];
var divs = [];
var front_img,  back_img;
var card_arr = [];
var checkIfFired = false;
var get_cards;
var hasFlippedCard = false;
var firstCard, secondCard;
var div;
var divs = [];
var lockBoard = false;
var counter = 0;
let StartingMinutes=0.5; 
let time = StartingMinutes * 60;  // get time in sec.
let wonFlag = false;
const countEl=document.getElementById("countdown");




function Scrolling() {
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


function startTheGame(){
    
    start.addEventListener('click',()=>{
        allSplash.style.display="none";
    })
}

// Sound Effect on All buttons
let butn = document.getElementsByClassName("control-buttons");
let effect = document.getElementById("buttonSound");
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


function addCards(){
  for(var i = 0; i < 4; i++){
    div = document.createElement("div");
    div.setAttribute("class", "memory-card");
    cards_container.appendChild(div);
    divs.push(div);
    front_img = document.createElement("img");
    back_img = document.createElement("img");
    front_img.setAttribute("class","front-face");
    back_img.setAttribute("class","back-face");
    back_img.setAttribute("src","img/crystal.png");
    div.appendChild(front_img);
    div.appendChild(back_img);
    front_images.push(front_img);
    front_images_hard.push(front_img);
   }
   for(var i=0; i<2; i++){
     divs[i].setAttribute("data-framework","flame")
     front_images[i].setAttribute("src","img/flame.png");
   }
   for(var i=2; i<4; i++){
     divs[i].setAttribute("data-framework","plant")
     front_images[i].setAttribute("src","img/plant.png");
   }
}

function mediumLevel(){
   addCards();
   document.getElementById("game-container").style.paddingTop = "60px";
}

function hardLevel(){
   addCards();
   addCards()

   for(var i=4; i<6; i++){
    divs[i].setAttribute("data-framework","water")
    front_images[i].setAttribute("src","img/water.png");
   }
   for(var i=6; i<8; i++){
    divs[i].setAttribute("data-framework","fall")
    front_images[i].setAttribute("src","img/fall.png");
   }
   document.getElementById("game-container").style.paddingTop = "10px";
}

var cards;
let timer;

function levels(){
    //cards_container.style.display="flex";
    if(checkIfFired == false){ 
         checkIfFired = true;
         if(this.id == hard.id){
            //when clicking the hard button
            StartingMinutes = 1;
            time = StartingMinutes * 60; 
            hardLevel();
            console.log("click event from hard");
            this.removeEventListener("click", levels);
         }
          else if(this.id == medium.id){
            //when clicking the medium button
            StartingMinutes = 1;
            time = StartingMinutes * 60; 
            mediumLevel();
            console.log("click event from medium");
            this.removeEventListener("click", levels);
         }
         if(checkIfFired==true){
            console.log("Hello is fired")
            get_cards = document.querySelectorAll(".memory-card");
         }
         timer = setInterval(updateCountdown, 1000);
    }
  checkIfFired = false;
  cards = get_cards;
}

buttons.forEach(button => button.addEventListener("click",  levels))
function checking(){
  //console.log(cards);
  if(typeof(cards) !== "undefined"){
    let get = document.querySelectorAll(".memory-card")
    cards.forEach(card => card.addEventListener("click", flipCard))
   
    //shuffle
    cards.forEach(card => {
      let random = Math.floor(Math.random() * get.length)
      card.style.order = random;
    })
  }
  else{
    setTimeout(checking, 1000);
  }
}

function flipCard(){
  if(lockBoard) return;
  this.classList.toggle("flip");
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
  }
  else{
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ?  disableCards() :  unflipCards();
  checkIfWon();
}

function disableCards(){
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    lockBoard = false;
  }, 1500);
 }

 function checkIfWon(){
   if(wonFlag == false){
    let getFlipped = document.querySelectorAll(".flip")
    let getCards = document.querySelectorAll(".memory-card")
    if(getFlipped.length == getCards.length ){
       wonFlag = true;
       console.log("you won!!");
    }
   }
   return wonFlag;
 }
 function updateCountdown(){
  let ifWon = checkIfWon();
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  if(seconds==0 & minutes==0){
      countEl.innerHTML=`0:00`
      if(ifWon){
        console.log("You won at the last second!");
      }
      clearInterval(timer);
      console.log("lost");
  }
  else{
   if(ifWon){
      clearInterval(timer);
      console.log("you won!!");
   }
   seconds = seconds < 10 ? '0' + seconds : seconds;
   if(seconds < 10 && minutes==0){
    document.getElementById("countdown").style.color = "firebrick";
   }
   countEl.innerHTML=`${minutes}:${seconds}`
 }
 --time;
}
checking();

