//defining globabl variables based on original html elements that will generate events or be manipulated by an event
var scores = document.querySelector(".scores");
var timerEl = document.querySelector(".timer-value");
var startButton = document.querySelector(".start");
var text = document.querySelector(".prompt");
var content = document.querySelector(".container");
var answerList = document.querySelector(".answers");
var result = document.querySelector(".result");
var winTracker = 0;
var lossTracker = 0;
var timer;
var timerCount;


//declares variable for quiz q&a content as array containing an object for each question and answer set
var quiz = [ 
  {
    question1: "This is the first question",
    answers1: ["answer1", "answer2", "answer3", "answer4"],  
  },
  {
    question2: "This is the second question",
    answers2: ["answer1", "answer2", "answer3", "answer4"],
  }
]
// The init function is called when the page loads 
function init() {
    pullWins();
    pullLosses();
  }
// startGame function initiates timercountdown and renderQA1 functions; used in startButton event listener
function startGame() {
    timerCount = 6;
    startTimer()
    // renderQA()
};

// The startTimer function starts timer and stops it when timerCount reaches 0
function startTimer() {
    // Sets timer to start counting down from timerCount value defined as 60 in startGame function
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount === 0) {
       gameOver(); 
      }
      else if (timerCount <= 0) {
        timerEl.textContent = " ";
        clearInterval(startTimer);
      }
    }, 1000);
  };

// gameOver function is called when all answers have been collected and when timer reaches 0. It loads a form submission page to enter intials for high scores
function gameOver() {
  var gameOverEl = document.createElement("h2");
  var scoreTextEl = document.createElement("p");
  var nameFormContainer = document.createElement("form");
  var nameForm = document.createElement("label");
  var nameInput = document.createElement("input");
  gameOverEl.textContent = "Game Over!"
  scoreTextEl.textContent = "Your score is "; //need to add + and var for dynamic score # based on number of questions answered correct
  nameForm.textContent = "Enter your initials to be added to high scores";
  nameFormContainer.appendChild(nameForm, nameInput);
  // is there a way to remove or append multiple elements? 
  content.removeChild(text, startButton, answerList, result);
  content.appendChild(gameOverEl, scoreTextEl, nameFormContainer);
  
  }
//render QA1 removes intro text and presents first question and set of answers to user
function renderQA() {
    content.removeChild(startButton);
    //is syntax correct in below? trying to load the first question in place of the intro text
    prompt.textContent = quiz.question1;
    //below line flagging an error on console, answerList.createElement is not a function
    var answ1 = answerList.createElement("li");
    answ1.textContent = quiz1.answers[0];
    answerList.appendChild(answ1);
};


//creating an event listener to start the game once user clicks start//
startButton.addEventListener("click", startGame);



//   scores.addEventListener("click", function() {
//       // make scores link cliackable to show scores. Is this even required??
//   })