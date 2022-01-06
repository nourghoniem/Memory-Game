var easy = document.getElementById("btn_1");
var medium = document.getElementById("btn_2");
var hard = document.getElementById("btn_3");
var buttons = document.querySelectorAll(".btn");
var cards_container = document.querySelector(".memory-game-container");
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
    back_img.setAttribute("src","images/crystal.png");
    div.appendChild(front_img);
    div.appendChild(back_img);
    front_images.push(front_img);
    front_images_hard.push(front_img);
   }
   for(var i=0; i<2; i++){
     divs[i].setAttribute("data-framework","flame")
     front_images[i].setAttribute("src","images/flame.png");
   }
   for(var i=2; i<4; i++){
     divs[i].setAttribute("data-framework","plant")
     front_images[i].setAttribute("src","images/plant.png");
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
    front_images[i].setAttribute("src","images/water.png");
   }
   for(var i=6; i<8; i++){
    divs[i].setAttribute("data-framework","fall")
    front_images[i].setAttribute("src","images/fall.png");
   }
   document.getElementById("game-container").style.paddingTop = "10px";
}

var cards;
function levels(){
    if(checkIfFired == false){ 
         checkIfFired = true;
         if(this.id == hard.id){
            //when clicking the hard button
            hardLevel();
            document.removeEventListener("click", levels);
         }
         else if(this.id == medium.id){
            //when clicking the medium button
            mediumLevel();
            document.removeEventListener("click", levels);
         }
          if(checkIfFired==true){
            console.log("Hello is fired")
            get_cards = document.querySelectorAll(".memory-card");
          }
   }
  cards = get_cards;
}
buttons.forEach(button => button.addEventListener("click",  levels))
function checking(){
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
   let getFlipped = document.querySelectorAll(".flip")
   let getCards = document.querySelectorAll(".memory-card")
   if(getFlipped.length == getCards.length ){
      console.log("you won!!");
    }
 }

checking();
