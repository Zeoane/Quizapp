// Original-Fragen (bleibt unverändert)
const originalQuestions = [
    {
        question: "Wer hat HTML erfunden?",
        answer_1: "Robbie Williams",
        answer_2: "Adele",
        answer_3: "Tim Berners-Lee",
        answer_4: "Asterix",
        right_answer: 3,
    },
    {
        question: "Was bedeutet das HTML Tag <a>?",
        answer_1: "Text Fett",
        answer_2: "Container",
        answer_3: "Ein Link",
        answer_4: "Kursiv",
        right_answer: 3,
    },
    {
        question: "Wie bindet man eine Website in eine Website ein?",
        answer_1: "<iframe>, <frame>, and <frameset>",
        answer_2: "<iframe>",
        answer_3: "<frame>",
        answer_4: "<iframeset>",
        right_answer: 2,
    },
    {
        question: "Welches Attribut kann man NICHT für Textarea verwenden?",
        answer_1: "readonly",
        answer_2: "max",
        answer_3: "from",
        answer_4: "spellcheck",
        right_answer: 3,
    },  
    {
        question: "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
        answer_1: "a[title]{...}",
        answer_2: "a title {...};",
        answer_3: "a.title {...}",
        answer_4: "a=title {...}",
        right_answer: 1,
    },
    {
        question: "Wie definiert man in JavaScript eine Variable?",
        answer_1: "let 100 = rate;",
        answer_2: "100 = let rate;",
        answer_3: "rate = 100",
        answer_4: "let rate = 100",
        right_answer: 4,
    },
];

let questions = []; // Dynamische Kopie (gemischt)
let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('Audio/success.mp3');
let AUDIO_FAIL = new Audio('Audio/fail.mp3');


// Hilfsfunktion: Array mischen
function shuffleArray(array) {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Quiz initialisieren
function init() {
    questions = shuffleArray([...originalQuestions]);
    document.getElementById('all-questions').innerText = questions.length;
    showQuestion();
}

// Frage anzeigen
function showQuestion() {
    const question = questions[currentQuestion];

    document.getElementById('questiontext').textContent = question.question;
    document.getElementById('current-question').innerText = currentQuestion + 1;

    for (let i = 1; i <= 4; i++) {
        const answerEl = document.getElementById(`answer_${i}`);
        answerEl.textContent = question[`answer_${i}`];
        answerEl.parentNode.classList.remove('bg-success', 'bg-danger');
    }

    document.getElementById('next-btn').disabled = true;
    updateNextButton();
}

// Antwort prüfen
function handleAnswerFeedback(selection) {
    const question = questions[currentQuestion];
    const selectedQuestionNumber = selection.slice(-1);
    const rightAnswerId = `answer_${question.right_answer}`;

    if (selectedQuestionNumber == question.right_answer) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightAnswers++;
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(rightAnswerId).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
}

function answer(selection) {
    handleAnswerFeedback(selection);

    document.getElementById('next-btn').disabled = false;

    if (currentQuestion === questions.length - 1) {
        const btn = document.getElementById('next-btn');
        btn.textContent = "Ergebnis anzeigen";
    }

    updateProgressBar();
}


// Fortschrittsbalken aktualisieren
function updateProgressBar() {
    const percent = (rightAnswers / questions.length) * 100;
    const bar = document.getElementById('progress-bar');
    bar.style.width = `${percent}%`;
    bar.setAttribute('aria-valuenow', percent.toFixed(0));
    bar.innerHTML = `${Math.round(percent)}%`;
}

// Nächste Frage oder Ergebnis anzeigen
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}  

// Ergebnis anzeigen
function getResultIcon(percent) {
    if (percent === 100) {
        return { iconClass: "bi-trophy-fill", iconColor: "#ffc107" };
    } else if (percent >= 80) {
        return { iconClass: "bi-star-fill", iconColor: "#198754" };
    } else if (percent >= 50) {
        return { iconClass: "bi-hand-thumbs-up-fill", iconColor: "#0d6efd" };
    } else {
        return { iconClass: "bi-emoji-frown", iconColor: "#dc3545" };
    }
}

function generateResultHTML(percent, iconClass, iconColor) {
    return `
        <i class="bi ${iconClass}" style="font-size: 3rem; color: ${iconColor};"></i>
        <p class="mt-3">Du hast das Quiz mit <strong>${percent}%</strong> richtig beantwortet.</p>
        <p>Danke fürs Mitmachen!</p>
        <button class="btn btn-outline-primary mt-3" onclick="restartQuiz()">Quiz neu starten</button>
    `;
}

function showResult() {
    const percent = Math.round((rightAnswers / questions.length) * 100);
    const { iconClass, iconColor } = getResultIcon(percent);
    const resultHTML = generateResultHTML(percent, iconClass, iconColor);

    document.getElementById('resultText').innerHTML = resultHTML;

    const modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();
}

// Endabfrage nach jeder Frage
function updateNextButton() {
    const nextBtn = document.getElementById("next-btn"); 
    if (!nextBtn) return; 

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Ergebnis anzeigen";
    } else {
        nextBtn.textContent = "Nächste Frage";
    }
}

// Quiz neu starten
function restartQuiz() {
    currentQuestion = 0;
    rightAnswers = 0;
    questions = shuffleArray([...originalQuestions]);
    updateProgressBar();
    showQuestion();

    const modal = bootstrap.Modal.getInstance(document.getElementById('resultModal'));
    modal.hide();
}
