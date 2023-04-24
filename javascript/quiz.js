class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionCounter = 0;
    this.avaibleQuestions = [];
    this.progressTrack;
    this.userAnswer;
    this.currentQuestion;
  }

  setAvaibleQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      this.avaibleQuestions.push(this.questions[i]);
    }
  }

  getNewQuestion() {
  this.questionCounter++;
  this.setAvaibleQuestions();
  const randomIndex = Math.floor(Math.random() * this.avaibleQuestions.length);
  this.currentQuestion = this.avaibleQuestions[randomIndex];
  this.avaibleQuestions.splice(randomIndex, 1);
  return this.currentQuestion;
  }


  }

// shuffleQuestions() {
//   for (let i = this.questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = this.questions[i];
//     this.questions[i] = this.questions[j];
//     this.questions[j] = temp;
//   }
// }

// getCurrentQuestion() {
//   this.shuffleQuestions();
//   return this.questions[this.currentQuestionIndex];
// }
  

  // getCurrentQuestion() {
  //   return this.shuffledQuestionsArray[this.currentQuestionIndex];
  // }

  // getNextQuestion() {
  //   this.currentQuestionIndex++;
  //   return this.getCurrentQuestion();
  // }

  // checkAnswer(answer) {
  //   const currentQuestion = this.getCurrentQuestion();
  //   if (answer === currentQuestion.answer) {
  //     this.score++;
  //     return true;
  //   }
  //   return false;
  // }

  // isGameOver() {
  //   return this.currentQuestionIndex >= this.questions.length;
  // }

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  updateScore(score) {
    this.score += score;
  }
}

const quiz = new Quiz(questionsBank);
const player = new Player('Player 1');

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



window.addEventListener('load', (event) => {
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    body.style.backgroundImage = 'url(pikachu.jpg)';
    quizGame.style.display = 'block';
  });

  displayQuestion();


  // const btnNext = document.querySelector('#btn-next');
  btnNext.addEventListener('click', nextQuestion);


})


function displayQuestion() {
  questionNumber.textContent = `Question ${quiz.questionCounter + 1} of 10`;
  quiz.progressTrack = document.querySelector(`#number${quiz.questionCounter + 1}`);
  quiz.progressTrack.style.backgroundColor = '#fad61d';

  const questionCurrent = quiz.getNewQuestion();
  questionContent.textContent = questionCurrent.question;

option1.innerHTML = questionCurrent.option1;
option2.innerHTML = questionCurrent.option2;
option3.innerHTML = questionCurrent.option3;
option4.innerHTML = questionCurrent.option4;

}

function nextQuestion() {
  if (quiz.questionCounter === 9) {
    btnNext.textContent = 'Check the score!';
  } else if (btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
    alert('Please select an option')
    return;
  }

  if (quiz.questionCounter > 9) {
    displayResultBox();
    return;
  }

  if (quiz.userAnswer === quiz.currentQuestion.answer) {
    quiz.score++;
    quiz.progressTrack.style.backgroundColor = '#5F8D4E';
    displayQuestion();
  } else {
    quiz.progressTrack.style.backgroundColor = '#F62D14';
    displayQuestion();
  }


  // displayQuestion();
}


function displayResultBox() {
  quizQuestions.style.display = 'none';
  resultBox.style.display = 'block';
  questionNumber.textContent = 'Anime Quiz is completed';

  setFinalScore();
}

function setFinalScore() {
  if (quiz.score > 7) {
    resultContent.innerHTML = `Wow! You are a real anime nerd! <br> Your score is ${quiz.score}!`
  } else if (quiz.score >= 5 && quiz.score <= 7) {
    resultContent.innerHTML = `Not bad at all!!! <br> Your score is ${quiz.score}!`;
  } else if (quiz.score >= 3 && quiz.score < 5) {
    resultContent.innerHTML = `Maybe you need to watch more anime... <br> Your score is ${quiz.score}!`;
  } else {
    resultContent.innerHTML = `Have you ever watched anime at all?!?! <br> Your score is ${quiz.score}!`;
  }
}

// function changeTheNumberColor() {
//   questionNumber.textContent = `Question ${quiz.questionCounter + 1} of 10`;
//   progressTrack = document.querySelector(`#number${questionCounter + 1}`);
//   progressTrack.style.backgroundColor = '#fad61d';
// }










// function displayQuestion() {
//   if (quiz.isGameOver()) {
//     showScore();
//   } else {
//     const questionContent = document.querySelector('#question-text');
//     questionContent.innerHTML = quiz.getCurrentQuestion().question;

// const option1 = document.querySelector('#option1');
// const option2 = document.querySelector('#option2');
// const option3 = document.querySelector('#option3');
// const option4 = document.querySelector('#option4');

// option1.innerHTML = quiz.getCurrentQuestion().option1;
// option2.innerHTML = quiz.getCurrentQuestion().option2;
// option3.innerHTML = quiz.getCurrentQuestion().option3;
// option4.innerHTML = quiz.getCurrentQuestion().option4;
//   }
//   showProgress();
// }



// Shows the number of the question in the footer ---> call it inside of displayQuestion
// function showProgress() {
//   const currentQuestionNumber = quiz.currentQuestionIndex + 1;
//   const questionNumber = document.querySelector('#number-question');
//   questionNumber.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
// }








