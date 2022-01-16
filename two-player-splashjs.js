//*************Moving Through Menus*********************
let startdiv = document.getElementsByClassName("start")[0];
let logodiv = document.getElementById("gamelogo");
let splashmenu = document.getElementsByClassName("splash-menu")[0];
let selectlevelmenu = document.getElementsByClassName("LevelsOf_Game-menu")[0];
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
var buttons = document.querySelectorAll(".LevelStages");


//sound
let sound_1 = document.getElementById("soundEffectbtn");
let matchSoundEffect = document.getElementById("matchCard");
let winningSoundEffect = document.getElementById("winningSound");
let losingSoundeffect = document.getElementById("losingSound");

// Theme Effect
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
    document.body.style.backgroundColor = "#fff8dc";
    for (var i = 0; i < backCard.length; i++) {
      backCard[i].style.backgroundColor = "#FFFFFF";
      frontCard[i].style.backgroundColor = "#FFFFFF";
    }
  }
}


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

  startGameMenu.addEventListener("click", function () {
    splashmenu.style.display = "none";
    selectlevelmenu.style.display = "inline-block";
    sound_1.play();
  });
  buttons[0].addEventListener("click", () => {
      selectlevelmenu.style.display = "none";
      catchStart.style.display="inline-block";
      sound_1.play();
    });
  scoreMenu.addEventListener("click", function () {
    splashmenu.style.display = "none";
    catchScore.style.display = "inline-block";
    sound_1.play();
  });
  howtoplayMenu.addEventListener("click", function () {
    splashmenu.style.display = "none";
    catchHowToPlay.style.display = "inline-block";
    sound_1.play();
  });
  settingsMenu.addEventListener("click", function () {
    splashmenu.style.display = "none";
    catchSettings.style.display = "inline-block";
    sound_1.play();
  });
  backButtons.forEach((element) => {
    element.addEventListener("click", () => {
      element.parentElement.style.display = "none";
      splashmenu.style.display = "inline-block";
      sound_1.play();
    });
  });
  
  // Start the Game (Display the splash screen)
  start.addEventListener("click", () => {
    allSplash.style.display = "none";
  });
  


  
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
const box = document.querySelector('.button');
box.addEventListener('click', (e)=>{
  e.target.classList.toggle('paused');
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
