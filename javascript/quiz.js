class QuizGame {
constructor(questions) {
  this.body = document.querySelector('body');
  this.startScreen = document.querySelector('.start-container');
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
for (let i = questions.length -1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [questions[i], questions[j]] = [questions[j], questions[i]];
}
return questions.push(this.randomQuestionsArray);
}

// answerCurrentQuestion(option) {
//   const currentQuestion = this.getCurrentQuestion();
//   if (currentQuestion.answer === option) {
//     this.score++;
//   }
// }

getNewQuestion() {
  this.questionNumber.textContent = `Question ${questionCounter + 1} of 10`;
}


nextQuestion() {
  if (this.questionCounter === 9) {
    this.bntNext.textContent = 'Check the score!';
  } else if (this.btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  this.btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  this.btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  this.btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
    alert('Please select an option');
    return;
  }

  if (this.questionCounter > 9) {

  }


}

}