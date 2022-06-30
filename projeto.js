let quizz;
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
    let quizz = `<div class= "caixinha">
    <div class="img"><img class="img" src="${image}" alt="">
    <div class="texto"><p>${title}</p></div></div>
    </div>`;
     getquizzes.innerHTML = getquizzes.innerHTML + quizz;
    }
}

//botão criar Quizz - redireciona pra pagina criar quizz
function createQuizz() {
    document.querySelector(".conteudo").style.display = "none";
    document.querySelector(".seusquizzes").style.display = "none";
    document.querySelector(".quizzes").style.display = "none";
    document.querySelector(".create-quizz-page1").classList.remove("escondido");
    
}