'use strict'
// 1. Setting and initializing variables:

const questionCount = 0; 
// As we have number of questions, indicationg that there 10 questions needed to be displayed;

const score = 0;
// Start from 0 as a player have not scored anything yet, but as a player progress _score_ will be incremented, and in the end of the game final _score_ will be displayed;

const answer;
// It will hold the answer key that we can compare with the option that a player selected; compare if the answer is correct and display via tracker + change the _score_ if the answer correct;

const timeIsUp = 0;
// If the timer has run out and we do not stop it, it will go -1, -2, -3 etc, that is why we need timeout function to indicate that time is over. And once its 0, the game moves to the next question.

const randomQuestion;
// It will generate a random number to load a random question from _questions.js_. Every time we have a new question, we want to have a random question, not them to be in the order that they are in the array;

const record = [];
// It will keep all the random index numbers that were generated so there are no same questions. It will compare if we already have the question. If newly generated random number (index) is already in the array record, then we will ask to generate a new number (question);

const statusOfRandNum = 0;
// It will be used together/while with random question number. If the random numbers is already in the record, then the status = 0, and the new number is needed to be generated. But once a new random number generated and its not in the record array, the status changes to 1, and the loop stops as we do not need the new number. Until the random number is not accepted the status = 0, once it accepted status = 1;

