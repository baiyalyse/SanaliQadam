let data = JSON.parse(localStorage.getItem("weekSave")) || [];

const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

const list = document.getElementById("list");
const totalBox = document.getElementById("total");
const advice = document.getElementById("advice");

function render() {
    list.innerHTML = "";

    let total = 0;
    let badCount = 0;

    data.forEach((item, i) => {
        total += item.amount;
        if (!item.ok) badCount++;

        const div = document.createElement("div");
        div.className = "card save-item";

        div.innerHTML = `
            <div class="save-row">
                <div>
                    <b>${item.name}</b><br>
                    <small>${item.amount} ₸</small>
                </div>

                <button class="check-btn ${item.ok ? "active" : ""}" onclick="toggle(${i})">
                    ${item.ok ? "✅" : "❌"}
                </button>
            </div>
        `;

        list.appendChild(div);
    });

    totalBox.textContent = total + " ₸";

    // анализ
    if (badCount > 5) {
        advice.textContent = "⚠️ Көп импульсивті шығын. Өзін-өзі бақылау әлсіз.";
    } else if (badCount > 2) {
        advice.textContent = "📊 Орташа деңгей. Кей шығындарды қысқартуға болады.";
    } else {
        advice.textContent = "🔥 Жақсы! Сен бақылауды ұстап тұрсың.";
    }

    localStorage.setItem("weekSave", JSON.stringify(data));
}

function toggle(index) {
    data[index].ok = !data[index].ok;
    render();
}

addBtn.addEventListener("click", () => {
    if (!nameInput.value || !amountInput.value) return;

    data.push({
        name: nameInput.value,
        amount: Number(amountInput.value),
        ok: false
    });

    nameInput.value = "";
    amountInput.value = "";

    render();
});

render();