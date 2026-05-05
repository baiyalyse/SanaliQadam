const challenges = [
    "📵 1 сағат телефон қолданба. Сол уақытта кітап оқы немесе ойлан.",
    "💰 Бүгін ешқандай импульсивті сатып алу жасама.",
    "🧠 20 минут қаржылық видео көріп, 3 нәрсе жазып ал.",
    "🏃‍♂️ 20 минут жаттығу жаса (жүріс те болады).",
    "📓 Бүгінгі шығындарыңды жазып шық.",
    "🚫 TikTok / Instagram-ды 2 сағатқа өшір.",
    "💡 Бір жаңа қаржылық термин үйрен.",
    "🧾 1 күндік бюджет жаса (ақша жоспарлау).",
    "🔥 Өзіңе қиын 1 тапсырма жасап көр (comfort zone).",
    "📖 10 бет кітап оқы (немесе 15 мин)."
];

const text = document.getElementById("challengeText");
const btn = document.getElementById("newChallenge");

function getRandomChallenge() {
    const index = Math.floor(Math.random() * challenges.length);
    text.classList.remove("show");
    
    setTimeout(() => {
        text.textContent = challenges[index];
        text.classList.add("show");
    }, 150);
}

// initial
getRandomChallenge();

btn.addEventListener("click", getRandomChallenge);