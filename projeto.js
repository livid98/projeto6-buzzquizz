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
function goToPage2Quizz() {
    quizzObject.title = document.querySelector(".quizz-data .quizz-title").value;
    quizzObject.image = document.querySelector(".quizz-data .url-quizz)").value;
    quantity.questions = document.querySelector(".quizz-data .questions-quantity").value;
    quantity.levels = document.querySelector(".quizz-data .level-quantity").value;

    if ((quizzObject.title.length > 19 && quizzObject.title.length < 66) && 
        (checkUrl(quizzObject.image)) && (quantity.questions > 2) && (quantity.levels > 1)) {
        createQuestions();}

    if (!(quizzObject.title.length >= 20 && form.title.length <= 65)) {
        alert("Titudo do Quizz deve ter entre 20 e 65 caracteres");}

    else if (!(checkUrl(quizzObject.image))) {
        alert("Isso não é um link de imagem");}

    else if (quantity.questions < 3) {
        alert("O Quizz deve ter no mínimo 3 perguntas");}

    else if (quantity.levels < 2) {
        alert("O Quizz deve ter no mínimo 2 níveis");}  
}

function createQuestions(){}