const items = document.querySelectorAll(".fade");

function show() {
    items.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", show);
show();


// ONLINE (живой диапазон)
const online = document.getElementById("online");
let current = 24;

setInterval(() => {
    let change = Math.floor(Math.random() * 5) - 2;
    current += change;

    if (current < 18) current = 18;
    if (current > 32) current = 32;

    online.textContent = current;
}, 3000);


// QR
const qr = document.getElementById("qr");
let qrValue = 309;

setInterval(() => {
    qrValue += Math.random() * 0.5;
    qr.textContent = Math.floor(qrValue);
}, 5000);


// STUDENTS
const students = document.getElementById("students");

let s = 0;
let interval = setInterval(() => {
    s++;
    students.textContent = s;
    if (s >= 288) clearInterval(interval);
}, 15);