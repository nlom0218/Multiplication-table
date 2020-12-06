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
const $setting = document.querySelector("#js-setting");
const $timerSetting = document.querySelector("#js-timerSetting");
const $timerSettingArea = document.querySelector("#js-timerSettingArea");
const $difficultyForm = document.querySelector("#js-difficultyForom");
const $difficultyList = document.querySelector("#js-difficultyList");
const $difficultyTitle = document.querySelector(".difficultySetting_title");
const $difficultySettingArea = document.querySelector(
  "#js-difficultySettingArea"
);
const $resultTable = document.querySelector("#js-resultTable");
const $resultStar = document.querySelector("#js-resultStar");
const $resultComment = document.querySelector("#js-resultComment");

let num1;
let num2 = Math.ceil(Math.random() * 8) + 1;
let curDifficulty = "all";

// difficulty setting
difficultySetting = (curDifficulty) => {
  if (curDifficulty === "all") {
    num1 = Math.ceil(Math.random() * 8) + 1;
  } else {
    num1 = Number(curDifficulty);
  }
};

handleClickDifficultyList = (e) => {
  curDifficulty = e.target.value;
  difficultySetting(curDifficulty);
};

handleClickDifTitle = () => {
  if ($difficultySettingArea.classList.contains("hiding")) {
    $difficultySettingArea.classList.remove("hiding");
  } else {
    $difficultySettingArea.classList.add("hiding");
  }
};
//

// timer setting
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

// settedTime을 활용하여 결과표 만들기
paintResultTable = () => {
  $resultTable.classList.remove("hiding");
  const answerNum = correctAnswerNum.length;
  if (answerNum > (Number(settedTime) / 5) * 4) {
    $resultStar.innerText = `⭐⭐⭐⭐⭐`;
    $resultComment.innerText = `당신은 구구단의 고수가 틀림없어요`;
  } else if (answerNum > (Number(settedTime) / 5) * 3) {
    $resultStar.innerText = `⭐⭐⭐⭐`;
    $resultComment.innerText = `당당하게 "나 구구단 잘해!"라고 할 수 있는 실력이에요`;
  } else if (answerNum > (Number(settedTime) / 5) * 2) {
    $resultStar.innerText = `⭐⭐⭐`;
    $resultComment.innerText = `당신은 평벙한 수준의 구구단 실력을 가지고 있네요`;
  } else if (answerNum > (Number(settedTime) / 5) * 1) {
    $resultStar.innerText = `⭐⭐`;
    $resultComment.innerText = `조금만 더 구구단의 실력을 키울 필요가 있어요`;
  } else {
    $resultStar.innerText = `⭐`;
    $resultComment.innerText = `구구단을 잘하기 위해 많은 노력이 필요해요`;
  }
};

//

// 구구단 기본 설정
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
  correctAnswerNum = [];
};

handleSubmitAnswer = (e) => {
  e.preventDefault();
  const answer = $inputAnswer.value;
  $inputAnswer.value = "";
  if (Number(answer) === num1 * num2) {
    $result.innerText = "정답입니다!";
    correctAnswerNum.push(answer);
    difficultySetting(curDifficulty);
    num2 = Math.ceil(Math.random() * 8) + 1;
    paintQuestion();
  } else {
    $result.innerText = "다시 풀어보세요!";
  }
};

startGame = () => {
  difficultySetting(curDifficulty);
  paintQuestion();
  let time = settedTime - 1;
  const timer = setInterval(() => {
    $timer.innerText = `남은시간: ${time}초`;
    if (time-- === 0) {
      clearInterval(timer);
      paintResultTable();
      paintSocre();
      $setting.classList.remove("hiding");
      $timerSettingArea.classList.add("hiding");
      $difficultySettingArea.classList.add("hiding");
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
  $setting.classList.add("hiding");
  intro();
};

handleClickResetBtn = () => {
  $question.innerText = "5";
  $result.innerText = "";
  $inputAnswer.value = "";
  $setting.classList.add("hiding");
  $resultTable.classList.add("hiding");
  $timer.innerText = `남은시간: ${$timerRange.value}초`;
  intro();
};

function init() {
  $startBtn.addEventListener("click", handleClickStartBtn);
  $answer.addEventListener("submit", handleSubmitAnswer);
  $resetBtn.addEventListener("click", handleClickResetBtn);
  $timerRange.addEventListener("mouseup", handleMousemoveTimerRange);
  $timerSetting.addEventListener("click", handleClickTimerSetting);
  $difficultyList.addEventListener("click", handleClickDifficultyList);
  $difficultyTitle.addEventListener("click", handleClickDifTitle);
}
init();
