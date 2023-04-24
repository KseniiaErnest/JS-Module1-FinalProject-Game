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

let countDownId;
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
function setQuestion(qCount, randomQuestion) {
  const questionObj = questionsBank[randomQuestion];
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
function loadQuestions(qCount, randomQuestion) {

if(qCount === 9) {
    btn.textContent = 'Check the score!';
    btn.style.backgroundColor = '#F62D14';
}

if (qCount > 9) {
  return; 
}

setQuestion(qCount, randomQuestion);
changeTheNumberQuestionBar(qCount);
tunrColorsToDeafault();

startTimer(seconds, timerD);

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

// ----- 4. Generate random, unsused number and set timer

// 1. Function to generate a random question
function GenerateRandomNum() {
  while (statusOfRandNum === 0) {
    randomQuestion = Math.round(Math.random() * questionsBank.length);
    if (randomQuestion !== questionsBank.length) {
      for (let i = 0; i < record.length; i++) {
        if(randomQuestion === record[i]) {
          break;
        }
        else if (i === record.length - 1) {
          record[questionCount] = randomQuestion;
          statusOfRandNum = 1;
        }
      }
    }

  }
  statusOfRandNum = 0;
  return randomQuestion;
}

// 2. Function to set a timer

function startTimer(secs, element) {
timer = element;
timer.innerHTML = `00 : ${secs}`;

if (secs < 0) {
  clearTimeout(countDownId);
// call the next question or set the result page
//no option selected - wrong
if (btn1.style.backgroundColor !== 'rgb(250, 214, 29)' &&
btn2.style.backgroundColor !== 'rgb(250, 214, 29)' &&
btn3.style.backgroundColor !== 'rgb(250, 214, 29)' &&
btn4.style.backgroundColor !== 'rgb(250, 214, 29)' ) {
  // if we are at the last question
  if (questionCount === 9) {
setWrongAnswerC();
displayResultScreen();
return;
  } 
  setWrongAnswerC();
  secs = secondsInput;
  loadQuestions(++qCount, GenerateRandomNum());
  }
  //if option was selected
  else {
    if (questionCount === 9) {
      if (answer === questionsBank[randomQuestion].answer) {
        setCorrectAnswerC();
      }
      else {
        setWrongAnswerC();
      }
      displayResultScreen();
      return;
    }

    if (answer === questionsBank[randomQuestion].answer) {
      setCorrectAnswerC();
      secs = secondsInput;
      loadQuestions(++qCount, GenerateRandomNum());
    } else {
      setWrongAnswerC();
      secs = secondsInput;
      loadQuestions(++qCount, GenerateRandomNum());
    }

  }
  return;
}


secs--;
countDownId = setTimeout(startTimer, 1000);



}
// startTimer(seconds, timerD);

// --------------------------------------------------
// --------------------------------------------------
// -------------------------------------------------

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
    this.currentQuestionObj;
    this.questionCounter = 0;
    this.randomQuestionsArray = [];
    this.progressTrack;
    this.userAnswer;
  }
  
  startGame() {
    this.startButton.addEventListener('click', () => {
      this.startScreen.style.display = 'none';
      this.body.style.backgroundImage = 'url(pikachu.jpg)';
      this.game.style.display = 'block';
    });
  
    this.setQuestions();
  }
  
  setAvaibleQuestions(questions) {
    const shuffledAr = [...questions];
  for (let i = shuffledAr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAr[i], shuffledAr[j]] = [shuffledAr[j], shuffledAr[i]];
  }
  return this.randomQuestionsArray.push(shuffledAr);
  }
  
  getNewQuestion() {
    this.questionNumber.textContent = `Question ${this.questionCounter + 1} of 10`;
  
    const randomQuestionObj = this.randomQuestionsArray[Math.floor(Math.random() * this.randomQuestionsArray.length)];
    this.currentQuestionObj = randomQuestionObj;
    return this.currentQuestionObj;
    this.currentQuestion = randomQuestionObj.question;
    this.questionContent.textContent = this.currentQuestion;
  
    this.option1.textContent = this.randomQuestionObj.option1;
    this.option2.textContent = this.randomQuestionObj.option2;
    this.option3.textContent = this.randomQuestionObj.option3;
    this.option4.textContent = this.randomQuestionObj.option4;
  
    this.questionCounter++;
  }
  
  
  }
  
  const quizGame = new QuizGame(questionsBank);
  
  
  window.addEventListener('load', (event) => {
    quizGame.startGame();
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // setAvaibleQuestions(questions) {
  //   const shuffledAr = [...questions];
  // for (let i = shuffledAr.length - 1; i > 0; i--) {
  //   const j = Math.floor(Math.random() * (i + 1));
  //   [shuffledAr[i], shuffledAr[j]] = [shuffledAr[j], shuffledAr[i]];
  // }
  // return this.randomQuestionsArray.push(shuffledAr);
  // }
  
  // getNewQuestion() {
  //   this.questionNumber.textContent = `Question ${this.questionCounter + 1} of 10`;
  
  //   const randomQuestionObj = this.randomQuestionsArray[Math.floor(Math.random() * this.randomQuestionsArray.length)];
  //   this.currentQuestion = randomQuestionObj.question;
  //   this.questionContent.textContent = this.currentQuestion;
  
  //   this.option1.textContent = this.randomQuestionObj.option1;
  //   this.option2.textContent = this.randomQuestionObj.option2;
  //   this.option3.textContent = this.randomQuestionObj.option3;
  //   this.option4.textContent = this.randomQuestionObj.option4;
  
  //   this.questionCounter++;
  // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  // function displayQuestion() {
  //   quizGame.questionNumber.textContent = `Question ${quizGame.questionCounter + 1} of 10`;
  
  //   if (quizGame.questionCounter === 9) {
  //     quizGame.btnNext.textContent = 'Check the score!';
  //   } else if (quizGame.btn1.style.backgroundColor === 'rgb(253, 239, 165)' &&
  //   quizGame.btn2.style.backgroundColor === 'rgb(253, 239, 165)' &&
  //   quizGame.btn3.style.backgroundColor === 'rgb(253, 239, 165)' &&
  //   quizGame.btn4.style.backgroundColor === 'rgb(253, 239, 165)') {
  //     alert(`'Please select an option'`)
  //     return;
  //   }
  
  //   if (quizGame.questionCounter > 9) {
  //     if (quizGame.userAnswer === quizGame.currentQuestion.answer) {
  //       quizGame.setCorrect();
  //     } else {
  //       quizGame.setWrong();
  //     }
  //     quizGame.displayResultBox();
  //     return
  //   }
  
  
  // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // setAvaibleQuestions(questions) {
  //   const shuffledAr = [...questions];
  //   for (let i = 0; i < shuffledAr.length; i++) {
  //     return randomQuestionsArray.push(shuffledAr[i]);
  //   }
  // }
  
  // getNewQuestion() {
  //   this.questionNumber.textContent = `Question ${this.questionCounter + 1} of 10`;
  
  //   const questionIndex = this.randomQuestionsArray[Math.floor(Math.random() * this.randomQuestionsArray.length)];
  //   this.currentQuestion = questionIndex;
  //   this.questionContent.textContent = this.currentQuestion.question;
  
  //   this.option1.textContent = this.currentQuestion.option1;
  //   this.option2.textContent = this.currentQuestion.option2;
  //   this.option3.textContent = this.currentQuestion.option3;
  //   this.option4.textContent = this.currentQuestion.option4;
  
  //   const index1 = this.randomQuestionsArray.indexOf(questionIndex);
  //   this.randomQuestionsArray.splice(index1, 1);
  
  //   this.questionCounter++;
  // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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


// ---------------------------------
//-------------------------------------
//-------------------------------------
//---------------------------------------
//-------------------------------------------------
class QuizGame {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestion = {};
    this.score = 0;
    this.questionIndex = 0;
  }

  // --- Generate a random question from questionsBank
  getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.currentQuestion = this.questions[randomIndex];
    return this.questions.splice(randomIndex, 1);
    //Removes selected question from the QuestionBank;
  }

  // --- Check if the answer is correct and update the score
  annswerQuestion(answer) {
    if (answer === this.currentQuestion.answer) {
      this.score++;
      return true;
    } else {
      return false;
    }
  } 

  // --- Get the next question
  getNextQuestion() {
    this.getRandomQuestion();
    this.questionIndex++;
    return this.currentQuestion;
  }

  // --- Check if game is over
  isGameOver() {
    return this.currentQuestionIndex >= this.questions[9];
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  updateScore() {
    this.score += score;
  }
}

const quiz = new QuizGame(questions);
const player = new Player('Player 1');

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

function displayQuestion() {
  const currentQuestion = quiz.getRandomQuestion();
  questionContent.textContent = currentQuestion.question;
  option1.textContent = currentQuestion.option1;
  option2.textContent = currentQuestion.option2;
  option3.textContent = currentQuestion.option3;
  option4.textContent = currentQuestion.option4;


}


window.addEventListener('load', (event) => {
  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    body.style.backgroundImage = 'url(pikachu.jpg)';
    quizGame.style.display = 'block';
  })

  displayQuestion();
})


//-------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
// Create a quiz class
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

// Create a question class

class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// Display question function

function displayQuestion() {
  if (quiz.isEnded()) {
    showScore();
  } else {
    // show next question
    let questionContent = document.querySelector('#question-text');
    questionContent.innerHTML = quiz.getQuestionIndex().text;

    // show options
    // let choices = quiz.getQuestionIndex().choices;
    // for (let i = 0; i < choices.length; i++) {
    //   let choiceElement = document.getElementById(`option${i}`);
    //   choiceElement.innerHTML = choices[i];
    //   guess('btn' + i, choices[i]);
    // }

    showProgess();
  }
};

// Guess function
function guess(id, guess) {
  let button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    displayQuestion();
  }
}

// Show progress
function showProgess() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let questionNumber = document.querySelector('#number-question');
  questionNumber.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;

}

// Show score function
function showScore() {
  let quizEndHTML = 
  `
  <h1>Quiz Completed</h1>
  <h2>Your score is ${quiz.score}</h2>
  `;

  const quizGame = document.querySelector('#quiz-game');
  quizGame.innerHTML = quizEndHTML;
}

// Create quiz questions
let questions = [
  new Question(
    'Which Pokémon has electricity-storing pouches on its cheeks?',
    ['Eevee', 'Ditto', 'Pikachu', 'Charmander'],
    'Pikachu'
),

new Question(
  'How many Dragon Balls are there?',
  ['Seven', 'Five', 'Ten', 'Three'],
  'Seven'
),

new Question(
  'Which anime series revolves around a boy who sells his soul to a demon?',
  ['Naruto', 'Black Butler', 'Bleach', 'Attack on Titan'],
  'Black Butler'
),

];

let quiz = new Quiz(questions);

// display questions
displayQuestion();

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