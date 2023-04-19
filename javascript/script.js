'use strict'
//------ 1. Setting and initializing variables:

const questionCount = 0; 
// As we have number of questions, indicationg that there are 10 questions needed to be displayed;

const score = 0;
// Start from 0 as a player have not scored anything yet, but as a player progress _score_ will be incremented, and in the end of the game final _score_ will be displayed;

let answer;
// It will hold the answer key that we can compare with the option that a player selected; compare if the answer is correct and display via tracker + change the _score_ if the answer correct;

const timeIsUp = 0;
// If the timer has run out and we do not stop it, it will go -1, -2, -3 etc, that is why we need timeout function to indicate that time is over. And once its 0, the game moves to the next question.

let randomQuestion;
// It will generate a random number to load a random question from _questions.js_. Every time we have a new question, we want to have a random question, not them to be in the order that they are in the array;

const record = [];
// It will keep all the random index numbers that were generated so there are no same questions. It will compare if we already have the question. If newly generated random number (index) is already in the array record, then we will ask to generate a new number (question);

const statusOfRandNum = 0;
// It will be used together/while with random question number. If the random numbers is already in the record, then the status = 0, and the new number is needed to be generated. But once a new random number generated and its not in the record array, the status changes to 1, and the loop stops as we do not need the new number. Until the random number is not accepted the status = 0, once it accepted status = 1;

let progressTrack;
// In order to change colors (depending on the answer) of the progress tracker bar, we need to get question number, for example, if we have question 1 then progress tracker 1 shoud have some color. Every time we get a new progress tracker it is going to be placed in that variable (it hold the current progress tracker);

let countDown;
// it will have a timer function that will be called every time a new question is loaded, and it will be used to stop a timer function;

const secondsInput = 10;

const seconds = secondsInput;
// secondsInput will be reducing to 0 (and it will go on negative) but we also need an original value once a new question is displayed;

let timer;
// It will hold a timer element that we display in out footer part. Every time _countDown_ creates a new timer it will be loaded in timer variable. 



//--Accessing the HTML elements that will be manupilated later

const quizQuestions = document.querySelector('#quiz-questions'); 
const quizGame = document.querySelector('#quiz-game');
const resultBox = document.querySelector('#result-box');

const questionContent = document.querySelector('#question')
// So we can dynamically change questions content;

const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
// To dynamically change answer options content;

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
// When we choose the option, this option will have the color, and if a palyer changes their answer option, color changes 

const btn = document.querySelector('#btn-next');
// To be able to change question once button clicked;

const questionNumber = document.querySelector('#number-question');
// To dynamically change question numbers and didplay them;

const timerD = document.querySelector('#timer');
// To change timer to 00:00 when the result box is diplayed;

const resultContent = document.querySelector('#result');
// Once the game quiz is over the result content needed to be displayed;
const btnPlayAgain = document.querySelector('#play-again-btn');
// // To be able to play again once button clicked;



// ----- 2. Load current question to the app:
// Before we can do it we need a function that will set a question and options, a function that will set options to defaul color when a player moves to the next question, a function that changes a question number display:

// 1. Function that sets a question and options
function setQuestion(qCount, randNum) {
  const questionObj = questionsBank[randNum];
  questionContent.textContent = (qCount + 1) + `. ${questionObj.question}`;

  option1.textContent = `${questionObj.option1}`;
  option2.textContent = `${questionObj.option2}`;
  option3.textContent = `${questionObj.option3}`;
  option4.textContent = `${questionObj.option4}`;
}

// 2. Function that changes the progress bar numbers 

function changeTheNumberQuestionBar(qCount) {
  questionNumber.textContent = `Question ${qCount + 1} of 10`;
  progressTrack = document.querySelector(`#number${qCount + 1}`);
  progressTrack.style.backgroundColor = '#fad61d';
}

// 3. Function that will turn our options color to default color;
function tunrColorsToDeafault() {
  btn1.style.backgroundColor = '#fdefa5';
  btn2.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
}

// 4. Function that will load questions and options (via calling the three functions above)
function loadQuestions(qCount, rand) {

if(qCount === 9) {
    btn.textContent = 'Check the score!';
    btn.style.backgroundColor = '#F62D14';
}

if (qCount > 9) {
  return; 
}

setQuestion(qCount, rand);
changeTheNumberQuestionBar(qCount);
tunrColorsToDeafault();

startTimer(seconds, 'timer');

}


// ----- 3. Function for setting tracker, setting result, calculating and dispalying final score

// 1. Function for set a correct answer color + score update

function setCorrectAnswerC() {
  score++;
  progressTrack.style.backgroundColor = '#5F8D4E';
}

// 2. Function for set wrong answer color

function setWrongAnswerC() {
  progressTrack.style.backgroundColor = '#F62D14';
}

// 3. Function to dipslay a final score + the text when we press the button 

function setFinalScore() {
  if (score > 7) {
    resultContent.innerHTML = `Wow! You are a real anime nerd! <br> Your score is ${score}!`
  } else if (score >= 5 && score <=7) {
    resultContent.innerHTML = `Not bad at all!!! <br> Your score is ${score}!`;
  } else if (score >= 3 && score < 5) {
    resultContent.innerHTML = `Maybe you need to watch more anime... <br> Your score is ${score}!`;
  } else {
    resultContent.innerHTML = `Have you ever watched anime at all?!?! <br> Your score is ${score}!`;
  }
}

// 4. Function to display a result page (switch screens)

function displayResultScreen() {
  quizQuestions.style.display = 'none';
  resultBox.style.display = 'block';
  questionNumber.textContent = 'Anime Quiz is completed';
  timerD.textContent = '00:00';
  
  setFinalScore();

}


