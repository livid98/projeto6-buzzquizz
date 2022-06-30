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
    document.querySelector(".conteudo").style.display = "none"; // Seleciona classe .conteudo e adiciona "Display: none" no css
    document.querySelector(".seusquizzes").style.display = "none";
    document.querySelector(".quizzes").style.display = "none";
    document.querySelector(".create-quizz-page1").classList.remove("escondido");
    // remove a classe "escondido" que estava junto com a classe .create-quizz-page1
}

//TESTAR SE FOI RECEBIDO UM LINK NA IMAGEM
function checkUrl(str){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);  
}
//CHECAR SE OS DADOS RECEBIDOS ESTÃO COM VALORES CERTOS, SALVAR E DIRECIONAR PARA A PRÓXIMA MÁGINA
let quizzObject = {title: null, image: null, questions: [], levels: []};

function goToPage2Quizz() {
    quizzObject.title = document.querySelector(".create-quizz-page1 input:first-child").value;
    quizzObject.image = document.querySelector(".create-quizz-page1 input:nth-child(2)").value;
    quizzObject.questions = document.querySelector(".create-quizz-page1 input:nth-child(3)").value;
    quizzObject.levels = document.querySelector(".create-quizz-page1 input:nth-child(4)").value;

    if ((quizzObject.title.length > 19 && quizzObject.title.length < 66) && 
        (checkUrl(quizzObject.image)) && (quizzObject.questions > 2) && (quizzObject.levels > 1)) {
        createQuestions();}//Se os requisitos estiverem certos, vai chamar a função de criar perguntas
    
    //Caso algum dos parametros não estiverem certos, vai aparecer um alert
    if (!(quizzObject.title.length > 19 && quizzObject.title.length < 66)) {
        alert("Titudo do Quizz deve ter entre 20 e 65 caracteres");}

    else if (!(checkUrl(quizzObject.image))) {
        alert("Isso não é um link de imagem");}

    else if (!(quizzObject.questions > 2)) {
        alert("O Quizz deve ter no mínimo 3 perguntas");}

    else if (!(quizzObject.levels > 1)) {
        alert("O Quizz deve ter no mínimo 2 níveis");}  
}

function createQuestions(){
    alert("funcionou");
}
