let quizz;
let selectedQuizz;
buscarquizz();

function buscarquizz(){
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(dadosVoltou);
}
function dadosVoltou(resposta){
console.log("Os dados chegaram!");
console.log(resposta);
quizz = resposta.data;
renderizarquizzes(resposta);
}

function renderizarquizzes(resposta){
const getquizzes = document.querySelector(".quizzes");   
console.log(resposta);
const qzz = resposta.data.length;
for(let i=0; qzz>i; i++){
    const title = (resposta.data[i].title);
    const image = (resposta.data[i].image);
    const box = document.createElement("div");
    box.className = "caixinha"
    let quizz = `
    <div class="img"><img  class="img" src="${image}" alt="">
    <div class="texto"><p>${title}</p></div></div>
    `;
     box.innerHTML = quizz;
     box.addEventListener("click",function(){
        tela2(i)
     });
     getquizzes.appendChild(box);
    }
}

 function tela2(index){
  selectedQuizz= quizz[index];
  const conteudo = document.querySelector(".conteudo");    
  conteudo.classList.add("hidden");
  const tela2element = document.querySelector(".tela2"); 
  tela2element.classList.remove("hidden");
  const telaBox = document.querySelector(".tela-box");
  telaBox.innerHTML = ` <p>${selectedQuizz.title} </p>   `;
 }