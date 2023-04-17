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



- We'll need some way to store the questions in the quiz along with their answers.
- We'll need to write some logic that moves from one question to another and starts and restarts the quiz.
- We'll need to do some DOM interaction like handling a click on a button and displaying a question to the user.

- Model: Our quiz app is a data driven application. The data in this case are our questions. So we take our questions and the functions that interact with the data for those questions and put them into a set of objects.
- View: We're taking those questions and displaying them to the user, and handling user input. We can make a set of objects that just handle those tasks.
- Controller: Once we've separated out the data part and the view part, what's left is the logic that coordinates those two to create the application. We take that logic and put it into it's own object or objects as well.





