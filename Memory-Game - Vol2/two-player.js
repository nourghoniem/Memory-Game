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
var get_cards;
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

/***************************************************************************************************************************************************************/

let inputoneSection = document.querySelector(".input_playerData .playerOne_DataName");
let inputtwoSection = document.querySelector(".input_playerData .playerTwo_DataName"); // Player Input Element getting His Name
let StartBtn = document.querySelector(".popup_StartButton button"); // Start Button Element
let playerScore = document.querySelector(".listOfScores");
let scoreMainList = document.querySelector(".ListContainer");
let listScoreBtn = document.querySelector(".scoreBottomOk button");

/************************************ Set Player Data in Array ********************************************/
let ArrOfAddedData = [];
function setPlayerData(playerName) {
  let savedData = {
    id: Date.now(),
    text: playerName,
    score: 0,
  };
  ArrOfAddedData.push(savedData);
  console.log(ArrOfAddedData);
}
/***************************************** Save Data in Array From localstorge even After Reload *******************************/
if (localStorage.key(0) != null) {
  for (let i = 0; i < localStorage.length; i++) {
    ArrOfAddedData[i] = {
      id: parseInt(localStorage.key(i)),
      text: JSON.parse(localStorage.getItem(localStorage.key(i)))[0],
      score: JSON.parse(localStorage.getItem(localStorage.key(i)))[1],
    };

  }
  console.log(ArrOfAddedData);
  ArrOfAddedData.sort(function(a,b){
    return b.score-a.score;

  })
  console.log(ArrOfAddedData);
  for(let i=0 ; i<ArrOfAddedData.length;i++)
  {
    if (ArrOfAddedData[i].score >= 0) {
      let InitMessage2 = document.querySelector(".NoDataMessage");

      if (document.body.contains(document.querySelector(".NoDataMessage"))) {
        InitMessage2.remove();
      }

      let playerSpan = document.createElement("span");
      let textComp = document.createTextNode(ArrOfAddedData[i].text);
      playerSpan.setAttribute("id", ArrOfAddedData[i].id);
      playerSpan.appendChild(textComp);
      playerSpan.className = "dataBox";

      let scoreeData = document.createElement("span");
      let textScore = document.createTextNode(ArrOfAddedData[i].score);
      scoreeData.appendChild(textScore);
      scoreeData.className = "NumericalScore";

      playerSpan.appendChild(scoreeData);
      playerScore.appendChild(playerSpan);
    }
  }
}
/**************************** Delete From Array *****************************/
function deleteDataWith(DataID) {
  ArrOfAddedData = ArrOfAddedData.filter(function deleteFromArray(f) {
    return f.id != DataID;
  });
}
/**************************************************************************************************************/

let PlayerOne;
let PlayerTwo;
start_btn.addEventListener("click", function(e) {
  let repeatedName1 = 0;
  let repeatedName2= 0;
  if (inputoneSection.value === "") {
    Swal.fire(
      `You Didn't Enter Your Name`,
      "Please Enter Your Name First!",
      "error"
    );
  } else {
    for (let i = 0; i < ArrOfAddedData.length; i++) {
      if (ArrOfAddedData[i].text == inputoneSection.value) {
        repeatedName1 = 1;
        Swal.fire({
          title:
            "You entered Duplicated Name do you want to resume or New Start",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Resume",
          denyButtonText: `New Start`,
          icon: "warning",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Resumed", "", "success");
            PlayerOne=inputoneSection.value;
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);
            timer = setInterval(updateCountdown, 1000);
          } else if (result.isDenied) {
            Swal.fire("You Shold Enter New Name", "", "info");
            deleteDataWith(localStorage.key(i));
            localStorage.removeItem(localStorage.key(i));
          }
        });
        break;
      }
    }
    if (!repeatedName1) {
      setPlayerData(inputoneSection.value);
      PlayerOne=inputoneSection.value;
      inputoneSection.value = "";
      ArrOfAddedData.forEach((savedData) => {
        if (savedData.score == 0) {
          localStorage.setItem(savedData.id,JSON.stringify([savedData.text, savedData.score]));
        }
      });
      timer = setInterval(updateCountdown, 1000);
    }
  }

  if (inputtwoSection.value === "") {
    Swal.fire(
      `You Didn't Enter Your Name`,
      "Please Enter Your Name First!",
      "error"
    );
  } else {
    for (let i = 0; i < ArrOfAddedData.length; i++) {
      if (ArrOfAddedData[i].text == inputtwoSection.value) {
        repeatedName2 = 1;
        Swal.fire({
          title:
            "You entered Duplicated Name do you want to resume or New Start",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Resume",
          denyButtonText: `New Start`,
          icon: "warning",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire("Resumed", "", "success");
            PlayerTwo=inputtwoSection.value;
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);
            timer = setInterval(updateCountdown, 1000);
          } else if (result.isDenied) {
            Swal.fire("You Shold Enter New Name", "", "info");
            deleteDataWith(localStorage.key(i));
            localStorage.removeItem(localStorage.key(i));
          }
        });
        break;
      }
    }
    if (!repeatedName2) {
      setPlayerData(inputtwoSection.value);
      PlayerTwo=inputtwoSection.value;
      inputoneSection.value = "";
      ArrOfAddedData.forEach((savedData) => {
        if (savedData.score == 0) {
          localStorage.setItem(savedData.id,JSON.stringify([savedData.text, savedData.score]));
        }
      });
      timer = setInterval(updateCountdown, 1000);
    }
  }
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
            get_cards = document.querySelectorAll(".memory-card");
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
  //let cards_p1;
  if(typeof(cardsForAction) !== "undefined"){
     if(checkPlayersTurn == false){
        cards = document.querySelectorAll("#player1_board .memory-card")
        cards.forEach(card => card.addEventListener("click", flipCard))
        player1_frame.style.animation = "mymove 2s infinite"; 
        player1_frame.style.borderStyle = "solid";

     }
     
    //shuffle
    //  cardsForAction.forEach(card => {
    //   let random = Math.floor(Math.random() * cards.length)
    //   card.style.order = random;
    // })


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
    checkForMatchP1();
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
      checkForMatchP2();
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
  // function checkForMatch(){
  //   let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  //   if (isMatch) {
  //     disableCards();
  //     // if (checkBox.checked == true) {
  //     //   adio.pause();
  //     //   matchSoundEffect.play();
  //     //   setTimeout(playBkMusic, 2500);
  //     // } else {
  //     //   matchSoundEffect.play();
  //     // }
  //     // flipNumbersP1++;
  //     // scoreP1 = flipNumbersP1 * initValue;
  //     // console.log("Correct Numbers Player 1= ", flipNumbersP1);
  //     // console.log("Score During the Game P1= ", scoreP1);
  //   } else {
  //     unflipCards();
  //   }
  //   // isMatch ?  disableCards() :  unflipCards();
  //   checkIfWon();
  // }

  function checkForMatchP1(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
      disableCards();
      // if (checkBox.checked == true) {
      //   adio.pause();
      //   matchSoundEffect.play();
      //   setTimeout(playBkMusic, 2500);
      // } else {
      //   matchSoundEffect.play();
      // }
      flipNumbersP1++;

    /**********************************************************************************************************************/

    scoreP1 = flipNumbersP1 * initValue;
    for(let i=0;i<ArrOfAddedData.length;i++)
    {
      if( ArrOfAddedData[i].text == PlayerOne && ArrOfAddedData[i].score <=scoreP1 )
      {
        ArrOfAddedData[i].score=scoreP1; 
        console.log(PlayerOne);
      }
      localStorage.setItem(ArrOfAddedData[i].id,JSON.stringify([ArrOfAddedData[i].text, ArrOfAddedData[i].score]));
    }

    /**********************************************************************************************************************/
      console.log("Correct Numbers Player 1= ", flipNumbersP1);
      console.log("Score During the Game P1= ", scoreP1);
    } else {
      unflipCards();
    }
    // isMatch ?  disableCards() :  unflipCards();
    checkIfWon();
  }
  
  function checkForMatchP2(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
      disableCards();
      // if (checkBox.checked == true) {
      //   adio.pause();
      //   matchSoundEffect.play();
      //   setTimeout(playBkMusic, 2500);
      // } else {
      //   matchSoundEffect.play();
      // }
      flipNumbersP2++;
    /*************************************************************************************************************************/
    scoreP2 = flipNumbersP2 * initValue;
    for(let i=0;i<ArrOfAddedData.length;i++)
    {
      if( ArrOfAddedData[i].text == PlayerTwo && ArrOfAddedData[i].score <=scoreP2 )
      {
        ArrOfAddedData[i].score=scoreP2; 
        console.log(PlayerTwo);
      }
      localStorage.setItem(ArrOfAddedData[i].id,JSON.stringify([ArrOfAddedData[i].text, ArrOfAddedData[i].score]));
    }
  /***************************************************************************************************************************/
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
       console.log("Player 1 won the game");
         // player2_frame.style.borderStyle = "none";
      won.textContent = "Player 1 won";
       document.getElementById("won").style.display = "inline";
       console.log("p1 won");
       player1_board.style.borderStyle = "none";
       player1_board.style.removeProperty("animation");
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
        }
        else {
          winningSoundEffect.play();
        }
    }
   }
   return wonFlag;
 }

 function updateCountdown(){
  let cards_2 = document.querySelectorAll("#player2_board .memory-card")
  let cards_1 = document.querySelectorAll("#player1_board .memory-card")
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
        won.textContent = "Player 1won!!";
        document.getElementById("won").style.display = "inline";
        console.log("p1 won");
      }
      else if(scoreP1 == scoreP2){
        console.log("tie");
        document.getElementById("lost").style.display = "inline";
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