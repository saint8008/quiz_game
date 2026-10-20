const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of Burkina Faso?",
        answers: [
            { text: "Ouagadougou", correct: true},
            { text: "Dakar", correct: false},
            { text: "Moshi", correct: false},
            { text: "Kinshasa", correct: false},
        ]
    },
    {
        question: "What is the highest mountain in Africa?",
        answers: [
            { text: "Mount Kenya", correct: false},
            { text: "Mount Meru", correct: false},
            { text: "Mount Kilimanjaro", correct: true},
            { text: "Mount Stanley", correct: false},
        ]
    },
    {
        question: "Which is the largest country in Africa by area?",
        answers: [
            { text: "Algeria", correct: true},
            { text: "Democratic Republic of the Congo", correct: false},
            { text: "Sudan", correct: false},
            { text: "Libya", correct: false},
        ]
    },
     {
        question: "Which is the most populous country in Africa?",
        answers: [
            { text: "Nigeria", correct: true},
            { text: "Ethiopia", correct: false},
            { text: "Egypt", correct: false},
            { text: "South Africa", correct: false},
        ]
    },
    {
        question: "Which was the first sub-Saharan African country to gain independence from colonial rule, in 1957?",
        answers: [
            { text: "Nigeria", correct: false},
            { text: "Ghana", correct: true},
            { text: "Kenya", correct: false},
            { text: "Senegal", correct: false},
        ]
    },
]

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);

    })
}

function selectAnswer (event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach (button => {
        if (button.dataset.correct  === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout (() => {
        currentQuestionIndex++;

        // check if quiz is over or there are more questions
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    if (percentage === 100){
        resultMessage.textContent = "Perfect score";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad!";
    } else {
        resultMessage.textContent = "Do better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}