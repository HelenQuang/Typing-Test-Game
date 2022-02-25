const difficultyEl = document.getElementById("difficulty");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");

const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

const endGameContainer = document.getElementById("end-game-container");

let time = 60;
let score = 0;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

difficultyEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//Fetch random word from API
async function getWord() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1`
  );
  const data = await res.json();
  return data;
}

//Display random word to DOM
function displayWord() {
  wordEl.innerText = `${randomWord}`;
}

//Update score
function updateScore() {
  scoreEl.innerHTML = score++;
}

//Update time
const timeInterval = setInterval(updateTime, 1000);
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameEnd();
  }
}

//Game end
function gameEnd() {
  endGameContainer.innerHTML = `
    <h1>Your time ran out!</h1>
    <p>Your final score is: ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endGameContainer.style.display = "flex";
}

//Game play
async function gamePlay() {
  textEl.focus();

  const fetchedWord = await getWord();
  randomWord = fetchedWord[0];
  displayWord();

  let score = 0;
  updateScore();

  let time = 60;
  updateTime();
}
gamePlay();

//Add event listener
textEl.addEventListener("input", (e) => {
  const inputText = e.target.value;

  if (inputText === randomWord) {
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }

    gamePlay();
  }
});

settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
