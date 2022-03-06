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


// counts down from 60
function countdown() {
    timeDown = setInterval(function() {
        timeLeft = timeLeft - 1;

        if(timeLeft < 0) {
            timeLeft = 0;
            clearInterval(timeDown);
        }

        counter.textContent = timeLeft;
    }, 1000)
}

var questions = [
    {
        question: "Sample question #1",
        options: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4" 
        ],
        correct: "answer 1"
    },
    {
        question: "Sample question #2",
        options: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4"    
        ],
        correct: "answer 2"
    },
    {
        question: "Sample question #3",
        options: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4"    
        ],
        correct: "answer 3"
    },
    {
        question: "Sample question #4",
        options: [
            "answer 1",
            "answer 2",
            "answer 3",
            "answer 4"    
        ],
        correct: "answer 4"
    }
]


hiddenQuestions = document.getElementById("quiz").style.visibility = "hidden";

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

showQuestions();

// verify answers are correct and change score
document.querySelector("#answer-choices").addEventListener("click", function(event) {
    if(event.target.dataset["correct"] === "true") {
        event.target.classList.add("correct");
        score = score + 10;
        console.log(score);
        // event.target.innerText("You got it!");
        console.log("true");
    } else if(event.target.dataset["correct"] === "false") {
        event.target.classList.add("incorrect");
        if(timeLeft > 5) {
            timeLeft = timeLeft - 5;
        } else if(timeLeft < 5) {
            timeLeft = 0;
        }
        // event.target.innerText("You missed it :(");
        console.log("false");
    }
    i++;
    setTimeout(resetColors, 500);
    //showQuestions();
    endGame();
})

function resetColors() {
    document.querySelector(".btn-primary").classList.remove("correct");
    document.querySelector(".btn-primary").classList.remove("incorrect");
}

function saveScore() {
    var player = [];
    var name = prompt("Please enter your name to save your score.");
    player.push(name, score);

    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores) {
        highScores = [];
    }
    highScores.push(player);

    highScores = JSON.stringify(highScores);
    localStorage.setItem("highScores", highScores);
}

function endGame() {
    if(i < questions.length && timeLeft != 0) {
        showQuestions();
    } else {
        saveScore();
    }
}

// function getResult() {
//     var answerChoices = document.getElementById("answer-choices");
//     answerChoices.addEventListener("click", function() {
//         if (event.target === true) {
//             console.log("hello");
//         }
//     })
// }

var startQuiz = document.getElementById("start");

startQuiz.addEventListener("click", function() {
    intro = document.getElementById("intro").style.visibility = "hidden";
    visibleQuestions = document.getElementById("quiz").style.visibility = "visible";
    hiddenButton = document.getElementById("start").style.visibility = "hidden";
    countdown();
});
