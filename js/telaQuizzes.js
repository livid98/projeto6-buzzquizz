let quizz;
let selectedQuizz;
buscarquizz();

function buscarquizz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
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
    const caixaquestions = document.querySelector(".caixaperguntas");
    const numperguntas = selectedQuizz.questions.length;
    console.log(numperguntas);
    caixaquestions.innerHTML = "";
    let questionNumber = 0;
    for (let item of selectedQuizz.questions) {
        const questionBox =
            `<div class="pergunta" style="background-color:${item.color}">${item.title}</div>`;
   const elem = document.createElement("div");
   elem.innerHTML = questionBox;
   elem.className = "caixapergunta";
   let answerNumber = 0;
   elem.id=`q-${questionNumber}`;
   for(let answer of item.answers){
   const answerElement = document.createElement("div");
   answerElement.innerHTML = ` <img width="280px" height="110px"   src="${answer.image}" alt="" srcset="">
   <p class="resposta">${answer.text}</p>`;
   answerElement.className = "caixinhaimg";
   answerElement.id=`q-${questionNumber}-a-${answerNumber}`;
   answerElement.addEventListener("click",function(){
    respostaAction(answerElement.id)
   })
   elem.appendChild(answerElement);
   answerNumber++;
   }
   caixaquestions.appendChild(elem);
   questionNumber++;
    }
}
const respondidas = [];

function respostaAction(id){
    const q = Number(id.split("-")[1]);
    const resposta = `q-${q}`
    if(!respondidas.includes(resposta)){
        console.log(id.split("-"));
        
        const a = Number (id.split("-")[3]);
        for(let i=0; i<selectedQuizz.questions[q].answers.length; i++){
            if(i!=a){
                document.getElementById(`q-${q}-a-${i}`).classList.add("not-selected")
               
            }
        }
        respondidas.push(resposta);    
    }
}