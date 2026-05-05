const questions = [
    {
        question: "1. Ақша деген не?",
        options: [
            "Тек қағаз бен металл",
            "Құрал және айырбас құралы",
            "Ойын-сауық"
        ],
        answer: 1
    },
    {
        question: "2. Үнемдеу не үшін керек?",
        options: [
            "Кейін керек болатын ақша сақтау үшін",
            "Достарға көрсету үшін",
            "Сән үшін"
        ],
        answer: 0
    },
    {
        question: "3. Қажетсіз шығынға не жатады?",
        options: [
            "Алдын ала жоспарланған сатып алу",
            "Импульсивті, ойланбай жасалған сатып алу",
            "Жинақ шоты"
        ],
        answer: 1
    },
    {
        question: "4. Бюджет деген не?",
        options: [
            "Кіріс пен шығынды жоспарлау",
            "Тек табыс табу",
            "Тек ақша жұмсау"
        ],
        answer: 0
    },
    {
        question: "5. Қаржылық тәртіп деген не?",
        options: [
            "Ақшаны кез келген жерге жұмсау",
            "Ақшаны бақылап, жоспармен пайдалану",
            "Ақша туралы ойламау"
        ],
        answer: 1
    },
    {
        question: "6. Жинақтың мақсаты қандай?",
        options: [
            "Тек бір күнге жету",
            "Кейінгі мақсаттар мен қауіпсіздік үшін",
            "Телефонға тексеру үшін"
        ],
        answer: 1
    },
    {
        question: "7. Кредитке қалай қараған дұрыс?",
        options: [
            "Оны әрқашан алу керек",
            "Түсініп, қажет болса ғана қолдану керек",
            "Мүлде ойламау керек"
        ],
        answer: 1
    },
    {
        question: "8. Ақшаны басқаруда ең маңыздысы не?",
        options: [
            "Сәттілік",
            "Жоспар және бақылау",
            "Жылдам жұмсау"
        ],
        answer: 1
    },
    {
        question: "9. Қаржылық сауат не береді?",
        options: [
            "Тек көп ақша",
            "Ақшаға дұрыс шешім қабылдау қабілеті",
            "Көбірек қарыз"
        ],
        answer: 1
    },
    {
        question: "10. Дұрыс қаржылық мінезге қайсысы жатады?",
        options: [
            "Барлығын бірден жұмсау",
            "Кіріс, шығын, мақсатты бақылау",
            "Тек армандау"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = new Array(questions.length).fill(null);
let locked = new Array(questions.length).fill(false);

const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");
const liveScore = document.getElementById("liveScore");
const questionCount = document.getElementById("questionCount");
const answeredCount = document.getElementById("answeredCount");
const progressFill = document.getElementById("progressFill");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

function renderQuestion() {
    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    optionsBox.innerHTML = "";

    questionCount.textContent = `Сұрақ ${currentQuestion + 1} / ${questions.length}`;

    const answeredTotal = answered.filter(v => v !== null).length;
    answeredCount.textContent = `Жауап берілді: ${answeredTotal}`;

    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";

        if (answered[currentQuestion] === index) {
            btn.classList.add("selected");
        }

        if (locked[currentQuestion]) {
            if (index === q.answer) btn.classList.add("correct");
            if (answered[currentQuestion] === index && index !== q.answer) btn.classList.add("wrong");
        }

        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(index));
        optionsBox.appendChild(btn);
    });

    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === questions.length - 1 ? "none" : "inline-flex";
    finishBtn.style.display = currentQuestion === questions.length - 1 ? "inline-flex" : "none";

    liveScore.textContent = `${score} / ${questions.length}`;
}

function selectAnswer(index) {
    if (locked[currentQuestion]) return;

    const q = questions[currentQuestion];
    answered[currentQuestion] = index;
    locked[currentQuestion] = true;

    if (index === q.answer) {
        score++;
    }

    renderQuestion();
}

function goNext() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    }
}

function goPrev() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function finishTest() {
    const answeredTotal = answered.filter(v => v !== null).length;

    quizCard.style.display = "none";
    resultCard.style.display = "block";

    let level = "";
    let message = "";

    const percent = Math.round((score / questions.length) * 100);

    if (percent >= 90) {
        level = "Өте мықты";
        message = "Сенің қаржылық базаң өте жақсы. Бірақ тоқтама, жүйені одан әрі күшейт.";
    } else if (percent >= 70) {
        level = "Жақсы деңгей";
        message = "Базаң жаман емес. Кей жерлерді нақтылап, тәжірибемен бекіту керек.";
    } else if (percent >= 50) {
        level = "Орташа деңгей";
        message = "Негіз бар, бірақ ойлау мен тәртіпті күшейту керек. Әлі жұмыс көп.";
    } else {
        level = "Әлсіз база";
        message = "Саған теорияны ғана емес, жүйелі практика керек. Дәл қазір бастау керек.";
    }

    resultCard.innerHTML = `
        <h2>Нәтиже</h2>
        <div class="result-score">${score} / ${questions.length}</div>
        <p class="result-percent">${percent}%</p>
        <p class="result-level">${level}</p>
        <p class="result-text">${message}</p>
        <p class="result-small">Жауап берілген сұрақтар: ${answeredTotal} / ${questions.length}</p>

        <div class="result-actions">
            <button id="retryBtn" class="quiz-btn primary">Қайта тапсыру</button>
        </div>
    `;

    document.getElementById("retryBtn").addEventListener("click", resetTest);
}

function resetTest() {
    currentQuestion = 0;
    score = 0;
    answered = new Array(questions.length).fill(null);
    locked = new Array(questions.length).fill(false);

    resultCard.style.display = "none";
    quizCard.style.display = "block";
    renderQuestion();
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);
finishBtn.addEventListener("click", finishTest);

renderQuestion();