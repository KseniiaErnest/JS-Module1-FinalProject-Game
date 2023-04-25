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
