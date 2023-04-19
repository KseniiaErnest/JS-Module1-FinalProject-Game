'use strict'
//--Accessing the HTML elements that will be manupilated later
const body = document.querySelector('body');
const startScreen = document.querySelector('.start-container');
const startButton = document.querySelector('.btn');
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

const time = document.querySelector('#time');
// To change timer to 00:00 when the result box is diplayed;

const resultContent = document.querySelector('#result');
// Once the game quiz is over the result content needed to be displayed;
const btnPlayAgain = document.querySelector('#play-again-btn');
// // To be able to play again once button clicked;

let index = 0;
let timer = 0;
let interval = 0;

// total score
let correct = 0;

// store answer value
let userAnswer = undefined;

// When start button of the Start screen clicked, change to the Game screen + background
startButton.addEventListener('click', () => {
  startScreen.style.display = 'none';
  body.style.backgroundImage = 'url(pikachu.jpg)';
  quizGame.style.display = 'block';

});


function loadQuestions(index) {
  questionContent.textContent = questionsBank[index].question;
  option1.textContent = questionsBank[index].option1;
  option2.textContent = questionsBank[index].option2;
  option3.textContent = questionsBank[index].option3;
  option4.textContent = questionsBank[index].option4;
}

// function generateRandomQuestions() {
//   const randomNumber = Math.floor(Math.random() * questionsBank.length);

//   let duplicateCount = 0;

//   if (arrOfQuestions.length === 0) {
//     questionIndex = randomNumber;
//   } else {
//     for (let i = 0; i < arrOfQuestions.length; i++) {
//       if (randomNumber === arrOfQuestions[i]) {
//         duplicateCount = 1;
//       }
//     }
//     if (duplicateCount === 1) {
//       generateRandomQuestions();
//       return;
//     } else {
//       questionIndex = randomNumber;
//     }
//   }
//   arrOfQuestions.push(randomNumber);
//   return randomNumber;
// }

// loadQuestions();

// loadQuestions();

// function generateRandomQ () {

//   for (let i = 0; i < questionsBank.length; i++) {
//     let randomNum = Math.floor(Math.random() * questionsBank.length);

//     if (arrOfQuestions.indexOf(randomNum) === -1) {
//       arrOfQuestions.push(randomNum);
//     } else {
//       i--
//     }
//   }
//   return arrOfQuestions;
// }