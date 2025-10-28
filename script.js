// звук
const dogBark = document.getElementById("dogBark");
const duckFalls = document.getElementById("duckFalls");
const duckQuack = document.getElementById("duckQuack");
const gunShot = document.getElementById("gunShot");
const title = document.getElementById("title");
// элементы на разметке
const gameArea = document.getElementById("game-area");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const counter = document.querySelector(".counter");
const score = document.getElementById("hit-counter");
score.textContent = 0;

// переменые для времени
const START_TIME = 30;
let time = START_TIME;

let gameInterval;
let gameTimer;

const timer_span = document.querySelector(".timer span");
timer_span.textContent = time;

const dogWalk = document.createElement("img");
dogWalk.src = "images/dogWalk.gif";
dogWalk.classList.add("dog");

const hunting_dog = document.createElement("img");
hunting_dog.src = "images/hunting_dog.gif";
hunting_dog.classList.add("hunting_dog");

const miss_dog = document.createElement("img");
miss_dog.src = "images/missDog.gif";
miss_dog.classList.add("miss_dog");

const littleDuck = document.createElement("img");
littleDuck.src = "images/littleDuck.png";
littleDuck.classList.add("littleDuck");

const duck = document.createElement("img");
duck.src = "images/duck.webp";
duck.classList.add("duck");

// вычисляем размеры элемента где стреляю по уткам
const areaWidth = gameArea.clientWidth;
const areaHeight = gameArea.clientHeight;

// Старт
startBtn.onclick = function () {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  // очистка перед стартом для последующих стратов
  clearInterval(gameInterval);
  clearInterval(gameTimer);

  time = START_TIME; // сбрасываем на начальное значение
  timer_span.textContent = time;

  // добавляем собаку и звук 
  gameArea.appendChild(dogWalk);
  dogBark.currentTime = 0;
  dogBark.play();
  title.play();

  setTimeout(() => {
    dogWalk.style.left = "50%";
  }, 100);

  setTimeout(() => {
    dogWalk.remove();
    dogBark.pause();
    startGame();
  }, 3500);
};

function startGame() {
  //  интервал появления уткки при нажатии на старст
  gameInterval = setInterval(spawnDuck, 2000);

  // таймер
  gameTimer = setInterval(() => {
    time--;
    timer_span.textContent = time;

    if (time <= 0) {
      clearInterval(gameInterval);
      clearInterval(gameTimer);
      alert("Игра окончена!");
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }, 1000);
}

function spawnDuck() {
  const newDuck = duck.cloneNode(true);
  const randomX = Math.random() * (areaWidth - 100);
  const randomY = Math.random() * (areaHeight - 100);

  newDuck.style.left = `${randomX}px`;
  newDuck.style.top = `${randomY}px`;

  gameArea.appendChild(newDuck);
  duckQuack.play();

  newDuck.onclick = function (event) {
    event.stopPropagation();

    gunShot.currentTime = 0;
    gunShot.play();
    score.textContent++;
    const hitDuck = littleDuck.cloneNode(true);
    counter.appendChild(hitDuck);

    gameArea.appendChild(hunting_dog);
    setTimeout(() => {
      newDuck.remove();
      hunting_dog.remove();
    }, 1500);
  };

  setTimeout(() => {
    if (gameArea.contains(newDuck)) newDuck.remove();
  }, 2000);
}

gameArea.onclick = () => {
  gunShot.currentTime = 0;
  gunShot.play();
  gameArea.appendChild(miss_dog);
  setTimeout(() => miss_dog.remove(), 1500);
};

stopBtn.onclick = function () {
  clearInterval(gameInterval);
  clearInterval(gameTimer);

  time = START_TIME;
  timer_span.textContent = time;
  score.textContent = 0;
  gameArea.innerHTML = "";

  const miniDucks = counter.querySelectorAll(".littleDuck");
  miniDucks.forEach(duck => duck.remove());

  startBtn.disabled = false;
  stopBtn.disabled = true;

  [dogBark, duckFalls, duckQuack, gunShot, title].forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
};
