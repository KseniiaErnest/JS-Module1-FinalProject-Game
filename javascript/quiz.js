class QuizGame {
constructor(questions) {
  this.body = document.querySelector('body');
  this.startScreen = document.querySelector('.start-container');
  this.startButton = document.querySelector('.btn');
  this.game = document.querySelector('#quiz-game');
  this.quizQuestions = document.querySelector('#quiz-questions');
  this.resultBox = document.querySelector('#result-box');
  this.questionContent = document.querySelector('#question-text');

  this.questionNumber = document.querySelector('#number-question');


  this.option1 = document.querySelector('#option1');
  this.option2 = document.querySelector('#option2');
  this.option3 = document.querySelector('#option3');
  this.option4 = document.querySelector('#option4');
  this.btn1 = document.querySelector('#btn1');
  this.btn2 = document.querySelector('#btn2');
  this.btn3 = document.querySelector('#btn3');
  this.btn4 = document.querySelector('#btn4');



  this.score = 0;
  this.questions = questions;
  this.currentQuestion;
  this.questionCounter = 0;
  this.randomQuestionsArray = [];
  this.progressTrack;
  this.userAnswer;
}

setAvaibleQuestions(questions) {
  const shuffledAr = [...questions];
for (let i = shuffledAr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffledAr[i], shuffledAr[j]] = [shuffledAr[j], shuffledAr[i]];
}
return this.randomQuestionsArray.push(shuffledAr);
}

// answerCurrentQuestion(option) {
//   const currentQuestion = this.getCurrentQuestion();
//   if (currentQuestion.answer === option) {
//     this.score++;
//   }
// }

getNewQuestion() {
  // this.questionNumber.textContent = `Question ${this.questionCounter + 1} of 10`;

  const randomQuestionObj = this.randomQuestionsArray[Math.floor(Math.random() * this.randomQuestionsArray.length)];
  this.currentQuestion = randomQuestionObj.question;
  this.questionContent.textContent = this.currentQuestion;

  this.option1.textContent = this.randomQuestionObj.option1;
  this.option2.textContent = this.randomQuestionObj.option2;
  this.option3.textContent = this.randomQuestionObj.option3;
  this.option4.textContent = this.randomQuestionObj.option4;

  this.questionCounter++;

}

startGame() {
  this.startButton.addEventListener('click', () => {
    this.startScreen.style.display = 'none';
    this.body.style.backgroundImage = 'url(pikachu.jpg)';
    this.game.style.display = 'block';
  });
}

}

const quizGame = new QuizGame(questionsBank);


window.addEventListener('load', (event) => {
  quizGame.startGame();
});

function displayQuestion() {
  quizGame.questionNumber.textContent = `Question ${quizGame.questionCounter + 1} of 10`;

  if (quizGame.questionCounter === 9) {
    quizGame.btnNext.textContent = 'Check the score!';
  } else if (quizGame.btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  quizGame.btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  quizGame.btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  quizGame.btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
    alert(`'Please select an option'`)
    return;
  }

  if (quizGame.questionCounter > 9) {

  }


}





































// window.onload = function() {
//   // _Lets Start_ button is clicked, change to the _game quiz_ screen
//   startButton.addEventListener('click', () => {
//     startScreen.style.display = 'none';
//     body.style.backgroundImage = 'url(pikachu.jpg)';
//     quizGame.style.display = 'block';
//   });

//   btnHome.addEventListener('click', () => {
//     quizGame.style.display = 'none';
//     resultBox.style.display = 'none';
//     body.style.backgroundImage = 'url(doraemon.jpg)';
//     startScreen.style.display = 'flex';
//     goHomeMenu();
//   });

//   // To make work _next question_ button
//   btnNext.addEventListener('click', nextQuestion);

//   //
//   option1.addEventListener('click', getResult);
//   option2.addEventListener('click', getResult);
//   option3.addEventListener('click', getResult);
//   option4.addEventListener('click', getResult);

//   // 1. We set all questions in _avaibleQuestions_ array 
//   setAvaibleQuestions();
// //  2. We call _getNewQuestion()_ function to display questions and options
//   getNewQuestion();
// }