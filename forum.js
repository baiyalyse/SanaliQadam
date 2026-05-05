const postInput = document.getElementById("postInput");
const postBtn = document.getElementById("postBtn");
const postsContainer = document.getElementById("posts");

// стартовые посты
let posts = JSON.parse(localStorage.getItem("posts")) || [
    { text: "Бүгін бюджет жазып көрдім, ақша қайда кететінін түсіндім 😅", likes: 3 },
    { text: "Тест 6/10 шықты, әлі көп жұмыс бар екен.", likes: 5 },
    { text: "Челлендж: 1 сағат телефонсыз отыру қиын екен 😭", likes: 7 },
    { text: "Импульсивті сатып алуды тоқтаттым, реально ақша қалады.", likes: 4 },
    { text: "Ақша табу оңай емес, бірақ жоспар болса бәрі өзгереді.", likes: 6 },
    { text: "Осындай форум керек еді, идея күшті 🔥", likes: 8 },
    { text: "20 минут кітап оқыдым, ми тыныштала бастады.", likes: 2 },
    { text: "Менің мақсатым — жай ақша емес, еркіндік.", likes: 10 },
    { text: "TikTok азайттым, концентрация жақсарды.", likes: 5 },
    { text: "Ақша жинау әдістері бар ма? кеңес беріңдер.", likes: 3 }
];

// render
function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
        const div = document.createElement("div");
        div.className = "card forum-post";

        div.innerHTML = `
            <p>${post.text}</p>

            <div class="post-actions">
                <button onclick="likePost(${index})">
                    👍 ${post.likes}
                </button>
            </div>
        `;

        postsContainer.appendChild(div);
    });

    localStorage.setItem("posts", JSON.stringify(posts));
}

// add post
function addPost() {
    const text = postInput.value.trim();
    if (!text) return;

    posts.unshift({
        text,
        likes: 0
    });

    postInput.value = "";
    renderPosts();
}

// like
function likePost(index) {
    posts[index].likes++;
    renderPosts();
}

// events
postBtn.addEventListener("click", addPost);

// init
renderPosts();