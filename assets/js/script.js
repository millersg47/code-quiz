//defining globabl variables based on original html elements that will generate events
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


//declares variable as object containing question 1 and answers
var quiz1 = {
    question: "This is the first question",
    answers: ["answer1", "answer2", "answer3", "answer4"],
}
//declares variable as object containing question 2 and answers
var quiz2 = {
    question: "This is the second question",
    answers: ["answer1", "answer2", "answer3", "answer4"],
}

// The init function is called when the page loads 
function init() {
    pullWins();
    pullLosses();
  }
// startGame function initiates timercountdown and renderQA1 functions; used in startButton event listener
function startGame() {
    timerCount = 60;
    startTimer()
    renderQA1()
};

// The startTimer function starts timer and stops it when timerCount reaches 0
function startTimer() {
    // Sets timer to start counting down from timerCount value defined as 60 in startGame function
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount <= 0) {
        timerEl.textContent = " ";
        clearInterval(startTimer);
      }
    }, 1000);
  };

//render QA1 removes intro text and presents first question and set of answers to user
function renderQA1() {
    content.removeChild(startButton);
    prompt.textContent = quiz1.question;
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