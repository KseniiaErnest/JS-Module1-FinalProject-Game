// trying to improve my code from quiz.js
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionCounter = 0;
    this.avaibleQuestions = [...questions];
    this.progressTrack;
    this.userAnswer;
    this.currentQuestion;
  }


  getNewQuestion() {
  this.questionCounter++;
  const randomIndex = Math.floor(Math.random() * this.avaibleQuestions.length);
  this.currentQuestion = this.avaibleQuestions[randomIndex];
  this.avaibleQuestions.splice(randomIndex, 1);
  return this.currentQuestion;
  }


  isQuizOver() {
    return this.questionCounter > 9;
  }


  }


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

  btnNext.addEventListener('click', nextQuestion);

  option1.addEventListener('click', getResult);
  option2.addEventListener('click', getResult);
  option3.addEventListener('click', getResult);
  option4.addEventListener('click', getResult);


})


function displayQuestion() {
  questionNumber.textContent = `Question ${quiz.questionCounter + 1} of 10`;
  quiz.progressTrack = document.querySelector(`#number${quiz.questionCounter + 1}`);
  // quiz.progressTrack.style.backgroundColor = '#fad61d';

  const questionCurrent = quiz.getNewQuestion();
  questionContent.textContent = questionCurrent.question;

option1.innerHTML = questionCurrent.option1;
option2.innerHTML = questionCurrent.option2;
option3.innerHTML = questionCurrent.option3;
option4.innerHTML = questionCurrent.option4;

quiz.progressTrack.style.backgroundColor = '#fad61d';

}

function nextQuestion() {
  if (quiz.isQuizOver()) {
    btnNext.textContent = 'Check the score!';
  } else if (btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
    Swal.fire({
      title: 'Please select an option!',
      width: 600,
      padding: '3em',
      color: '#F62D14',
      background: '#fff',
      backdrop: `
      rgb(250, 214, 29, 0.4)
        url('https://media.tenor.com/5QUEXqdHMEkAAAAi/elixir.gif')
        left top
        no-repeat
      `
    })
    return;
  }

  if (quiz.isQuizOver()) {
    if (quiz.userAnswer === quiz.currentQuestion.answer) {
      setCorrect();
    } else {
      setWrong();
    }
    displayResultBox();
    return;
  }

  if (quiz.userAnswer === quiz.currentQuestion.answer) {
    setCorrect();
    displayQuestion();
  } else {
    setWrong();
    displayQuestion();
  }


  turnColorsToDeafault()

}

function setCorrect() {
  quiz.score++;
  quiz.progressTrack.style.backgroundColor = '#5F8D4E';
}

function setWrong() {
  quiz.progressTrack.style.backgroundColor = '#F62D14';
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
  quiz.userAnswer = Number(e.target.id.replace('option', ''));
  }

  function turnColorsToDeafault() {
    btn1.style.backgroundColor = '#fdefa5';
    btn2.style.backgroundColor = '#fdefa5';
    btn3.style.backgroundColor = '#fdefa5';
    btn4.style.backgroundColor = '#fdefa5';
  }
