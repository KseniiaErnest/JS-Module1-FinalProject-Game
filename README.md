## Project #1

- Game description
- Logic breakdown
- Each class 
    - constructor, properties, methods
    - inheritance if any

## Game 'Anime Quiz' description and goal, logic breakdown
- The game checks players's knowledge about anime;
- There are questions with multiple choice answers (in this game there are going to be 3 possible answers);
- Number of players: 2;
- Players switch turns and earn points;
- The players with the highest score wins;
- The game has _start screen_, _game screen_, _end screen_

## Optional:
- To add an _anime preference function_, where a player can choose what anime quiz game they want to play;

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


- We'll need some way to store the questions in the quiz along with their answers.
- We'll need to write some logic that moves from one question to another and starts and restarts the quiz.
- We'll need to do some DOM interaction like handling a click on a button and displaying a question to the user.

- Model: Our quiz app is a data driven application. The data in this case are our questions. So we take our questions and the functions that interact with the data for those questions and put them into a set of objects.
- View: We're taking those questions and displaying them to the user, and handling user input. We can make a set of objects that just handle those tasks.
- Controller: Once we've separated out the data part and the view part, what's left is the logic that coordinates those two to create the application. We take that logic and put it into it's own object or objects as well.





