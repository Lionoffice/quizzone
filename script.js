const quizzes = {
    science: [
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correct: 2,
            explanation: "Gold's chemical symbol is Au, derived from the Latin word 'aurum' meaning gold."
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correct: 1,
            explanation: "Mars is called the Red Planet because of its reddish appearance, caused by iron oxide on its surface."
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2,
            explanation: "Diamond is the hardest known natural material, scoring 10 on the Mohs scale of mineral hardness."
        },
        {
            question: "How many bones are in the adult human body?",
            options: ["186", "206", "226", "246"],
            correct: 1,
            explanation: "Adults have 206 bones. Babies are born with around 270, but many fuse together as they grow."
        },
        {
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Liver", "Brain", "Skin"],
            correct: 3,
            explanation: "The skin is the largest organ, covering about 2 square meters and accounting for about 16% of body weight."
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1944", "1945", "1946"],
            correct: 2,
            explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
        },
        {
            question: "Who was the first President of the United States?",
            options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
            correct: 2,
            explanation: "George Washington served as the first U.S. President from 1789 to 1797."
        },
        {
            question: "The Great Wall of China was primarily built to protect against invasions from which direction?",
            options: ["South", "East", "West", "North"],
            correct: 3,
            explanation: "The Great Wall was built to protect against invasions from northern nomadic tribes."
        },
        {
            question: "Which ancient civilization built the Machu Picchu complex?",
            options: ["Aztec", "Maya", "Inca", "Olmec"],
            correct: 2,
            explanation: "The Inca civilization built Machu Picchu in the 15th century high in the Andes Mountains."
        },
        {
            question: "In which year did the Titanic sink?",
            options: ["1910", "1912", "1914", "1916"],
            correct: 1,
            explanation: "The RMS Titanic sank on April 15, 1912, after hitting an iceberg on its maiden voyage."
        }
    ],
    geography: [
        {
            question: "What is the largest country in the world by land area?",
            options: ["China", "United States", "Canada", "Russia"],
            correct: 3,
            explanation: "Russia is the largest country, covering over 17 million square kilometers."
        },
        {
            question: "Which river is the longest in the world?",
            options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correct: 1,
            explanation: "The Nile River is approximately 6,650 km long, flowing through northeastern Africa."
        },
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correct: 2,
            explanation: "Canberra is the capital of Australia, chosen as a compromise between Sydney and Melbourne."
        },
        {
            question: "Mount Everest is located in which mountain range?",
            options: ["Alps", "Andes", "Himalayas", "Rockies"],
            correct: 2,
            explanation: "Mount Everest is part of the Himalayas, on the border between Nepal and China."
        },
        {
            question: "Which continent has the most countries?",
            options: ["Asia", "Europe", "Africa", "South America"],
            correct: 2,
            explanation: "Africa has 54 recognized sovereign countries, the most of any continent."
        }
    ],
    general: [
        {
            question: "What is the currency of Japan?",
            options: ["Yuan", "Won", "Yen", "Ringgit"],
            correct: 2,
            explanation: "The Japanese Yen (JPY) is the official currency of Japan."
        },
        {
            question: "How many players are on a standard soccer team on the field?",
            options: ["9", "10", "11", "12"],
            correct: 2,
            explanation: "A standard soccer team has 11 players on the field at a time."
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic", "Indian", "Arctic", "Pacific"],
            correct: 3,
            explanation: "The Pacific Ocean is the largest and deepest ocean, covering about 63 million square miles."
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
            correct: 1,
            explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century."
        },
        {
            question: "What is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correct: 2,
            explanation: "2 is the smallest prime number. A prime number is greater than 1 and only divisible by 1 and itself."
        }
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

function startQuiz(category) {
    currentQuiz = [...quizzes[category]];
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="progress">Question 1 of ${currentQuiz.length}</div>
                <div class="score">Score: 0</div>
            </div>
            <div class="question">${currentQuiz[0].question}</div>
            <div class="options" id="options"></div>
            <div class="explanation" id="explanation"></div>
            <div class="quiz-buttons">
                <button class="quiz-button next-button" id="nextBtn" onclick="nextQuestion()" disabled>Next</button>
            </div>
        </div>
    `;
    
    renderOptions();
}

function renderOptions() {
    const optionsContainer = document.getElementById('options');
    const currentQuestion = currentQuiz[currentQuestionIndex];
    
    optionsContainer.innerHTML = currentQuestion.options.map((option, index) => `
        <div class="option" onclick="selectAnswer(${index})" data-index="${index}">${option}</div>
    `).join('');
}

function selectAnswer(index) {
    if (selectedAnswer !== null) return;
    
    selectedAnswer = index;
    const currentQuestion = currentQuiz[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === currentQuestion.correct) {
            option.classList.add('correct');
        } else if (i === index && index !== currentQuestion.correct) {
            option.classList.add('incorrect');
        }
    });
    
    if (index === currentQuestion.correct) {
        score++;
        document.querySelector('.score').textContent = `Score: ${score}`;
    }
    
    const explanation = document.getElementById('explanation');
    explanation.innerHTML = `<strong>${index === currentQuestion.correct ? 'Correct!' : 'Incorrect!'}</strong><br><br>${currentQuestion.explanation}`;
    explanation.classList.add('show');
    
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswer = null;
    
    if (currentQuestionIndex >= currentQuiz.length) {
        showResults();
        return;
    }
    
    const main = document.querySelector('main');
    const currentQuestion = currentQuiz[currentQuestionIndex];
    
    main.innerHTML = `
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="progress">Question ${currentQuestionIndex + 1} of ${currentQuiz.length}</div>
                <div class="score">Score: ${score}</div>
            </div>
            <div class="question">${currentQuestion.question}</div>
            <div class="options" id="options"></div>
            <div class="explanation" id="explanation"></div>
            <div class="quiz-buttons">
                <button class="quiz-button next-button" id="nextBtn" onclick="nextQuestion()" disabled>Next</button>
            </div>
        </div>
    `;
    
    renderOptions();
}

function showResults() {
    const percentage = Math.round((score / currentQuiz.length) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = "Perfect score! You're a quiz master! 🏆";
    } else if (percentage >= 80) {
        message = "Excellent work! You really know your stuff! 🌟";
    } else if (percentage >= 60) {
        message = "Good job! Keep learning and improving! 📚";
    } else if (percentage >= 40) {
        message = "Not bad! There's always room to learn more! 💪";
    } else {
        message = "Keep practicing! Every mistake is a learning opportunity! 🎯";
    }
    
    const main = document.querySelector('main');
    main.innerHTML = `
        <div class="results-container">
            <h1>Quiz Complete!</h1>
            <div class="final-score">${score}/${currentQuiz.length}</div>
            <div class="score-message">${message}</div>
            <a href="index.html" class="results-button">Back to Home</a>
            <a href="javascript:location.reload()" class="results-button">Try Again</a>
        </div>
    `;
}