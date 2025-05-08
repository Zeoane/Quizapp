let questions = [
{ 
    "question": "Wer hat HTML erfunden?",
    "answer_1": "Robbie Williams",
    "answer_2": "Adele",
    "answer_3": "Tim Berners-Lee",
    "answer_4": "Asterix",
    "right_answer": 3
    },
{ 
    "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
    "answer_1": "Text Fett",
    "answer_2": "Container",
    "answer_3": "Ein Link",
    "answer_4": "Kursiv",
    "right_answer": 3
    },
{ 
    "question": "Wie bindet man eine Website in eine Website ein?",
    "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;framesel&gt;",
    "answer_2": "&lt;iframe&gt;",
    "answer_3": "&lt;frame&gt;",
    "answer_4": "&lt;iframeset&gt;",
    "right_answer": 2
    },
{ 
    "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
    "answer_1": "readonly",
    "answer_2": "max",
    "answer_3": "from",
    "answer_4": "spellcheck",
    "right_answer": 1
    },
{ 
    "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
    "answer_1": "a[title]{...}",
    "answer_2": "a > title {...};",
    "answer_3": "a.title {...}",
    "answer_4": "a=title {...}",
    "right_answer": 1
    },
{ 
    "question": "Wie definiert man in JavaScript eine Variable?",
    "answer_1": "let 100 = rate;",
    "answer_2": "100 = let rate;",
    "answer_3": "rate = 100",
    "answer_4": "let rate = 100",
    "right_answer": 4
    },
];

let currentQuestion = 0;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];

    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('next-btn').disabled = true;


    for (let i = 1; i <= 4; i++) {
        let answerCard = document.getElementById(`answer_${i}`).parentNode;
        answerCard.classList.remove('bg-success', 'bg-danger');
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-btn').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
       
    } else {
        alert("Quiz beendet!");
    }
}

let rightAnswers = 0;

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    let isCorrect = selectedQuestionNumber == question['right_answer'];

    if (isCorrect) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-btn').disabled = false;
    updateProgressBar();
}

function updateProgressBar() {
    let percent = (rightAnswers / questions.length) * 100;
    let bar = document.getElementById('progress-bar');
    bar.style.width = `${percent}%`;
    bar.setAttribute('aria-valuenow', percent.toFixed(0));
    bar.innerHTML = `${Math.round(percent)}%`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let percent = Math.round((rightAnswers / questions.length) * 100);
    let emoji = "🟢"; // Standardgrün

    if (percent === 100) emoji = "🏆";
    else if (percent >= 80) emoji = "🎉";
    else if (percent >= 50) emoji = "👍";
    else emoji = "📘";

    let resultMessage = `${emoji} Du hast das Quiz mit ${percent}% richtig beantwortet.\n\nDanke fürs Mitmachen!`;
    document.getElementById('resultText').innerText = resultMessage;

    let modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();
}

function restartQuiz() {
    currentQuestion = 0;
    rightAnswers = 0;
    updateProgressBar();
    showQuestion();
    let modal = bootstrap.Modal.getInstance(document.getElementById('resultModal'));
    modal.hide();
}

