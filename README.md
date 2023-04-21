## Project #1

- Game description
- Logic breakdown
- Each class 
    - constructor, properties, methods
    - inheritance if any

## Game 'Anime Quiz' description and goal, logic breakdown
- The game checks player's knowledge about anime;
- There are questions with multiple choice answers (in this game there are going to be 4 possible answers);
- Number of players 1 (* check Optional)
- For each correct answer 1 point
- The game has _start screen_, _game screen_, _result screen_ that will be displayed inside _game screen_ after all questions are answered;
- There is a _questionBank_ with big number of questions but one game - 10 random questions dispalyed one after another.
-There is going to be a progress track bar that shows _now question_ -  yellow, then if the answer is correct it changes to green, if the answer is wrong it changes to red;
- Add timer to countdown a time for each answer. If a player does not choose answer, it automatically becomes wrong answer- no points

## Optional:
- To add an _anime preference function_, where a player can choose what anime quiz game they want to play;
- Create a record of names and scores, save them;
- Create 2 player game; -Players switch turns and earn points;

## Class, properties, methods
- class Player {
    constructor(name, points) {
        this.name: '';
        this.point: 0;
    }
}

## Notes fro myself during development:
---HTML---
-For now create separate html and css files for starter page and game page, respectively;
- I create a progress tracker which will show a player if their answer is correct/wrong. I create big div container with #game-progress and inside there 10 divs which represent answers. They all have the same class _numbers_ which will be used for design purposes, and diferrent ids which i am going to use in javascript part because depending on the correctness those ids will change the color. For example, _if a player on a question number 1, then the color should be..._ or _if a player answers correct/wrong, then the color should be..._ etc;
<div id="game-progress">
    <div class="numbers" id="number1">1</div>
    <div class="numbers" id="number2">2</div>
    <div class="numbers" id="number3">3</div>
    <div class="numbers" id="number4">4</div>
    <div class="numbers" id="number5">5</div>
    <div class="numbers" id="number6">6</div>
    <div class="numbers" id="number7">7</div>
    <div class="numbers" id="number8">8</div>
    <div class="numbers" id="number9">9</div>
    <div class="numbers" id="number10">10</div>
  </div>

  - Create #quiz-questions container which is going to contain all the questions and answer option. For the question line i use <p> give it an id but leave it empty as the questions will be generated with the help of JS.
  Then i create <div> that will contain answers options - assign class _opt_ for design purpose and id _answers-opt_ for JS. Inside i need to have 4 answer option and for that i use <button> tag - class _button_, id _btn_. But as i want answers to be different (they will keep changing depending on the question; giving dynamic values to the options (changing text) ) i need to have <span> inside with the id _option1_ and etc.
 <div id="quiz-questions">
        <p id="question">Question 1 Text</p>
        <div class="opt" id="answers-opt">
          <button id="btn1" class="button"><span id="option1">Option 1</span></button>
          <button id="btn2" class="button"><span id="option2">Option 2</span></button>
          <button id="btn3" class="button"><span id="option3">Option 3</span></button>
          <button id="btn4" class="button"><span id="option4">Option 4</span></button>
        </div>
        <button id="btn-check-answers">Next Question</button>
      </div>

- Create <div> and give id _result-box_, and in the start and during the quiz this part is hidden (display:none), but once the quiz is over, it will replace _quiz-questions_ sectino (via JS dispaly: none). Inside put <p> and id _result_ that will show a text with a help of JS;
<div id="result-box">
        <p id="result">Result Text</p>
        <button id="play-again">Play again!</button>
</div>

- <footer> which holds the text that will be manupilating via JS as well as timer.

---JavaScript---
- Need questions.js that will be my questions bank, and it will hold objects, i need to put it first as it is a data file and if js does not load it fisrt the error might occurr;
- Need script.js that will hold the rest of the code, DOM manupilation;
- Creating _questions.js_ first, inside i declare variable _questionsBank that will be an array holding multiple objects. Each object consists of question property, 4 option properties and answers property with respective values (so creating key-value). There are going to be 10 objects as i want to have 10 questions (levelup: see optionns). 
- After the Bank is done, move to the script code. It will consists of 7 parts: 
1. Set and initialize variables;
2. Load current questions into the app, create a function the will load the questions;
3. Create functions we need - setting the tracker/progress, changing the dispaly fro none to block/from block to none, calculating and dispalying final score;
4. Generate random number (via number of the object from the array), unused number (so there are no repeats) and set timer
5. Making the option selection work (changing color depending on the answer);
6. When _the next button_ is clicked, load the next question;
7. _Play Again_ button clicked, refresh page, what happens; seeting up random question number again;



## Functions
---setQuestion()--

It will take two arguments (parameters): question count (that represents number of question) and random number that will be used to choose the object from _questionBank_.

Inside we declare a variable questionObj that will tale a random object from _questionBank_. And it does so with the help of randNum.
 _const questionObj = questionsBank[randNum]_;

 Then we want the question from the object to be displayed on our page. We need to choose the element that will hold _textContent_ value of the question-key.
 We want out content to be dispalyed in the <p id="question">Question 1 Text</p>, and we already have an access to this element storing in the variable _questionContent_.
 questionContent.textContent = (qCount + 1) + `. ${questionObj.question}`;
 We get the access to the question string (value) of the object via 
 _questionObj.question_.

 And now we need to assign options to its content. And again we want it to be displayed in <span id="option1">Option 1</span> so 
option1.textContent = `${questionObj.option1}`;
option2.textContent = `${questionObj.option2}`;
option3.textContent = `${questionObj.option3}`;
option4.textContent = `${questionObj.option4}`;

--- changeTheNumberQuestionBar()---

This function is gonna change question number in the footer + show a color live-question in the progress/track bar.
This function accepts one argument and its a question number (question count). 
We want our footer question number to be displated in <p id="number-question">Question 1 of 10</p>, and we already have an access to it via _const questionNumber_, so now we need to asign the text content: questionNumber.textContent = `Question ${qCount + 1} of 10`;
(we do ${qCount + 1} because its gonna be dynamic and our number changes +1 every time we go to the next question);
Now we gonna use our variable progressTrack and 1. assign it a node from our HTML file depending on the qCount, and we do that by 
_progressTrack = document.querySelector(`#number${qCount + 1}`)_ Use of template literal to concatenate part of the id and qCount + 1;
And then we need to make sure that the live-number of the question changes color to _now-question_, and in our case its #fad61d;
_progressTrack.style.backgroundColor = '#fad61d'_.

---tunrColorsToDeafault()---

This function turns colors of options to its default color when a player goes to next qurstion.
To do that we just need to use variabel btn1, btn2, bt3, bt4 (to which we have the access via DOM manupilation) and set them to default colors.

---loadQuestions()---
It is going to be a big function that when invoked calls other functions - the 3 functions that we created above.
First, we set a condition that says if there is a last question (qCount === 9), then we need to change the content of the button _next question_ to _Check the result_, and change its color to red: 
 if(qCount === 9) {
    btn.textContent = 'Check the score!';
    btn.style.backgroundColor = '#F62D14';
}

Next step is to not allow more than 10 questions, and the condition for that is to say: if qCount is greater than 9, then we stop the function (return - because we know that after _return_ the function stops its execution);

After that we call back the 3 fucntions that we created before and add one more _startTimer(seconds, 'timer') that we will declare later; seconds that assigned to secondsInput and starts the countdown from 10, and 'timer ;


--- setCorrectAnswerC() ---

This function sets the color of the progress track number to green if the answer is correct + adds a point to the score;

--- setWrongAnswerC() ---

This function sets the color of the progress track number to red if the answer is wrong;

--- setFinalScore() ---

This function depending on the score sets the text content and final score, we use if statements;

--- displayResultScreen() ---

This function displays result box, and hiddes the question box + changes the text content of question number content + changes timer content to 00:00, and invokes setFinalScore()



- We'll need some way to store the questions in the quiz along with their answers.
- We'll need to write some logic that moves from one question to another and starts and restarts the quiz.
- We'll need to do some DOM interaction like handling a click on a button and displaying a question to the user.

- Model: Our quiz app is a data driven application. The data in this case are our questions. So we take our questions and the functions that interact with the data for those questions and put them into a set of objects.
- View: We're taking those questions and displaying them to the user, and handling user input. We can make a set of objects that just handle those tasks.
- Controller: Once we've separated out the data part and the view part, what's left is the logic that coordinates those two to create the application. We take that logic and put it into it's own object or objects as well.





----- getNewQuestion() -----

questionIndex = avaibleQuestions[randon number/index] = random question itself;
For example, questionIndex = avaibleQuestions[5] = what question has index 5 in the array avaibleQuestions? - thats going to be our question object;
questionIndex = 'Question object';

currentQuestion = questionIndex = 'Question object';
currentQuestion.question = 'Question text';

-- We need to make sure that we do not have repeatings:
const index1 = avaibleQuestions.indexOf(questionIndex) - we get the index of the current question (that displayed), then we need to remove it from the array so it does not repeat itself
avaibleQuestions.splice(index1, 1);

----- nextQuestion() -----
We need to set a limit on how many questions in the test - in this case its 10 (gonna be 9 as we start counting index from 0). So if questionCounter equals to 9, then _quiz is over_ hence _next question_ button becomes check the result is displayed.
+ We need to be sure that a player made a choice, so we set a condition where if all buttons have the default color, then the alert  is displayed.
+ we need options set to default color when we move to the next question so using function _tunrColorsToDeafault()_
+ when we get to the last question and click _check the result_, the result box shoud be diplayed + number of question area changes to _anime quiz is comleted_ + we add _return_ so the counting stops.
In all other cases we just call getNewQuestion() function. And we connect this function to _next question_ button as we want it to be invoked when we click the button;

----- getRusult(e) -----



----- changeTheNumberColor() -----
We need to set a question number in the footer + assign yellow color to the ProgressTrack number when new question loaded (= this is the current question) ===> add the function _getNewQuestion()_


----- setCorrect() -----
This function adds points and change the color of the progresstrack to green
===> works inside _nextQuestion()_ when the conditions are met; read about conditions in --&&--

----- setWrong() -----
This function changes the color of the progresstrack to red ===> works inside _nextQuestion()_ when the conditions are met;  read about conditions in --&&--

--&&&--
If its the last question we want to change current screen to the _result box_ but before that we also need to check if the last page question is right or wrong and if correct: setCorrect(), if wrong: setWrong(). And only after those conditions are checked and executed we move to the execution of the main condition - dispaly result box. 
if (questionCounter > 9) {
    if (userAnswer === currentQuestion.answer) {
      setCorrect();
    } else {
      setWrong();
    }
    displayResultBox();
    return
  }

We check if answer the answer is correct or wrong. If correct: setCorrect() + getNewQuestion(); if wrong: setWrong() + getNewQuestion();
  if (userAnswer === currentQuestion.answer) {
    setCorrect();
    getNewQuestion();
  } else {
    setWrong();
    getNewQuestion();
  }

----- goHomeMenu() -----
When we click _Home Menu_ button it reloads the test ===> this function is invoked in btnHome.addEventListener();


