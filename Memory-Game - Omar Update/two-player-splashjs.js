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
let sound_1 = document.getElementById("soundEffectbtn");
let matchSoundEffect = document.getElementById("matchCard");
let winningSoundEffect = document.getElementById("winningSound");
let losingSoundeffect = document.getElementById("losingSound");
var buttons = document.querySelectorAll(".LevelStages");

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
  