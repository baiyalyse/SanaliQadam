let days = JSON.parse(localStorage.getItem("impulseDays")) || [
    false,false,false,false,false,false,false
];

const tracker = document.getElementById("tracker");
const scoreBox = document.getElementById("score");
const fill = document.getElementById("fill");

const nextWeekBtn = document.getElementById("nextWeek");
const resetBtn = document.getElementById("resetWeek");

function render() {
    tracker.innerHTML = "";

    let score = 0;

    days.forEach((done, i) => {
        if (done) score++;

        const row = document.createElement("div");
        row.className = "impulse-row";

        row.innerHTML = `
            <div>Күн ${i + 1}</div>

            <button class="check-btn ${done ? "active" : ""}" onclick="toggle(${i})">
                ${done ? "Бас тарттым" : "Бас тартпадым"}
            </button>
        `;

        tracker.appendChild(row);
    });

    scoreBox.textContent = score;
    fill.style.width = (score / 7) * 100 + "%";

    localStorage.setItem("impulseDays", JSON.stringify(days));
}

function toggle(i) {
    days[i] = !days[i];
    render();
}

// 🔥 КЕЛЕСІ АПТА
nextWeekBtn.addEventListener("click", () => {
    days = [false,false,false,false,false,false,false];
    render();
});

// 🧹 ТАЗАЛАУ
resetBtn.addEventListener("click", () => {
    days = [false,false,false,false,false,false,false];
    localStorage.removeItem("impulseDays");
    render();
});

render();