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
var quizIndex = 0;


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
// The init function is called when the page loads 
function init() {
    pullWins();
    pullLosses();
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
    //for loop to go through array of quiz question and answer sets. 
    for (var i = 0; i < quiz.length; i++) {
      // defines variables for question and answer  
      var questionText = quiz[quizIndex].question;
      var answersText = quiz[quizIndex].answers;
      //adds question to page
      content.textContent = questionText;
      //define variable for list to populate with answer options
      var answerListItems =  document.createElement("li");
      answerListItems.textContent = answersText;
      answerList.append(answerListItems);
      
  }
};

//checkAnswer function will review user selection to see if it's the right or wrong answer. It will log the result and store it for use when scoring
function checkAnswer() {
}

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
  //adding content to elements and appending them. They are replacing each other instead of adding onto end. Need to fix. 
  gameOverEl.textContent = "Game Over!"
  content.appendChild(gameOverEl);
  scoreTextEl.textContent = "Your score is "; //need to add + and var for dynamic score # based on number of questions answered correct
  content.appendChild(scoreTextEl);
  nameForm.textContent = "Enter your initials to be added to high scores";
  nameFormContainer.appendChild(nameForm, nameInput);
  content.innerHTML = "";
  content.appendChild(nameFormContainer);
  
  }

//creating an event listener to start the game once user clicks start//
startButton.addEventListener("click", startGame);



//   scores.addEventListener("click", function() {
//       // make scores link cliackable to show scores. Is this even required??
//   })