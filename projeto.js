let quizz;
let selectedQuizz;
buscarquizz();

function buscarquizz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promessa.then(dadosVoltou);
}
function dadosVoltou(resposta) {
    console.log("Os dados chegaram!");
    console.log(resposta);
    quizz = resposta.data;
    renderizarquizzes(resposta);
}

function renderizarquizzes(resposta) {
    const getquizzes = document.querySelector(".quizzes");
    console.log(resposta);
    const qzz = resposta.data.length;
    for (let i = 0; qzz > i; i++) {
        const title = (resposta.data[i].title);
        const image = (resposta.data[i].image);
        const box = document.createElement("div");
        box.className = "caixinha"
        let quizz = `
    <div class="img"><img  class="img" src="${image}" alt="">
    <div class="texto"><p>${title}</p></div></div>
    `;
        box.innerHTML = quizz;
        box.addEventListener("click", function () {
            tela2(i)
        });
        getquizzes.appendChild(box);
    }
}
// window.scroll(0,findPos(document.getElementById("myDiv")));
function tela2(index) {
    selectedQuizz = quizz[index];
    const conteudo = document.querySelector(".conteudo");
    conteudo.classList.add("hidden");
    const tela2element = document.querySelector(".tela2");
    tela2element.classList.remove("hidden");
    const telaBox = document.querySelector(".tela-box");
    const caixaImg = document.querySelector(".imgtela2");
    caixaImg.innerHTML = `<div class="imgtela2"><div class="img1"><img  class="img1" src="${selectedQuizz.image}" alt=""></div>
  <p class="textoquizz">${selectedQuizz.title}</p></div>`;
  console.log(selectedQuizz.questions);
}
