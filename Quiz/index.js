import { questions } from "./questions.js";

const questionElement = document.getElementById("question-section");
const optionsSection = document.querySelector("#options-section");
const options = document.querySelectorAll("#options-section p")
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score-section");
const parentElement = document.getElementById("quiz-section");
let shuffledQuestions = shuffleArray(questions);

let timer = 5;
let currentQuestion = 0;
let selectdAnswer = '';
let timerId = '';
let score = 0;


optionsSection.addEventListener("click", (e) => {

    if (e.target.nodeName === 'P' && !e.target.classList.contains("selected")) {
        selectdAnswer = e.target.innerText;
        options.forEach((option) => option.classList.add("disabled"));
        e.target.classList.add("selected");
        e.target.classList.remove("disabled");
    }
})

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function isAnswerCorrect() {

    if (selectdAnswer.toLowerCase() === shuffledQuestions[currentQuestion].correctAnswer.toString().toLowerCase()) {
        console.log(shuffledQuestions[currentQuestion].correctAnswer.toString());
        score++;
    }
}



function nextQuestion() {

    options.forEach((option) => option.classList.remove("disabled", "selected"));
    clearInterval(timerId);
    timer = 5;
    currentQuestion++;

    if (currentQuestion < shuffledQuestions.length) {
        generateQuestion();

    }
    else {
        scoreElement.textContent = `You scored ${score} out of 5`;
        parentElement.style.display = "none";


    }
}

function generateQuestion() {

    questionElement.textContent = `Q ${currentQuestion + 1}:  ${shuffledQuestions[currentQuestion].question}`;
    const shuffledOptions = shuffleArray(shuffledQuestions[currentQuestion].options);

    for (let i = 0; i < options.length; i++) {
        options[i].textContent = shuffledOptions[i];
    }

    timerElement.textContent = timer;

    timerId = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer === 0) {
            isAnswerCorrect();
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        }
    }, 1000);
}

generateQuestion();
