'use strict'
//--Accessing the HTML elements that will be manupilated later
const body = document.querySelector('body');
const startScreen = document.querySelector('.start-container');
const startButton = document.querySelector('.btn');
const quizQuestions = document.querySelector('#quiz-questions'); 
const quizGame = document.querySelector('#quiz-game');
const resultBox = document.querySelector('#result-box');

const questionContent = document.querySelector('#question-text')
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

const btnNext = document.querySelector('#btn-next');
// To be able to change question once button clicked;

const questionNumber = document.querySelector('#number-question');
// To dynamically change question numbers and didplay them;

const time = document.querySelector('#time');
// To change timer to 00:00 when the result box is diplayed;

const resultContent = document.querySelector('#result');
// Once the game quiz is over the result content needed to be displayed;
const saveScore = document.querySelector('#save-score');
// // To be able to play again once button clicked;
const btnHome = document.querySelector('#home-btn');

const userName = document.querySelector('#name-input');




let questionCounter = 0;
let currentQuestion;
let avaibleQuestions = [];
let score = 0;
let userAnswer;
let progressTrack;


// --- We push questions from _questionsBank_ into _avaibleQuestions_ array
function setAvaibleQuestions() {
// const totalQuestions = questionsBank.length;
for (let i = 0; i < questionsBank.length; i++) {
  avaibleQuestions.push(questionsBank[i]);
}
}

// --- Set question number and question options
function getNewQuestion() {
  // Set question number
  // questionNumber.textContent = `Question ${questionCounter + 1} of 10`;
  changeTheNumberColor();

  
  // Get random question
  const questionIndex = avaibleQuestions[Math.floor(Math.random() * avaibleQuestions.length)];
  currentQuestion = questionIndex;
  // Set question text
  questionContent.textContent = currentQuestion.question;
  
  // Set options text
  option1.textContent = currentQuestion.option1;
  option2.textContent = currentQuestion.option2;
  option3.textContent = currentQuestion.option3;
  option4.textContent = currentQuestion.option4;

  // Get the position of _questionIndex_ from the _avaibleQuestions_ array
  const index1 = avaibleQuestions.indexOf(questionIndex);
  // Remove _questionIndex_ from _avaibleQuestions_ array, so that the question does not repeat
  avaibleQuestions.splice(index1, 1);


  questionCounter++;
}

// --- To display the next question
function nextQuestion() {
  if (questionCounter === 9) {
    btnNext.textContent = 'Check the score!'
  } else if (btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
    alert('Please select an option')
    return;
  }

  if (questionCounter > 9) {
    if (userAnswer === currentQuestion.answer) {
      setCorrect();
    } else {
      setWrong();
    }
    displayResultBox();
    return
  }


  if (userAnswer === currentQuestion.answer) {
    setCorrect();
    getNewQuestion();
  } else {
    setWrong();
    getNewQuestion();
  }

  tunrColorsToDeafault();
}

// --- Set final score 
function setFinalScore() {
  if (score > 7) {
    resultContent.innerHTML = `Wow! You are a real anime nerd! <br> Your score is ${score}!`
  } else if (score >= 5 && score <= 7) {
    resultContent.innerHTML = `Not bad at all!!! <br> Your score is ${score}!`;
  } else if (score >= 3 && score < 5) {
    resultContent.innerHTML = `Maybe you need to watch more anime... <br> Your score is ${score}!`;
  } else {
    resultContent.innerHTML = `Have you ever watched anime at all?!?! <br> Your score is ${score}!`;
  }
}

// --- Dispaly final score screen (change screens)
function displayResultBox() {
  quizQuestions.style.display = 'none';
  resultBox.style.display = 'block';
  questionNumber.textContent = 'Anime Quiz is completed';

  setFinalScore();
}

// --- To get e result of the current attempt question
function getResult(e) {
const parentEl = e.target.parentElement;
parentEl.style.backgroundColor = '#fad61d';

if (e.target.id === 'option1') {
  btn2.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
} else if (e.target.id === 'option2') {
  btn1.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
} else if (e.target.id === 'option3') {
  btn1.style.backgroundColor = '#fdefa5';
  btn2.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
} else if (e.target.id === 'option4') {
  btn1.style.backgroundColor = '#fdefa5';
  btn2.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
}

// Set players answer based on the selected option
userAnswer = Number(e.target.id.replace('option', ''));
}

// --- To set color options to default --- call in _newQuestion()_ function
function tunrColorsToDeafault() {
  btn1.style.backgroundColor = '#fdefa5';
  btn2.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
}

// --- To set the number of the question in the footer + color current question
function changeTheNumberColor() {
  questionNumber.textContent = `Question ${questionCounter + 1} of 10`;
  progressTrack = document.querySelector(`#number${questionCounter + 1}`);
  progressTrack.style.backgroundColor = '#fad61d';
}

// ----- To get points and set color of the progresstrack when the answer is correct
function setCorrect() {
  score++;
  progressTrack.style.backgroundColor = '#5F8D4E';
}
// ----- To set a color of the progresstrack when the answer is wrong
function setWrong() {
  progressTrack.style.backgroundColor = '#F62D14';
}

function goHomeMenu() {
  window.location.reload();
}
// ----------------------------------------------------------------
window.onload = function() {
  // _Lets Start_ button is clicked, change to the _game quiz_ screen
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    body.style.backgroundImage = 'url(pikachu.jpg)';
    quizGame.style.display = 'block';
  });

  btnHome.addEventListener('click', () => {
    quizGame.style.display = 'none';
    resultBox.style.display = 'none';
    body.style.backgroundImage = 'url(doraemon.jpg)';
    startScreen.style.display = 'flex';
    goHomeMenu();
  });

  // To make work _next question_ button
  btnNext.addEventListener('click', nextQuestion);

  //
  option1.addEventListener('click', getResult);
  option2.addEventListener('click', getResult);
  option3.addEventListener('click', getResult);
  option4.addEventListener('click', getResult);

  // 1. We set all questions in _avaibleQuestions_ array 
  setAvaibleQuestions();
//  2. We call _getNewQuestion()_ function to display questions and options
  getNewQuestion();
}
