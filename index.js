var rulesButton = document.querySelector("#rulesButton");
var rulesSubContainer = document.querySelector("#rulesSubContainer");
var rulesCloseButton = document.querySelector("#rulesCloseButton");

rulesButton.addEventListener("click", function (event) {
  event.preventDefault();
  rulesSubContainer.style.display = "flex";
});

rulesCloseButton.addEventListener("click", function (event) {
  event.preventDefault();

  rulesSubContainer.style.display = "none";
});

var rockButton = document.querySelector("#gameButtonRock");
var paperButton = document.querySelector("#gameButtonPaper");
var scissorButton = document.querySelector("#gameButtonScissor");
var gamePlayerSide = document.querySelector("#gamePlayerSide");
var gameResultSide = document.querySelector("#gameResultSide");
var gameHomSide = document.querySelector("#gameHomeSide");
var gameBox = document.querySelector("#gameBox");
var gameCommenceBox = document.querySelector("#gameCommenceBox");
var gameResultReplay = document.querySelector("#gameResultReplay");
var isPlaying = false;

rockButton.addEventListener("click", function () {
  switchLayout();
  populateSide("rock", gamePlayerSide);
  var gameResult = theGame("rock");
  populateSide(gameResult.housePick, gameHomeSide);
  updateScore(gameResult.result);
});

paperButton.addEventListener("click", function () {
  switchLayout();
  populateSide("paper", gamePlayerSide);
  var gameResult = theGame("paper");
  populateSide(gameResult.housePick, gameHomeSide);
  updateScore(gameResult.result);
});

scissorButton.addEventListener("click", function () {
  switchLayout();
  populateSide("scissor", gamePlayerSide);
  var gameResult = theGame("scissor");
  populateSide(gameResult.housePick, gameHomeSide);
  updateScore(gameResult.result);
});

gameResultReplay.addEventListener("click", function (event) {
  event.preventDefault();

  switchLayout();
});

function theGame(option) {
  var options = [
    { pick: "rock", beats: "scissor" },
    { pick: "paper", beats: "rock" },
    { pick: "scissor", beats: "paper" },
  ];
  var housePick = housePicks(options);

  if (housePick.pick == option) {
    return { result: "DRAW", housePick: housePick.pick };
  } else if (housePick.beats == option) {
    return { result: "YOU LOSE", housePick: housePick.pick };
  } else {
    return { result: "YOU WIN", housePick: housePick.pick };
  }
}

function housePicks(options) {
  return options[Math.floor(Math.random() * 3)];
}

function switchLayout() {
  if (!isPlaying) {
    gameBox.style.display = "none";
    gameCommenceBox.style.display = "flex";
    isPlaying = true;
  } else {
    gameBox.style.display = "flex";
    gameCommenceBox.style.display = "none";
    isPlaying = false;
  }
}

function populateSide(option, container) {
  var buttonContainer = container.querySelector(".game-button-container");

  switch (option) {
    case "rock":
      buttonContainer.innerHTML = ` <div class="game-button game-button__rock">
              <img
                class="game-button-image"
                src="./images/icon-rock.svg"
                alt=""
              />
            </div>`;
      break;

    case "paper":
      buttonContainer.innerHTML = ` <div class="game-button game-button__paper">
              <img
                class="game-button-image"
                src="./images/icon-paper.svg"
                alt=""
              />
            </div>`;
      break;
    case "scissor":
      buttonContainer.innerHTML = ` <div class="game-button game-button__scissor">
              <img
                class="game-button-image"
                src="./images/icon-scissors.svg"
                alt=""
              />
            </div>`;
      break;
    default:
      break;
  }
}

function updateScore(result) {
  var scoreText = document.querySelector("#scoreText");
  var resultText = document.querySelector("#resultText");

  if (result == "YOU WIN") {
    scoreText.innerHTML = `${parseInt(scoreText.innerHTML) + 1}`;
    resultText.innerHTML = "YOU WIN";
  } else if (result == "YOU LOSE") {
    resultText.innerHTML = "YOU LOSE";
  } else {
    resultText.innerHTML = "DRAW";
  }
}
