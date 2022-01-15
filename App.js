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
let backButtons = document.querySelectorAll(".back-button");
//sound part
let sound_1 = document.getElementById("soundEffectbtn");
let matchSoundEffect = document.getElementById("matchCard");
let winningSoundEffect = document.getElementById("winningSound");
let losingSoundeffect = document.getElementById("losingSound");
let checkSound = document.getElementById("soundbtn");


//score part
const eLevel = 25;
const mLevel = 30;
const hLevel = 50;

let score = 0;
let flipNumbers = 0;
let initValue = 0;

var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");
var buttons = document.querySelectorAll(".LevelStages");
var cards_container = document.querySelector(".memory-game-container");
var front_images = [];
var front_images_hard = [];
var divs = [];
var front_img, back_img;
var card_arr = [];
var checkIfFired = false;
var get_cards;
var hasFlippedCard = false;
var firstCard, secondCard;
var div;
var divs = [];
var lockBoard = false;
var counter = 0;
let StartingMinutes = 0.5;
let time = StartingMinutes * 60; // get time in sec.
let wonFlag = false;
const countEl = document.getElementById("countdown");
const liveScore = document.getElementById("score_");

let value = true;


let inputSection = document.querySelector(".input_playerData input"); // Player Input Element getting His Name
let StartBtn = document.querySelector(".popup_StartButton button"); // Start Button Element
let playerScore = document.querySelector(".listOfScores");
let scoreMainList = document.querySelector(".ListContainer");
let listScoreBtn = document.querySelector(".scoreBottomOk button");

let ArrOfAddedData = [];

startGameMenu.addEventListener("click", function () {
  catchStart.style.display = "inline-block";
  if(checkSound.checked == true)
  {
    sound_1.play();
  }
});
scoreMenu.addEventListener("click", function () {
  catchScore.style.display = "inline-block";
  if(checkSound.checked == true)
  {
    sound_1.play();
  }
});
howtoplayMenu.addEventListener("click", function () {
  catchHowToPlay.style.display = "inline-block";
  if(checkSound.checked == true)
  {
    sound_1.play();
  }
});
settingsMenu.addEventListener("click", function () {
  catchSettings.style.display = "inline-block";
  if(checkSound.checked == true)
  {
    sound_1.play();
  }
});
backButtons.forEach((element) => {
  element.addEventListener("click", () => {
    element.parentElement.style.display = "none";
    if(checkSound.checked == true)
  {
    sound_1.play();
  }
  });
});

// Start the Game (Display the splash screen)
start.addEventListener("click", () => {
  allSplash.style.display = "none";
});

// Background Music Effect
let adio = document.getElementById("myAudio");
let checkBox = document.getElementById("audio_setting");

let playMusic = function () {
  // adio.play();
  if (checkBox.checked == true) {
    adio.play();
  } else if (checkBox.checked == false) {
    adio.pause();
  }
};




//Sound Effect

// Theme Effect
/* in the Setting Part*/
const backCard = document.getElementsByClassName("back-face");
const frontCard = document.getElementsByClassName("front-face");
let theme = document.getElementById("changeTheme");
function Theme() {
  if (theme.checked == true) {
    document.body.style.backgroundImage = "url('./img/darkTheme.png')";
    //  document.body.style.backgroundColor = "#000000";
    for (var i = 0; i < backCard.length; i++) {
      backCard[i].style.backgroundColor = "rgba(20,20,20,0.2)";
      frontCard[i].style.backgroundColor = "rgba(20,20,20,0.9)";
    }
   } else {
    document.body.style.backgroundImage = "url('./img/bg_7_photos_v2_x4.jpg')";
    document.body.style.backgroundColor = "#fff8dc";
    for (var i = 0; i < backCard.length; i++) {
      backCard[i].style.backgroundColor = "#FFFFFF";
      frontCard[i].style.backgroundColor = "#FFFFFF";
    }
  }
}

// =========================== Functions of the Game ============================

function addCards() {
  for (var i = 0; i < 4; i++) {
    div = document.createElement("div");
    div.setAttribute("class", "memory-card");
    cards_container.appendChild(div);
    divs.push(div);
    front_img = document.createElement("img");
    back_img = document.createElement("img");
    front_img.setAttribute("class", "front-face");
    back_img.setAttribute("class", "back-face");
    back_img.setAttribute("src", "img/mushroom.png");
    div.appendChild(front_img);
    div.appendChild(back_img);
    front_images.push(front_img);
    front_images_hard.push(front_img);
  }
  for (var i = 0; i < 2; i++) {
    divs[i].setAttribute("data-framework", "flame");
    front_images[i].setAttribute("src", "img/flame.png");
  }
  for (var i = 2; i < 4; i++) {
    divs[i].setAttribute("data-framework", "plant");
    front_images[i].setAttribute("src", "img/plant.png");
  }
}

function mediumLevel() {
  addCards();
  document.getElementById("game-container").style.top = "50px";
  //document.getElementById("game-container").style.paddingTop = "60px";
}

function hardLevel() {
  addCards();
  addCards();
  let game_count = document.getElementsByClassName("memory-card");
  for (var i = 4; i < 6; i++) {
    divs[i].setAttribute("data-framework", "water");
    front_images[i].setAttribute("src", "img/water.png");
  }
  for (var i = 6; i < 8; i++) {
    divs[i].setAttribute("data-framework", "fall");
    front_images[i].setAttribute("src", "img/fall.png");
  }
  //document.getElementById("game-container").style.paddingTop = "10px";
   document.getElementById("game-container").style.top = "10px";
   document.getElementById("game-container").style.width = "720px";
   for(var i=0; i< game_count.length; i++){
     game_count[i].style.width = "170px";
     game_count[i].style.height = "160px";
   }
}

let timer;
let displayScore;
var cards;
function levels() {
  //cards_container.style.display="flex";
  if (checkIfFired == false) {
    checkIfFired = true;
    score = 0;
    flipNumbers = 0;
    console.log("Score= " + score);
    console.log("flipNumbers= " + flipNumbers);
    initValue = eLevel;
    console.log("Constant= " + initValue);
    if (this.id == hard.id) {
      //when clicking the hard button
      StartingMinutes = 1;
      time = StartingMinutes * 60;
      hardLevel();
      console.log("click event from hard");
      this.removeEventListener("click", levels);
      initValue = hLevel;
      console.log("Constant= " + initValue);
    } else if (this.id == medium.id) {
      //when clicking the medium button
      StartingMinutes = 1;
      time = StartingMinutes * 60;
      mediumLevel();
      console.log("click event from medium");
      this.removeEventListener("click", levels);
      initValue = mLevel;
      console.log("Constant= " + initValue);
    }
    if (checkIfFired == true) {
      console.log("Hello is fired");
      get_cards = document.querySelectorAll(".memory-card");
    }
    timer = setInterval(updateCountdown, 1000);
  }
  //checkIfFired = false;
  cards = get_cards;
}
buttons.forEach((button) => button.addEventListener("click", levels));
function checking() {
  
  if (typeof cards !== "undefined") {
    let get = document.querySelectorAll(".memory-card");
    cards.forEach((card) => card.addEventListener("click", flipCard));

    //shuffle
    cards.forEach((card) => {
      let random = Math.floor(Math.random() * get.length);
      card.style.order = random;
      Theme();
    });
  } else {
    setTimeout(checking, 1000);
  }
}

function flipCard() {
  if (lockBoard) return;
  if(this === firstCard) return;
  this.classList.toggle("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    checkForMatch();
  }
}


function checkForMatch() {
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
    flipNumbers++;
    score = flipNumbers * initValue;
    console.log("Correct Numbers= ", flipNumbers);
    console.log("Score During the Game= ", score);
  } else {
    unflipCards();
  }
  // isMatch ?  disableCards() :  unflipCards();
  checkIfWon();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
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

function playBkMusic(){
  adio.play();
}

function checkIfWon() {
  if (wonFlag == false) {
    let getFlipped = document.querySelectorAll(".flip");
    let getCards = document.querySelectorAll(".memory-card");
    if (getFlipped.length == getCards.length) {
      wonFlag = true;
    
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
  return wonFlag;
}

function updateCountdown() {
  let ifWon = checkIfWon();
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if ((seconds == 0) & (minutes == 0)) {
    countEl.innerHTML = `0:00`;
    clearInterval(timer);
    winningSoundEffect.pause();
    //lost
    document.getElementById("lost").style.display = "inline";
    
    cards.forEach(card => card.removeEventListener("click", flipCard));
    if (checkBox.checked == true) {
      adio.pause();
      losingSoundeffect.play();
      setTimeout(playBkMusic,3600)
    } else {
      losingSoundeffect.play();
    }
  setTimeout(reloadWindow, 12000)
  } else {
    if (ifWon) {
      clearInterval(timer);
      if ((seconds == 1) & (minutes == 0)){
        document.getElementById("won_lastMinute").style.display = "inline";}
      else{
      console.log("you won!!");
      document.getElementById("won").style.display = "inline";}
    }
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if (seconds < 10 && minutes == 0) {
      document.getElementById("countdown").style.color = "firebrick";
    }
    countEl.innerHTML = `${minutes}:${seconds}`;
    liveScore.innerHTML = `Score:  ${score}`;

  }
  --time;
}

checking();
/************************************ Set Player Data in Array ********************************************/
function setPlayerData(playerName) {
  let savedData = {
    id: Date.now(),
    text: playerName,
    score: 380,
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
/*********************************************** When Press Start The Game ****************************/
function StartGameBtn() {
  let repeatedName = 0;

  if (inputSection.value === "") {
    Swal.fire(
      `You Didn't Enter Your Name`,
      "Please Enter Your Name First!",
      "error"
    );
  } else {
    for (let i = 0; i < ArrOfAddedData.length; i++) {
      if (ArrOfAddedData[i].text == inputSection.value) {
        repeatedName = 1;
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
            console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))[1]);
          } else if (result.isDenied) {
            Swal.fire("You Shold Enter New Name", "", "info");
            deleteDataWith(localStorage.key(i));
            localStorage.removeItem(localStorage.key(i))[0];
          }
        });
        break;
      }
    }
    if (!repeatedName) {
      setPlayerData(inputSection.value);
      inputSection.value = "";
      ArrOfAddedData.forEach((savedData) => {
        if (savedData.score == 380) {
          localStorage.setItem(
            savedData.id,
            JSON.stringify([savedData.text, savedData.score])
          );
          console.log(savedData.text);
        }
      });
      // startGameDiv.style.display = "none";
      scoreMainList.style.display = "inline-block";
    }
  }
}
/******************** When Press Ok on The Score list Ok Button it will disappear ******************************************/
function listScoreBtneffect() {
  scoreMainList.style.display = "none";
  // startGameDiv.style.display = "inline-block";
}
/****************************************** Events ************************************************************************/
StartBtn.addEventListener("click", StartGameBtn);

listScoreBtn.addEventListener("click", listScoreBtneffect);


//how to play (slider)

var f;
        var x = 1;
        var cb = function () {
            myFunction(x);
            x++;
            if (x > 5) {
                x = 1;
            }
        }

        var cd = function () {
            myFunction(x);
            x--;
            if (x < 1) {
                x = 4;
            }
        }


        function myFunction(x) {
            var Img1 = document.getElementById("./img/how to play/1.png");




            switch (x) {

                case 1:
                    document.getElementById("image1").src = "./img/how to play/1.png";

                    break;

                case 2:
                    document.getElementById("image1").src = "./img/how to play/2.png";

                    break;

                case 3:
                    document.getElementById("image1").src = "./img/how to play/3.png";

                    break;

                case 4:
                    document.getElementById("image1").src = "./img/how to play/4.png";

                    break;
                case 5:
                    document.getElementById("image1").src = "./img/how to play/5.png";
                    break;


            }
        }

        let myInterval;
        let var14 = 1;
        const box = document.querySelector('.box');
        box.addEventListener('click', (e)=>{
          e.target.classList.toggle('pause');
          var14+=1;
          console.log(var14)
          if(var14%2 == 0){
            myInterval = setInterval(cb, 2200);
            console.log("on")
          }
          else if(var14%2 == 1){
            clearInterval(myInterval);
            console.log("off")
          }
        })
