var timeLeft = 60
var counter = document.getElementById("counter");
var score = 0;
var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");
var questionEl = document.getElementById("question");
var i = 0;
counter.textContent = timeLeft;
var end = false;


// counts down from 60 to 0
function countdown() {
    timeDown = setInterval(function() {
        timeLeft = timeLeft - 1;

        if(timeLeft < 0) {
            timeLeft = 0;
        }

        counter.textContent = timeLeft;
    }, 1000)
}

var questions = [
    {
        question: "Which of the following is not a JavaScript data type?",
        options: [
            "Truthy",
            "Number",
            "Boolean",
            "String" 
        ],
        correct: "Truthy"
    },
    {
        question: "Which tag is used to link a JavaScript file to an HTML document?",
        options: [
            "link",
            "script",
            "file",
            "a"    
        ],
        correct: "script"
    },
    {
        question: "Which of the below CSS selectors has the lowest specificity?",
        options: [
            ".class",
            "#id",
            "h2",
            ".class p"    
        ],
        correct: "h2"
    },
    {
        question: "What will be the result of the following problem: 90 % 20?",
        options: [
            "4.5",
            "70",
            "1800",
            "10"    
        ],
        correct: "10"
    }
]

// hides question section and timer to start
hiddenQuestions = document.getElementById("quiz").style.visibility = "hidden";
hiddenCounter = document.getElementById("counter").style.visibility = "hidden";

function showQuestions() {
    //show question
    document.querySelector("#question").innerHTML = questions[i].question;

    // show answer choices
    document.querySelector("#choice1").innerHTML = questions[i].options[0];
    document.querySelector("#choice2").innerHTML = questions[i].options[1];
    document.querySelector("#choice3").innerHTML = questions[i].options[2];
    document.querySelector("#choice4").innerHTML = questions[i].options[3];

    // each answer can be true or false, setting attributes
    if(questions[i].options[0] === questions[i].correct) {
        choice1.setAttribute("data-correct", "true");
    } else {
        choice1.setAttribute("data-correct", "false");
    }
    
    if(questions[i].options[1] === questions[i].correct) {
        choice2.setAttribute("data-correct", "true");
    } else {
        choice2.setAttribute("data-correct", "false");
    }
    
    if(questions[i].options[2] === questions[i].correct) {
        choice3.setAttribute("data-correct", "true");
    } else {
        choice3.setAttribute("data-correct", "false");
    }

    if(questions[i].options[3] === questions[i].correct) {
        choice4.setAttribute("data-correct", "true");
    } else {
        choice4.setAttribute("data-correct", "false");
    }
}

// verify answers are correct and change score
document.querySelector("#answer-choices").addEventListener("click", function(event) {
    if(event.target.dataset["correct"] === "true") {
        event.target.classList.add("correct");
        score = score + 10;
        console.log(score);
    } else if(event.target.dataset["correct"] === "false") {
        event.target.classList.add("incorrect");
        if(timeLeft > 5) {
            timeLeft = timeLeft - 5;
        } else if(timeLeft < 5) {
            timeLeft = 0;
        }
    }
    i++;
    setTimeout(resetColors, 1000);
})

// resets the color of all buttons to the default at the start of each question
function resetColors() {
    const options = document.querySelectorAll(".btn")
    options.forEach(element => { element.classList.remove("correct")
    element.classList.remove("incorrect")})
    endGame();
}

function saveScore() {
    // stops countdown
    clearInterval(timeDown);
    // creates array to store player data
    var player = [];
    var total = score + timeLeft;
    var name = prompt("Congratulations, your score is " +(total)+". Please enter your name to save your score.");
    player.push(name, total);

    // push player info into another array that will contain all players and scores
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores) {
        highScores = [];
    }
    highScores.push(player);

    // stringify and save high scores
    highScores = JSON.stringify(highScores);
    localStorage.setItem("highScores", highScores);
}

function endGame() {
    if(i < questions.length && timeLeft != 0) {
        showQuestions();
    } else {
        saveScore();
        quizReset();
    }
}


// creates start button DOM element
var startQuiz = document.getElementById("start");

// starts quiz by hiding intro section and revealing questions and starting timer
startQuiz.addEventListener("click", function() {
    intro = document.getElementById("intro").style.visibility = "hidden";
    visibleQuestions = document.getElementById("quiz").style.visibility = "visible";
    hiddenButton = document.getElementById("start").style.visibility = "hidden";
    visibleCounter = document.getElementById("counter").style.visibility = "visible";
    countdown();
    showQuestions();
});

// resets defaults when the quiz is restarted
function quizReset() {
    intro = document.getElementById("intro").style.visibility = "visible";
    visibleQuestions = document.getElementById("quiz").style.visibility = "hidden";
    visibleButton = document.getElementById("start").style.visibility = "visible";
    visibleCounter = document.getElementById("counter").style.visibility = "hidden";
    timeLeft = 60;
    i = 0;
    score = 0;
    counter.textContent = timeLeft;
}
