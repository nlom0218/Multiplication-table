const $startBtn = document.querySelector("#js-startBtn");
const $question = document.querySelector("#js-question");
const $answer = document.querySelector("#js-answer");
const $inputAnswer = document.querySelector("#js-inputAnswer");
const $result = document.querySelector("#js-result");
const $timer = document.querySelector("#js-timer");
const $score = document.querySelector("#js-score");
const $resetBtn = document.querySelector("#js-resetBtn");
const $timerRange = document.querySelector("#js-timerRange");
const $settedTime = document.querySelector("#js-settedTime");
const $timerSetting = document.querySelector("#js-timerSetting");
const $timerSettingArea = document.querySelector("#js-timerSettingArea");

// setting
let settedTime = 60;

showAndHideTimerSet = () => {
  if ($timerSettingArea.classList.contains("hiding")) {
    $timerSettingArea.classList.remove("hiding");
  } else {
    $timerSettingArea.classList.add("hiding");
  }
};

hideTimerSet = () => {
  $timerSettingArea.classList.add("hiding");
};

handleClickTimerSetting = (e) => {
  if (e.target.dataset.id === "timerTitle") {
    showAndHideTimerSet();
  }
  if (e.target.dataset.id === "timerBtn") {
    hideTimerSet();
  }
};

handleMousemoveTimerRange = () => {
  $settedTime.innerText = `현재 설정된 제한시간: ${$timerRange.value}초`;
  $timer.innerText = `남은시간: ${$timerRange.value}초`;
  settedTime = $timerRange.value;
};
//

// 구구단 기본 설정
let num1 = Math.ceil(Math.random() * 10);
let num2 = Math.ceil(Math.random() * 10);

let correctAnswerNum = [];

paintQuestion = () => {
  $question.innerText = `${num1} 곱하기 ${num2}`;
};

paintSocre = () => {
  $question.classList.add("hiding");
  $answer.classList.add("hiding");
  $result.classList.add("hiding");
  $timer.classList.add("hiding");
  $score.classList.remove("hiding");
  $resetBtn.classList.remove("hiding");
  $score.innerText = `${correctAnswerNum.length}개 맞췄습니다!`;
};

handleSubmitAnswer = (e) => {
  e.preventDefault();
  const answer = $inputAnswer.value;
  $inputAnswer.value = "";
  if (Number(answer) === num1 * num2) {
    $result.innerText = "정답입니다!";
    correctAnswerNum.push(answer);
    num1 = Math.ceil(Math.random() * 10);
    num2 = Math.ceil(Math.random() * 10);
    paintQuestion();
  } else {
    $result.innerText = "다시 풀어보세요!";
  }
};

startGame = () => {
  paintQuestion();
  let time = settedTime - 1;
  const timer = setInterval(() => {
    $timer.innerText = `남은시간: ${time}초`;
    if (time-- === 0) {
      clearInterval(timer);
      paintSocre();
      $timerSetting.classList.remove("hiding");
      $timerSettingArea.classList.add("hiding");
    }
  }, 1000);
};

intro = () => {
  $startBtn.classList.add("hiding");
  $question.classList.remove("hiding");
  $result.classList.remove("hiding");
  $answer.classList.remove("hiding");
  $timer.classList.remove("hiding");
  $score.classList.add("hiding");
  $resetBtn.classList.add("hiding");
  let num = 4;
  const countDown = setInterval(() => {
    $question.innerText = num;
    if (num-- === 0) {
      clearInterval(countDown);
      startGame();
    }
  }, 1000);
};

handleClickStartBtn = () => {
  $timerSetting.classList.add("hiding");
  intro();
};

handleClickResetBtn = () => {
  $question.innerText = "5";
  $result.innerText = "";
  $inputAnswer.value = "";
  $timerSetting.classList.add("hiding");
  intro();
};

function init() {
  $startBtn.addEventListener("click", handleClickStartBtn);
  $answer.addEventListener("submit", handleSubmitAnswer);
  $resetBtn.addEventListener("click", handleClickResetBtn);
  $timerRange.addEventListener("mousemove", handleMousemoveTimerRange);
  $timerSetting.addEventListener("click", handleClickTimerSetting);
}
init();
