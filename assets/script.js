const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            "A programming language",
            "A type of coffee",
            "A book",
            "A food item"
        ],
        correct: 0
    },
    {
        question: "What does HTML stand for?",
        answers: [
            "A) Hyper Text Markup Language",
            "B) High-level Text Markup Language",
            "C) Hyper Transfer Markup Language",
            "D) Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which HTML tag is used for creating an unordered list?",
        answers: [
            "A) <ul>",
            "B) <ol>",
            "C) <li>",
            "D) <ul> and <li>"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the HTML <meta> tag?",
        answers: [
            "A) To define a paragraph",
            "B) To create a hyperlink",
            "C) To provide metadata about the document",
            "D) To insert an image"
        ],
        correct: 2
    },
    {
        question: "How do you select an element with the class name 'example' in CSS?",
        answers: [
            "A) .example",
            "B) #example",
            "C) element.example",
            "D) class: example"
        ],
        correct: 0
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "A) Computer Style Sheet",
            "B) Creative Style Sheet",
            "C) Cascading Style Sheet",
            "D) Colorful Style Sheet"
        ],
        correct: 2
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            "A) text-color",
            "B) color",
            "C) font-color",
            "D) text-style"
        ],
        correct: 1
    },
    {
        question: "What is the JavaScript function used to print something to the console?",
        answers: [
            "A) print()",
            "B) log()",
            "C) console.log()",
            "D) display()"
        ],
        correct: 2
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            "A) var myVariable;",
            "B) variable myVariable;",
            "C) let myVariable;",
            "D) variable = myVariable;"
        ],
        correct: 0
    },
    {
        question: "What does the 'DOM' stand for in JavaScript?",
        answers: [
            "A) Document Object Model",
            "B) Data Object Model",
            "C) Document Order Model",
            "D) Data Order Model"
        ],
        correct: 0
    }
    
];

const timer = document.getElementById("time-left");
const questionContainer = document.getElementById("question-container");
const quizContainer = document.getElementById("quiz-container");
const answerButtons = document.getElementById("answer-buttons");
const initialsInput = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");
const highScoreContainer = document.getElementById("high-score-container");
const highScoresList = document.getElementById("high-scores-list");
const viewScoresButton = document.getElementById("view-scores-button");
const clearScoresButton = document.getElementById("clear-scores");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// Function to start the quiz
function startQuiz() {
    // Reset quiz variables
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
    
    viewScoresButton.style.display = "none";

    // Clear the "Time's up" message
    timer.textContent = "";
    
    timerInterval = setInterval(updateTimer, 1000);
    showQuestion();
    
    // Hide the "Start Game" button
    document.getElementById("start-button").style.display = "none";
    // Show the answer buttons
    document.getElementById("answer-buttons").style.display = "flex";
    // Show the "Time: 60 seconds" section
    document.getElementById("timer").style.display = "block";
}

// Function to update the timer
function updateTimer() {
    timeLeft--;
    timer.textContent = `Time: ${timeLeft} seconds`;
    if (timeLeft <= 0) {
        endQuiz();
    }
}

// Function to display a question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionContainer.querySelector("h2").textContent = `Question ${currentQuestionIndex + 1}:`;
        questionContainer.querySelector("#question").textContent = question.question;

        // Clear answer buttons
        answerButtons.innerHTML = "";

        // Create answer buttons
        question.answers.forEach((answer, index) => {
            const answerButton = document.createElement("button");
            answerButton.textContent = answer;
            answerButton.classList.add("answer-btn");
            answerButton.addEventListener("click", () => checkAnswer(index));
            answerButtons.appendChild(answerButton);
        });
    } else {
        endQuiz();
    }
}

// Function to check the answer
function checkAnswer(selectedIndex) {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        if (question.correct === selectedIndex) {
            score++;
        } else {
            timeLeft -= 10; // Deduct 10 seconds for incorrect answers
        }
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    timer.textContent = "Time's up!";
    answerButtons.style.display = "none";
    questionContainer.innerHTML = `<p>Your score: ${score}</p>`;
    scoreForm.style.display = "block";
    const footer = document.getElementById("footer");
    footer.style.display = "block";
    saveHighScore();

    // Reset question container content
    questionContainer.querySelector("h2").textContent = "";
    questionContainer.querySelector("#question").textContent = "";

    // Show the answer buttons
    answerButtons.style.display = "flex";
}

// Function to save high score to local storage
function saveHighScore() {
    const initials = initialsInput.value;
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to display high scores
function displayHighScores() {

    // Hide the answer buttons
    answerButtons.style.display = "none";

    // Hides the Header's 'View High Scores' button when on the high scores page
    viewScoresButton.style.display = "none";

    // Hides the quiz container
    quizContainer.style.display= "none";

    // Hide the "Start Game" button
    document.getElementById("start-button").style.display = "none";
    
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    highScoresList.innerHTML = "";

    for (let i = 0; i < highScores.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${highScores[i].initials}: ${highScores[i].score}`;
        highScoresList.appendChild(li);
    }

    highScoreContainer.style.display = "block";
}

// Function to clear high scores
function clearHighScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}

// Event listeners
viewScoresButton.addEventListener("click", function () {
    // Hide the quiz container
    document.getElementById("quiz-container").style.display = "none";
    // Hide the "Start Game" button
    document.getElementById("start-button").style.display = "none";
    timer.textContent = "";
    // Show the high scores
    displayHighScores();
});

// Event listener to the "Go Back" button. Reloads the home page
document.getElementById("go-back-button").addEventListener("click", function () {
    location.reload();
});

clearScoresButton.addEventListener("click", function () {
    clearHighScores();
});

// Start the quiz when the "Start" button is clicked
document.getElementById("start-button").addEventListener("click", function () {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    startQuiz();
});

// Submit high score when the user submits their initials
scoreForm.addEventListener("submit", function (e) {
    e.preventDefault();
    timer.textContent = "";
    questionContainer.innerHTML = ""
    scoreForm.style.display = "none";
    const footer = document.getElementById("footer");
    footer.style.display = "none";
    saveHighScore();
    // Display the high scores
    displayHighScores();
})