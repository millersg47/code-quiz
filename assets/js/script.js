//defining globabl variables based on HTML elements
var scores = document.querySelector(".scores");
var timerEl = document.querySelector(".timer-value");
var startButton = document.querySelector(".start");
var text = document.querySelector(".prompt");
var content = document.querySelector(".container");
var questionContent = document.querySelector(".question-area");
var answerList = document.querySelector(".answers");
var result = document.querySelector(".result");
//time variables
var timer;
var timerCount;
var lessTime = 10
// variable for quiz array index
var quizIndex = 0;
// variable for state of current score, if a right answer is selected 25pts are added
var currentScore = 0;
//declares variable for quiz q&a content as array containing an object for each question and answer set
var quiz = [ 
  {
    question: "Using _______ statement is how you test for a specific condition.",
    answers: ["Switch", "If", "Select", "Loop"], 
    rightAns: "If"
  },
  {
    question: "Which of these is a primitive data type?",
    answers: ["Booleam", "String", "Number", "All of these"],
    rightAns: "All of these"
  },
  {
    question: "The _______ method of an Array object adds and/or removes elements from an array.",
    answers: ["Reverse", "Shift", "Splice", "Cut"],
    rightAns: "Splice"
  },
  {
    question: "Which of the following can be used to call a Javascript Code Snippet?",
    answers: ["Function", "Event Listener", "Object", "Array"],
    rightAns: "Function"
  },
  {
    question: "What company developed Javascript?",
    answers: ["Microsoft", "Meta", "Netscape", "IBM"],
    rightAns: "Netscape"
  },

]
// The homeReload function is called when user clicks Play Again button on scores page.
function homeReload() {
  location.reload();
  }

// The startTimer function starts timer and stops it when timerCount reaches 0
function startTimer() {
    // Sets timer to start counting down from timerCount value defined as 60 in startGame function
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount <= 0) {
      answerList.style.display = "none";
       gameOver(); 
      }
    }, 1000);
};

function removeTimer(){
    timerEl.style.display= "none";
        clearInterval(startTimer);
};


//render QA removes intro text and presents question and set of answers to user based on which quiz question they are on.
function renderQA() {
    //removes content from original page load
    content.innerHTML ="";
      // defines variables for question and answer  
      var questionText = quiz[quizIndex].question;
      var answersText = quiz[quizIndex].answers;
      //adds question text to page
      content.textContent = questionText;
      content.classList.add("question-style");
      //for loop to create buttons in list populated by answer options from quiz array
      for (var i = 0; i < answersText.length; i++) {
        var answerListItem =  document.createElement("button");
        answerListItem.textContent = answersText[i];
        answerListItem.classList.add("answer-style");
        //makes answer buttons responsive to clicks and run checkAnswer function
        answerListItem.addEventListener("click", (checkAnswer));
        answerList.appendChild(answerListItem);
      };
};

//checkAnswer function will review user selection to see if it's the right or wrong answer and respond accordingly
function checkAnswer(event) {
  var answerListItem = event.target.textContent;
  if(answerListItem != quiz[quizIndex].rightAns) {
    timerCount = timerCount - lessTime;
    result.textContent = "Wrong!";
    console.log("wrong");
    currentScore = currentScore;
  } else if(answerListItem == quiz[quizIndex].rightAns) {
    currentScore = currentScore + 25;
    result.textContent = "Correct!"
    console.log("correct");
  } else {
    return;
  }
  //kicks off next question or gameOver function if all questions have been asked
  answerList.innerHTML = "";
  quizIndex++;

  if(quizIndex < quiz.length) {
    renderQA();
  }
  else if(quizIndex >= quiz.length) {
    removeTimer();
    result.textContent = ""
    gameOver();
  }
};

// gameOver function is called when all answers have been collected or when timer reaches 0. It loads a form submission page to enter intials for high scores
function gameOver() {
  removeTimer();
  //creating variables for all new elements to appear on game over screen
  var gameOverEl = document.createElement("h2");
  var scoreTextEl = document.createElement("p");
  var nameFormContainer = document.createElement("form");
  var nameForm = document.createElement("label");
  var nameInput = document.createElement("input");
  var submit = document.createElement("button");
  //adding content to elements and appending them.
  gameOverEl.textContent = "Game Over!"
  content.appendChild(gameOverEl);
  questionContent.appendChild(scoreTextEl);
  nameForm.textContent = "Enter your initials to be added to high scores";
  submit.textContent = "Submit";
  nameFormContainer.append(nameForm, nameInput, submit);
  content.innerHTML = "";
  content.appendChild(nameFormContainer);
 
  submit.addEventListener("click", loadScores);
};

//loadScores will update page to show the initials and scores of every round played since page was first loaded
function loadScores(event) {
  event.preventDefault();
  //removes content from original page load
  content.innerHTML ="";
  //creates elements for title, list and buttons
  var scoresTitle = document.createElement("h1");
  var playAgain = document.createElement("button");
  var clear = document.createElement("button");
  scoresTitle.textContent = "High Scores";
  content.appendChild(scoresTitle);
  var scoreUl = document.createElement("ul");
  var scoreEntry = document.createElement("li");

  var initials = localStorage.getItem("initials");
  scoreEntry.textContent = initials + currentScore;
  
  playAgain.textContent = "Play Again?";
  clear.textContent = "Clear Scores";
  content.appendChild(playAgain);
  content.appendChild(clear);

  //event listener for when user clicks Play Again button
  playAgain.addEventListener("click", homeReload);
   //event listener for when user clicks Clear Scores button
  clear.addEventListener("click", function() {
    scoreUl.innerHTML = "";
  })
};


// startGame function initiates timercountdown and renderQA1 functions; used in startButton event listener
function startGame() {
  timerCount = 60;
  startTimer()
  renderQA()
};


//an event listener to start the game once user clicks start//
startButton.addEventListener("click", startGame);

//an event listener for when user clicks on view scores element/
scores.addEventListener("click", loadScores);
