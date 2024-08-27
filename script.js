const levels = [
    {
        mainImage: 'suomi.avif',
        mainSound: 'mika.mp3',
        options: [
            { image: 'kuva1.avif', sound: 'aani1.mp3' },
            { image: 'kuva2.avif', sound: 'aani2.mp3' },
            { image: 'kuva3.avif', sound: 'aani3.mp3' },
            { image: 'kuva4.avif', sound: 'aani4.mp3' },
            { image: 'kuva5.avif', sound: 'aani5.mp3' }
        ],
        correctOption: 'kuva1.avif'
    },
    {
        mainImage: 'ruotsi.avif',
        mainSound: 'mika.mp3',
        options: [
            { image: 'kuva1.avif', sound: 'aani1.mp3' },
            { image: 'kuva2.avif', sound: 'aani2.mp3' },
            { image: 'kuva3.avif', sound: 'aani3.mp3' },
            { image: 'kuva4.avif', sound: 'aani4.mp3' },
            { image: 'kuva5.avif', sound: 'aani5.mp3' }
        ],
        correctOption: 'kuva2.avif'
    },
    {
        mainImage: 'norja.avif',
        mainSound: 'mika.mp3',
        options: [
            { image: 'kuva1.avif', sound: 'aani1.mp3' },
            { image: 'kuva2.avif', sound: 'aani2.mp3' },
            { image: 'kuva3.avif', sound: 'aani3.mp3' },
            { image: 'kuva4.avif', sound: 'aani4.mp3' },
            { image: 'kuva5.avif', sound: 'aani5.mp3' }
        ],
        correctOption: 'kuva3.avif'
    },
    {
        mainImage: 'viro.avif',
        mainSound: 'mika.mp3',
        options: [
            { image: 'kuva1.avif', sound: 'aani1.mp3' },
            { image: 'kuva2.avif', sound: 'aani2.mp3' },
            { image: 'kuva3.avif', sound: 'aani3.mp3' },
            { image: 'kuva4.avif', sound: 'aani4.mp3' },
            { image: 'kuva5.avif', sound: 'aani5.mp3' }
        ],
        correctOption: 'kuva4.avif'
    },
    {
        mainImage: 'venaja.avif',
        mainSound: 'mika.mp3',
        options: [
            { image: 'kuva1.avif', sound: 'aani1.mp3' },
            { image: 'kuva2.avif', sound: 'aani2.mp3' },
            { image: 'kuva3.avif', sound: 'aani3.mp3' },
            { image: 'kuva4.avif', sound: 'aani4.mp3' },
            { image: 'kuva5.avif', sound: 'aani5.mp3' }
        ],
        correctOption: 'kuva5.avif'
    }
];

let currentQuestions = [];
let currentQuestion = 0;
let selectedOption = 0;
let correctAnswers = 0;
let checkButtonClicked = false;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('star-area').style.visibility = 'visible';
    document.getElementById('stars-container').style.visibility = 'visible';
    currentQuestions = getRandomQuestions(5);
    loadQuestion();
}

function getRandomQuestions(count) {
    return [...levels].sort(() => 0.5 - Math.random()).slice(0, count);
}

function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    
    document.getElementById('paakuva').src = question.mainImage;
    
    // Sekoita vaihtoehdot
    const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
    
    for (let i = 1; i <= 5; i++) {
        const optionElement = document.getElementById(`option${i}`);
        optionElement.src = shuffledOptions[i-1].image;
        optionElement.dataset.sound = shuffledOptions[i-1].sound;
    }

    document.getElementById('check-button').style.display = 'block';
    document.getElementById('next-arrow').style.display = 'none';
    checkButtonClicked = false;

    playAudio('main');
}

function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
        optionElement.classList.remove('selected');
    });
    document.getElementById(`option${option}`).classList.add('selected');
    playAudio(option.toString());
}

function checkAnswer() {
    if (checkButtonClicked) return;
    
    checkButtonClicked = true;
    const question = currentQuestions[currentQuestion];
    const selectedImage = document.getElementById(`option${selectedOption}`).src;
    if (selectedImage.includes(question.correctOption)) {
        document.getElementById(`option${selectedOption}`).classList.add('correct');
        correctAnswers++;
        updateStars();
        playAudio('oikein');
    } else {
        document.getElementById(`option${selectedOption}`).classList.add('incorrect');
        document.querySelector(`[src*="${question.correctOption}"]`).classList.add('correct');
        playAudio('vaarin');
    }
    
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-arrow').style.display = 'block';
}

function updateStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    for (let i = 0; i < correctAnswers; i++) {
        const starImg = document.createElement('img');
        starImg.src = 'tahti.avif';
        starImg.alt = 'tähti';
        starImg.className = 'star-icon';
        starsContainer.appendChild(starImg);
    }
}

function nextQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    currentQuestion++;
    if (currentQuestion >= currentQuestions.length) {
        showResult();
    } else {
        selectedOption = 0;
        loadQuestion();
    }
}

function showResult() {
    let starsHtml = '';
    for (let i = 0; i < correctAnswers; i++) {
        starsHtml += '<img src="tahti.avif" alt="tähti" class="star-icon">';
    }
    
    document.getElementById('question-container').innerHTML = `
        <p id="result">SAIT ${correctAnswers} / ${currentQuestions.length} OIKEIN</p>
        <div id="final-stars-container">${starsHtml}</div>
        <button onclick="restartGame()" style="background-color: transparent; color: black; border: 2px solid black; margin-top: 20px;">PELAA UUDELLEEN</button>
    `;
    document.getElementById('star-area').style.display = 'none';
}

function restartGame() {   
    currentQuestion = 0;
    selectedOption = 0;
    correctAnswers = 0;
    checkButtonClicked = false;
    currentQuestions = getRandomQuestions(5);
    
    document.getElementById('question-container').innerHTML = `
        <h1>MIKÄ MAA TÄMÄ ON:</h1>
        <img id="paakuva" src="" alt="Pääkuva" class="main-image">
        <div class="options">
            <img id="option1" class="option" onclick="selectOption(1)" alt="Vaihtoehto 1">
            <img id="option2" class="option" onclick="selectOption(2)" alt="Vaihtoehto 2">
            <img id="option3" class="option" onclick="selectOption(3)" alt="Vaihtoehto 3">
            <img id="option4" class="option" onclick="selectOption(4)" alt="Vaihtoehto 4">
            <img id="option5" class="option" onclick="selectOption(5)" alt="Vaihtoehto 5">
        </div>
        <div id="game-controls">
            <button id="check-button" onclick="checkAnswer()">TARKISTA</button>
            <img id="next-arrow" src="nuoli.avif" onclick="nextQuestion()" style="display: none;" alt="Seuraava kysymys">
        </div>
    `;
    
    document.getElementById('stars-container').innerHTML = '';
    document.getElementById('star-area').style.display = 'block';
    document.getElementById('stars-container').style.visibility = 'visible';
    
    loadQuestion();
}

function playAudio(type) {
    let audio;
    if (type === 'main') {
        audio = new Audio(currentQuestions[currentQuestion].mainSound);
    } else if (type === 'oikein') {
        audio = new Audio('oikein.mp3');
    } else if (type === 'vaarin') {
        audio = new Audio('vaarin.mp3');
    } else {
        const optionElement = document.getElementById(`option${type}`);
        audio = new Audio(optionElement.dataset.sound);
    }
    audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && document.getElementById('next-arrow').style.display !== 'none') {
            nextQuestion();
        }
    });
});