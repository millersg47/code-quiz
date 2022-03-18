//defining globabl variables based on original html elements that will generate events or be manipulated by an event
var scores = document.querySelector(".scores");
var timerEl = document.querySelector(".timer-value");
var startButton = document.querySelector(".start");
var text = document.querySelector(".prompt");
var content = document.querySelector(".container");
var questionContent = document.querySelector(".question-area");
var answerList = document.querySelector(".answers");
var result = document.querySelector(".result");
var timer;
var timerCount;
var lessTime = 10
var quizIndex = 0;
// variable for state of current score, if a wrong answer is selected 25pts are taken off
var currentScore = 100;
//declares variable for quiz q&a content as array containing an object for each question and answer set
var quiz = [ 
  {
    question: "This is the first question",
    answers: ["answer1", "answer2", "answer3", "answer4"], 
    rightAns: "answer2"
  },
  {
    question: "This is the second question",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    rightAns: "answer4"
  },
  {
    question: "This is the third question",
    answers: ["answer1", "answer2", "answer3", "answer4"],
    rightAns: "answer1"
  }
]
// The init function is called when the page loads and if user clicks Play Again button on scores page. Not sure what to put in it to make home page load? 
function init() {
  //reset global variables
  //how to hide content for easier unhiding?  
  location.reload();
  }

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

//render QA removes intro text and presents first question and set of answers to user. How to make answers appear and make them clickable buttons so for loop can continue through all questions? 
function renderQA() {
    //removes content from original page load
    content.innerHTML ="";
      // defines variables for question and answer  
      var questionText = quiz[quizIndex].question;
      var answersText = quiz[quizIndex].answers;
      //adds question to page
      content.textContent = questionText;
      //for loop to list item to populate with answer options from quiz array.
      for (var i = 0; i < answersText.length; i++) {
        var answerListItem =  document.createElement("button");
        answerListItem.textContent = answersText[i];
        answerListItem.addEventListener("click", (checkAnswer));
        answerList.appendChild(answerListItem);
      };
};

//checkAnswer function will review user selection to see if it's the right or wrong answer.
function checkAnswer(event) {
  var answerListItem = event.target.textContent;
  if(answerListItem != quiz[quizIndex].rightAns) {
    timerCount = timerCount - lessTime;
    result.textContent = "Wrong!";
    currentScore = currentScore - 25;
  } else if(answerListItem === quiz[quizIndex].rightAns) {
    result.textContent = "Correct!";
  } else {
    return;
  }

  answerList.innerHTML = "";
  quizIndex++;

  if(quizIndex < quiz.length) {
    renderQA();
  }
  else if(quizIndex >= quiz.length) {
    gameOver();
  }
};

//loadScores will update page to show the initials and scores of every round played since page was first loaded
function loadScores() {
  //removes content from original page load
  content.innerHTML ="";
  //creates elements for title, list and buttons
  var scoresTitle = document.createElement("h1");
  var playAgain = document.createElement("button");
  var clear = document.createElement("button");
  scoresTitle.textContent = "High Scores";
  content.appendChild(scoresTitle);
  var scoreUl = document.createElement("ul");
  //not sure how to make the input from the form in gameOver function populate the list items here and add the currentScore variable next to it
  var scoreListItems = document.createElement("li");
  scoreUl.appendChild(scoreListItems);
  playAgain.textContent = "Play Again?";
  clear.textContent = "Clear Scores";
  content.appendChild(playAgain);
  content.appendChild(clear);

  //event listener for when user clicks Play Again button
  playAgain.addEventListener("click", init);
   //event listener for when user clicks Clear Scores button
  clear.addEventListener("click", function() {
    scoreUl.innerHTML = "";
  })

};

// startGame function initiates timercountdown and renderQA1 functions; used in startButton event listener
function startGame() {
  timerCount = 6;
  startTimer()
  renderQA()
};

// gameOver function is called when all answers have been collected and when timer reaches 0. It loads a form submission page to enter intials for high scores
function gameOver() {
  //creating variables for all new elements to appear on game over screen
  var gameOverEl = document.createElement("h2");
  var scoreTextEl = document.createElement("p");
  var nameFormContainer = document.createElement("form");
  var nameForm = document.createElement("label");
  var nameInput = document.createElement("input");
  var submit = document.createElement("button");
  //adding content to elements and appending them. They are replacing each other instead of adding onto end. Need to fix. 
  gameOverEl.textContent = "Game Over!"
  content.appendChild(gameOverEl);
  scoreTextEl.textContent = "Your score is " + currentScore;
  content.appendChild(scoreTextEl);
  nameForm.textContent = "Enter your initials to be added to high scores";
  submit.textContent = "Submit";
  nameFormContainer.append(nameForm, nameInput, submit);
  content.innerHTML = "";
  content.appendChild(nameFormContainer);
  submit.addEventListener("click", loadScores);
  
  };

//an event listener to start the game once user clicks start//
startButton.addEventListener("click", startGame);

// //an event listener for when an answer is selected//
// answerList.addEventListener("click", checkAnswer);

//an event listener for when user clicks on view scores element//
scores.addEventListener("click", loadScores);
