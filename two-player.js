var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");
var buttons = document.querySelectorAll(".LevelStages");
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
var get_cards, get_cards_p2;
var hasFlippedCard = false;
var firstCard, secondCard;
var div;
var divs = [];
var divs_p2 = [];
var lockBoard = false;
var counter = 0;
let StartingMinutes=1;
let time = StartingMinutes * 60;  // get time in sec.
let wonFlag = false;
const countEl=document.getElementById("countdown");
let checkPlayersTurn = false;
let player1_frame = document.getElementById("player1_board");
let player2_frame = document.getElementById("player2_board");
let score_1 = document.getElementById("score_1");
let score_2 = document.getElementById("score_2");
let start_btn = document.getElementById("start_btn");
let cards_2;
let cards_1;

let level_id;
//score part
//Constant part <depends on level>
const eLevel = 25;
const mLevel = 30;
const hLevel = 50;
//Depends on player <player1,2>
let scoreP1 = 0;
let scoreP2 = 0;
let flipNumbersP1 = 0;
let flipNumbersP2 = 0;
let initValue = 0;


start_btn.addEventListener("click", function(e) {
  timer = setInterval(updateCountdown, 1000);
})

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
    back_img.setAttribute("src","img/mushroom.png");
    back_img_p2.setAttribute("src","img/mushroom.png");
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
     front_images[i].setAttribute("src","img/flame.png");
     divs_p2[i].setAttribute("data-framework","flame")
     front_images_p2[i].setAttribute("src","img/flame.png");
   }
   for(var i=2; i<4; i++){
     divs[i].setAttribute("data-framework","plant")
     front_images[i].setAttribute("src","img/plant.png");
     divs_p2[i].setAttribute("data-framework","plant")
     front_images_p2[i].setAttribute("src","img/plant.png");
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
    divs_p2[i].setAttribute("data-framework","water")
    front_images_p2[i].setAttribute("src","img/water.png");
   }
   for(var i=6; i<8; i++){
    divs[i].setAttribute("data-framework","fall")
    front_images[i].setAttribute("src","img/fall.png");
    divs_p2[i].setAttribute("data-framework","fall")
    front_images_p2[i].setAttribute("src","img/fall.png");
   }
   document.getElementById("game-container").style.paddingTop = "10px";
}

var cardsForAction;
let timer;

function levels(){
    level_id = this.id;
    //cards_container.style.display="flex";
    if(checkIfFired == false){
         checkIfFired = true;
         scoreP1 = 0;
         flipNumbersP1 = 0;
         scoreP2 = 0;
         flipNumbersP2 = 0;
         initValue = eLevel;
         console.log("Constant= " + initValue);
         if(this.id == hard.id){
            //when clicking the hard button
            StartingMinutes = 2;
            time = StartingMinutes * 60;
            hardLevel();
            console.log("click event from hard");
            selectlevelmenu.style.display = "none";
            initValue = hLevel;
            console.log("Constant= " + initValue);
            catchStart.style.display="inline-block";
         }
         if(this.id == medium.id){
            //when clicking the medium button
            StartingMinutes = 2;
            time = StartingMinutes * 60;
            mediumLevel();
            console.log("click event from medium");
            selectlevelmenu.style.display = "none";
            catchStart.style.display="inline-block";
            initValue = mLevel;
            console.log("Constant= " + initValue);
         }
         if(checkIfFired==true){
            console.log("Hello is fired")
            get_cards = document.querySelectorAll("#player1_board .memory-card");
         }
         //timer = setInterval(updateCountdown, 1000);
        }
        player1_frame.style.animation = "mymove 2s infinite"; 
        player1_frame.style.borderStyle = "solid";
  //checkIfFired = false;
  cardsForAction = get_cards;

}


buttons.forEach(button => button.addEventListener("click",  levels))

function checking(){
  let cards;
  //let cards_p2;
  if(typeof(cardsForAction) !== "undefined"){
   
        cards = document.querySelectorAll("#player1_board .memory-card")
        cards.forEach(card => card.addEventListener("click", flipCard))

        player1_frame.style.animation = "mymove 2s infinite"; 
        player1_frame.style.borderStyle = "solid";

   
     
    //shuffle
    //  cardsForAction.forEach(card => {
    //   let random = Math.floor(Math.random() * cards.length)
    //   card.style.order = random;
    //   Theme();
    // })
  }
  else{
    setTimeout(checking, 1000);
  }
}

function flipCard(){
  let cards = [];
  let cards_p2 = [];
 
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.toggle("flip");
  if(!hasFlippedCard){
    hasFlippedCard = true;
    firstCard = this;
  }
  else{
    secondCard = this;
    checkForMatchP1();
    console.log("two cards flipped");
    checkPlayersTurn == false
  
  if(checkPlayersTurn == false){
      let p1 = document.querySelectorAll("#player1_board .memory-card");
      let p2 = document.querySelectorAll("#player2_board .memory-card");
      p1.forEach(function(m){
        if(!m.classList.contains("flip")){
          cards.push(m);
        }
      });
      p2.forEach(function(m){
        if(!m.classList.contains("flip")){
          cards_p2.push(m);
        }
      });
      // for(var i = 0; i < cards.length; i++){
      //   console.log(cards[i]);
      // }
      // for(var i = 0; i < cards_p2.length; i++){
      //   console.log(cards_p2[i]);
      // }
      cards.forEach(card => card.removeEventListener("click", flipCard))
      checkPlayersTurn = true;
      cards_p2.forEach(card => card.addEventListener("click", flipCard_p2))
  
      setTimeout(function(){
        player1_board.style.borderStyle = "none";
        player1_board.style.removeProperty("animation");
        player2_board.style.borderStyle = "solid";
        player2_frame.style.animation = "mymove2 2s infinite"; 
  
      }, 1500)
    }
  }
  }


function flipCard_p2(){
  let cards = [];
  let cards_p2 = [];
  
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.toggle("flip");
    if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = this;
    }
    else{
     
      secondCard = this;
      checkForMatchP2();
      console.log("two cards flipped");
      console.log(checkPlayersTurn);
    
      if(checkPlayersTurn == true){
        let p1 = document.querySelectorAll("#player1_board .memory-card");
        let p2 = document.querySelectorAll("#player2_board .memory-card");
      p1.forEach(function(m){
        if(!m.classList.contains("flip")){
          cards.push(m);
        }
      });
      p2.forEach(function(m){
        if(!m.classList.contains("flip")){
          cards_p2.push(m);
        }
      });
      // for(var i = 0; i < cards.length; i++){
      //   console.log(cards[i]);
      // }
      // for(var i = 0; i < cards_p2.length; i++){
      //   console.log(cards_p2[i]);
      // }
      p2.forEach(card => card.removeEventListener("click", flipCard_p2))
      checkPlayersTurn = false;
      cards.forEach(card => card.addEventListener("click", flipCard))

      setTimeout(function(){
        player2_board.style.borderStyle = "none";
        player2_board.style.removeProperty("animation");
        player1_frame.style.animation = "mymove 2s infinite"; 
        player1_frame.style.borderStyle = "solid";

      }, 1000)
    }
    }
  
  }

 
  function playBkMusic(){
    adio.play();
  }

  function checkForMatchP1(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
       disableCards();
      if (checkBox.checked == true) {
        adio.pause();
        matchSoundEffect.play();
        setTimeout(playBkMusic, 2500);
      } else {
        matchSoundEffect.play();
      }
      flipNumbersP1++;
      scoreP1 = flipNumbersP1 * initValue;
      console.log("Correct Numbers Player 1= ", flipNumbersP1);
      console.log("Score During the Game P1= ", scoreP1);
    } else {
      unflipCards();
    }
    checkIfWon();
  }
  
  function checkForMatchP2(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
      disableCards();
      if (checkBox.checked == true) {
        adio.pause();
        matchSoundEffect.play();
        setTimeout(playBkMusic, 2500);
      } else {
        matchSoundEffect.play();
      }
      flipNumbersP2++;
      scoreP2 = flipNumbersP2 * initValue;
      console.log("Correct Numbers Player 2= ", flipNumbersP2);
      console.log("Score During the Game P2= ", scoreP2);
    } else {
      unflipCards();
    }
    // isMatch ?  disableCards() :  unflipCards();
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


 function reloadWindow() {
  location.reload()
}

 function checkIfWon(){
   let won = document.getElementById("won");
   if(wonFlag == false){
    let getFlipped = document.querySelectorAll("#player1_board .flip");
    let getFlipped_p2 = document.querySelectorAll("#player2_board .flip");
    //console.log(getFlipped);
    let getCards = document.querySelectorAll("#player1_board .memory-card")
    let getCards_p2 = document.querySelectorAll("#player2_board .memory-card")
    if(getFlipped.length == getCards.length){
       wonFlag = true;
       won.textContent = "Player 1 won";
       document.getElementById("won").style.display = "inline";
       player1_board.style.borderStyle = "none";
       player1_board.style.removeProperty("animation");
       player2_board.style.borderStyle = "none";
       player2_board.style.removeProperty("animation");
       if (checkBox.checked == true) {
        adio.pause();
        winningSoundEffect.play();
        setTimeout(playBkMusic, 5000);
        matchSoundEffect.play();
        
      } else {
        winningSoundEffect.play();
      }
      value = true;
      if(value){
        setTimeout(reloadWindow, 12000)
      }
    }
    else if(getFlipped_p2.length == getCards_p2.length){
        wonFlag = true;
        won.textContent = "Player 2 won";
        document.getElementById("won").style.display = "inline";
        console.log("p2 won");
        player2_board.style.borderStyle = "none";
        player2_board.style.removeProperty("animation");
        if (checkBox.checked == true) {
          adio.pause();
          winningSoundEffect.play();
          setTimeout(playBkMusic, 5000);
          matchSoundEffect.play();
          
        } else {
          winningSoundEffect.play();
        }
        value = true;
        if(value){
          setTimeout(reloadWindow, 12000)
        }
    }
  }
    console.log(wonFlag);
    return wonFlag;

  }
 
 function updateCountdown(){
  let ifWon = checkIfWon();
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  if(seconds==0 & minutes==0){
    let won = document.getElementById("won");
      countEl.innerHTML=`0:00`
      clearInterval(timer);
      if(scoreP2 > scoreP1){
        //checkIfWon();
        won.textContent = "Player 2 won!!";
        document.getElementById("won").style.display = "inline";
        console.log("p2 won");
      }
      else if(scoreP1 > scoreP2){
        won.textContent = "Player 1 won!!";
        document.getElementById("won").style.display = "inline";
        console.log("p1 won");
      }
      else if(scoreP1 == scoreP2){
        console.log("tie");
        document.getElementById("lost").style.display = "inline";
        if(level_id != undefined){
          if(level_id == "easy"){
            document.getElementById("lost").style.bottom = "25px";
          }
          else {
            document.getElementById("lost").style.bottom = "180px";
          }
        }
      }
      cards_1.forEach(card => card.removeEventListener("click", flipCard));
      cards_2.forEach(card => card.removeEventListener("click", flipCard_p2));
      player2_board.style.borderStyle = "none";
      player2_board.style.removeProperty("animation");
      player1_board.style.borderStyle = "none";
      player1_board.style.removeProperty("animation");
  }
  else{
   if(ifWon){
      clearInterval(timer);
      checkIfWon();
      cards_1.forEach(card => card.removeEventListener("click", flipCard));
      cards_2.forEach(card => card.removeEventListener("click", flipCard_p2));  
      player2_board.style.borderStyle = "none";
      player2_board.style.removeProperty("animation");
      player1_board.style.borderStyle = "none";
      player1_board.style.removeProperty("animation");
   }
   seconds = seconds < 10 ? '0' + seconds : seconds;
   if(seconds < 10 && minutes==0){
    document.getElementById("countdown").style.color = "firebrick";
   }
   countEl.innerHTML=`${minutes}:${seconds}`;
   score_1.innerHTML = `1st Player: ${scoreP1}`;
   score_2.innerHTML = `2nd Player: ${scoreP2}`;
 }
 --time;
}
checking();