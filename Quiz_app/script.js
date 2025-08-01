document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Cache all necessary DOM elements
    // ----------------------------------------
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container'); 
    const resultContainer = document.getElementById('result-container');
    const restartBtn = document.getElementById('restart-btn');
    const optionsList = document.getElementById('options-list');
    const scoreDisplay = document.getElementById('score');
    const questionText = document.getElementById('question-text');

    // ----------------------------------------
    // Define the quiz questions data
    // ----------------------------------------
    const questionsList = [
        {
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin", "Rome"],
            correctAnswer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Mars", "Venus", "Jupiter", "Saturn"],
            correctAnswer: "Jupiter"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
            correctAnswer: "Vatican City"
        },
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            correctAnswer: "H2O"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            correctAnswer: "Harper Lee"
        },
        {
            question: "What is the largest mammal on Earth?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], 
            correctAnswer: "Blue Whale"
        }
    ];

    // ----------------------------------------
    // Initialize state variables
    // ----------------------------------------
    let currentQuestionIndex = 0;
    let score = 0;

    // ----------------------------------------
    // Event Listeners for button clicks
    // ----------------------------------------
    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsList.length) { 
            showQuestion();
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        // Reset game state
        currentQuestionIndex = 0;
        score = 0;
        // Hide result container and start a new quiz
        resultContainer.classList.add('hidden');
        startQuiz();
    });

    // ----------------------------------------
    // Functions for game flow
    // ----------------------------------------
    function startQuiz() {
        startBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        // Hide the "Next" button until an answer is selected
        nextBtn.classList.add('hidden');
        // Set the question text
        questionText.textContent = questionsList[currentQuestionIndex].question;
        // Clear previous options
        optionsList.innerHTML = '';
        
        // Loop through options and create list items
        questionsList[currentQuestionIndex].options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option;
            // Add a click listener to each option
            li.addEventListener('click', () => selectAnswer(li));
            optionsList.appendChild(li);
        });
    }

    function selectAnswer(selectedLi) {
        // Disable all options to prevent multiple selections
        Array.from(optionsList.children).forEach(li => {
            li.classList.add('disabled');
        });
        
        const correctAnswer = questionsList[currentQuestionIndex].correctAnswer;
        const selectedOption = selectedLi.textContent;

        if (selectedOption === correctAnswer) {
            score++;
            selectedLi.classList.add('correct');
        } else {
            selectedLi.classList.add('incorrect');
            // Find and highlight the correct answer
            Array.from(optionsList.children).find(li => li.textContent === correctAnswer).classList.add('correct');
        }

        // Show the "Next" button to allow the user to proceed
        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questionsList.length}`;
    }
});
