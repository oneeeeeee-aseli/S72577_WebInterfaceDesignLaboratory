const questions = [
    {
        question: "What is the capital of Germany?",
        options: ["Kelantan", "Madrid", "Berlin", "Kuala Nerus"],
        correct: 2 // Third option is correct
    },
    {
        question: "What is 56 * 3 ?",
        options: ["245", "170", "168", "344"],
        correct: 2 // Third option is correct
    },
    {
        question: "Who sings the song Sangkar Derita?",
        options: ["Mazlan", "Haqiem Rusli", "Wan Aimi", "Madam Wan"],
        correct: 1 // Second option is correct
    }
];


let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// DOM Elements
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit-answer");

// Shuffle Questions
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// Start Timer
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFeedback(false);
            nextQuestion();
        }
    }, 1000);
}

// Display Question
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Select Answer
function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const isCorrect = selectedIndex === questions[currentQuestionIndex].correct;
    showFeedback(isCorrect);
    if (isCorrect) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }
    nextQuestion();
}

// Show Feedback
function showFeedback(isCorrect) {
    feedbackElement.textContent = isCorrect ? "Correct!" : "Incorrect!";
    feedbackElement.style.color = isCorrect ? "green" : "red";
    setTimeout(() => (feedbackElement.textContent = ""), 2000);
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        endQuiz();
    }
}

// Start Quiz
function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = "Score: 0";
    displayQuestion();
    startTimer();
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    questionElement.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    feedbackElement.textContent = "Your final score is: " + score;
    feedbackElement.style.color = "blue";
    submitButton.style.display = "none";
}

// Event Listener
submitButton.addEventListener("click", nextQuestion);

// Initialize Quiz
startQuiz();
