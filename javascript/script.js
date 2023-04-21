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
const btnPlayAgain = document.querySelector('#play-again-btn');
// // To be able to play again once button clicked;

let questionCounter = 0;
let currentQuestion;
let avaibleQuestions = [];
let score = 0;
let userAnswer;


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
  questionNumber.textContent = `Question ${questionCounter + 1} of 10`;

  
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
 
  console.log(questionIndex);
  console.log(avaibleQuestions);


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
    displayResultBox();
    return
  }
  getNewQuestion();
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

// Set palyers answer based on the selected option
userAnswer = Number(e.target.id.replace('option', ''));

// Get points if answer is correct
if (userAnswer === currentQuestion.answer) {
  score++;
}

}

// --- To set color options to default --- call in _newQuestion()_ function
function tunrColorsToDeafault() {
  btn1.style.backgroundColor = '#fdefa5';
  btn2.style.backgroundColor = '#fdefa5';
  btn3.style.backgroundColor = '#fdefa5';
  btn4.style.backgroundColor = '#fdefa5';
}

// --- When the last question answered and we clicke

// ----------------------------------------------------------------
window.onload = function() {
  // _Lets Start_ button is clicked, change to the _game quiz_ screen
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    body.style.backgroundImage = 'url(pikachu.jpg)';
    quizGame.style.display = 'block';
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







// When start button of the Start screen clicked, change to the Game screen + background
// startButton.addEventListener('click', () => {
//   startScreen.style.display = 'none';
//   body.style.backgroundImage = 'url(pikachu.jpg)';
//   quizGame.style.display = 'block';

// });

// // Function to load questions
// function loadQuestions(index) {
//   questionContent.textContent = `${index + 1}. ${questionsBank[index].question}`;
//   option1.textContent = questionsBank[index].option1;
//   option2.textContent = questionsBank[index].option2;
//   option3.textContent = questionsBank[index].option3;
//   option4.textContent = questionsBank[index].option4;
// }

// loadQuestions(4);

// // Function when next button is clicked
// btnNext.addEventListener('click', () => {
//   quizGame.style.display = 'block';
//   loadQuestions();

// })














// function getRandomQuestionSet(amountofQuestions) {
//   let qSet = [];

//   while(qSet.length < amountofQuestions.length) {
//     let randomIndex = Math.floor(Math.random() * questionsBank.length);
    
//     if (qSet.indexOf(randomIndex) === -1) {
//       qSet.push(randomIndex);
//     }
//   }
//   return questionsBank.filter( (element, ind) => qSet.indexOf(ind) > -1);
// }


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