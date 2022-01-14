var easy = document.getElementById("btn_1");
var medium = document.getElementById("btn_2");
var hard = document.getElementById("btn_3");
var buttons = document.querySelectorAll(".btn");
var cards_container = document.querySelector(".memory-game-container");
var player1_container = document.querySelector("#player1_board");
var player2_container = document.querySelector("#player2_board");
//cards_container.style.display="none";
var front_images = [];
//var front_images_hard = [];
var front_images_p2 = [];
//var front_images_p2_hard = [];
var front_img,  back_img;
var front_img_p2,  back_img_p2;
var card_arr = [];
var checkIfFired = false;
var get_cards;
var hasFlippedCard = false;
var firstCard, secondCard;
var div;
var divs = [];
var divs_p2 = [];
var lockBoard = false;
var counter = 0;
let StartingMinutes=0.5;
let time = StartingMinutes * 60;  // get time in sec.
let wonFlag = false;
const countEl=document.getElementById("countdown");
let checkPlayersTurn = false;
let player1_frame = document.getElementById("player1_board");
let player2_frame = document.getElementById("player2_board");

function addCards(){
  for(var i = 0; i < 4; i++){
    div = document.createElement("div");
    divp2 = document.createElement("div");
    div.setAttribute("class", "memory-card");
    divp2.setAttribute("class", "memory-card");
    player1_container.appendChild(div);
    player2_container.appendChild(divp2);
    divs.push(div);
    divs_p2.push(divp2);
    front_img = document.createElement("img");
    back_img = document.createElement("img");
    front_img_p2 = document.createElement("img");
    back_img_p2 = document.createElement("img");
    front_img.setAttribute("class","front-face");
    back_img.setAttribute("class","back-face");
    front_img_p2.setAttribute("class","front-face");
    back_img_p2.setAttribute("class","back-face");
    back_img.setAttribute("src","images/crystal.png");
    back_img_p2.setAttribute("src","images/crystal.png");
    div.appendChild(front_img);
    div.appendChild(back_img);
    divp2.appendChild(front_img_p2);
    divp2.appendChild(back_img_p2);
    front_images.push(front_img);
    //front_images_hard.push(front_img);
    front_images_p2.push(front_img_p2);
    //front_images_p2_hard.push(front_img_p2);
   }
   for(var i=0; i<2; i++){
     divs[i].setAttribute("data-framework","flame")
     front_images[i].setAttribute("src","images/flame.png");
     divs_p2[i].setAttribute("data-framework","flame")
     front_images_p2[i].setAttribute("src","images/flame.png");
   }
   for(var i=2; i<4; i++){
     divs[i].setAttribute("data-framework","plant")
     front_images[i].setAttribute("src","images/plant.png");
     divs_p2[i].setAttribute("data-framework","plant")
     front_images_p2[i].setAttribute("src","images/plant.png");
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
    divs_p2[i].setAttribute("data-framework","water")
    front_images_p2[i].setAttribute("src","images/water.png");
   }
   for(var i=6; i<8; i++){
    divs[i].setAttribute("data-framework","fall")
    front_images[i].setAttribute("src","images/fall.png");
    divs_p2[i].setAttribute("data-framework","fall")
    front_images_p2[i].setAttribute("src","images/fall.png");
   }
   document.getElementById("game-container").style.paddingTop = "10px";
}

var cardsForAction;
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
         }
         if(this.id == medium.id){
            //when clicking the medium button
            StartingMinutes = 1;
            time = StartingMinutes * 60;
            mediumLevel();
            console.log("click event from medium");
         }
         if(checkIfFired==true){
            console.log("Hello is fired")
            get_cards = document.querySelectorAll(".memory-card");
         }
         timer = setInterval(updateCountdown, 1000);
        }
  //checkIfFired = false;
  cardsForAction = get_cards;
}


buttons.forEach(button => button.addEventListener("click",  levels))
function checking(){
  let cards;
  //let cards_p1;
  if(typeof(cardsForAction) !== "undefined"){
     if(checkPlayersTurn == false){
        cards = document.querySelectorAll("#player1_board .memory-card")
        cards.forEach(card => card.addEventListener("click", flipCard))
        player1_frame.style.animation = "mymove 2s infinite"; 
        player1_frame.style.borderStyle = "solid";

     }
     
    //shuffle
     cardsForAction.forEach(card => {
      let random = Math.floor(Math.random() * cards.length)
      card.style.order = random;
    })


  }
  else{
    setTimeout(checking, 1000);
  }
}

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.toggle("flip");
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
  }
  else{
    checkPlayersTurn = true;
    secondCard = this;
    checkForMatch();
    console.log("two cards flipped");
    console.log(checkPlayersTurn);
  }
  if(checkPlayersTurn == true){
      let cards = document.querySelectorAll("#player1_board .memory-card")
      cards.forEach(card => card.removeEventListener("click", flipCard))
      let cards_p2 = document.querySelectorAll("#player2_board .memory-card")
      cards_p2.forEach(card => card.addEventListener("click", flipCard_p2))
      setTimeout(function(){
        player1_board.style.borderStyle = "none";
        player1_board.style.removeProperty("animation");
        player2_board.style.borderStyle = "solid";
        player2_frame.style.animation = "mymove2 2s infinite"; 

      }, 1500)
     
  }
}

function flipCard_p2(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.toggle("flip");
    if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = this;
    }
    else{
      //hasFlippedCard = false;
      checkPlayersTurn = false;
      secondCard = this;
      checkForMatch();
      console.log("two cards flipped");
      console.log(checkPlayersTurn);
    }
    if(checkPlayersTurn == false){
        let cards = document.querySelectorAll("#player2_board .memory-card")
       
        cards.forEach(card => card.removeEventListener("click", flipCard_p2))
        let cards_p2 = document.querySelectorAll("#player1_board .memory-card")
        cards_p2.forEach(card => card.addEventListener("click", flipCard))
        setTimeout(function(){
          player2_board.style.borderStyle = "none";
          player2_board.style.removeProperty("animation");
          player1_frame.style.animation = "mymove 2s infinite"; 
          player1_frame.style.borderStyle = "solid";
  
        }, 1000)
       
    }
    checkPlayersTurn = false;
  }

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ?  disableCards() :  unflipCards();
  // if(isMatch){
  //     disableCards();
  // }
  // else{
  //     unflipCards();
  // }
  checkIfWon();
}

function disableCards(){
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    //lockBoard = false;
    resetBoard();
  }, 1500);
 }
 function resetBoard(){
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
 }

 function checkIfWon(){
   if(wonFlag == false){
    let getFlipped = document.querySelectorAll("#player1_board .flip");
    let getFlipped_p2 = document.querySelectorAll("#player2_board .flip");
    //console.log(getFlipped);
    let getCards = document.querySelectorAll("#player1_board .memory-card")
    let getCards_p2 = document.querySelectorAll("#player2_board .memory-card")
    if(getFlipped.length == getCards.length ){
       wonFlag = true;
       console.log("Player 1 won the game");
    }
    else if(getFlipped_p2.length == getCards_p2.length){
        wonFlag = true;
        console.log("Player 2 won the game");
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

