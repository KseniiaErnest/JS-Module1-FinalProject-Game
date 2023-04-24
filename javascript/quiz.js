class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.progressTrack;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  getNextQuestion() {
    this.currentQuestionIndex++;
    return this.getCurrentQuestion();
  }

  checkAnswer(answer) {
    const currentQuestion = this.getCurrentQuestion();
    if (answer === currentQuestion.answer) {
      this.score++;
      return true;
    }
    return false;
  }

  isGameOver() {
    return this.currentQuestionIndex >= this.questions.length;
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


window.addEventListener('load', (event) => {
  const startButton = document.querySelector('.btn');
  const startScreen = document.querySelector('.start-container');
  const body = document.querySelector('body');
  const quizGame = document.querySelector('#quiz-game');
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    body.style.backgroundImage = 'url(pikachu.jpg)';
    quizGame.style.display = 'block';
  })
})

function displayQuestion() {
  if (quiz.isGameOver()) {
    showScore();
  } else {
    const questionContent = document.querySelector('#question-text');
    questionContent.innerHTML = quiz.getCurrentQuestion().question;

const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');

option1.innerHTML = quiz.getCurrentQuestion().option1;
option2.innerHTML = quiz.getCurrentQuestion().option2;
option3.innerHTML = quiz.getCurrentQuestion().option3;
option4.innerHTML = quiz.getCurrentQuestion().option4;
  }
  showProgress();
}

function showProgress() {
  const currentQuestionNumber = quiz.currentQuestionIndex + 1;
  const questionNumber = document.querySelector('#number-question');
  questionNumber.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}


displayQuestion();