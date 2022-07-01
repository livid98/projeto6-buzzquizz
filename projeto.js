let quizz;
buscarquizz();
//BUSCAR QUIZZES EXISTENTES NA API
function buscarquizz(){
const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
promessa.then(dadosVoltou);
}
//INFORMAR QUE OS DADOS CHEGARAM
function dadosVoltou(resposta){
console.log("Os dados chegaram!");
console.log(resposta);
quizz = resposta.data;
renderizarquizzes(resposta);
}
//FUNÇÃO PARA RENDERIZAR OS QUIZZES NA TELA INICIAL
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

//CASO O USUÁRIO RESPONDA CORRETAMENTE, A PÁGINA DE CRIAR PERGUNTAS SERÁ ABERTA
function createQuestions(){
    document.querySelector(".create-quizz-page1").classList.add("escondido");
    document.querySelector(".create-quizz-page2").classList.remove("escondido");
    const renderQuestion1 = document.querySelector(".create-questions")
    renderQuestion1.innerHTML +=`
    <p>Pergunta 1</p>
    <div class="questions-box">
        <input class="question-text" type="text" placeholder="Texto da pergunta" />
        <input class="question-color" type="color" placeholder="Cor de fundo da pergunta" />
    </div>
    <p>Resposta correta</p>
    <div class="right-ansewer-box">
        <input class="ansewer-text" type="text" placeholder="Resposta correta"  />
        <input class="url-resposta" type="url" placeholder="URl da imagem" />
    </div>
    <p>Respostas incorretas</p>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 1"/>
        <input class="url-resposta" type="url" placeholder="URl da imagem 1" />
    </div>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 2"/>
        <input class="url-resposta" type="url" placeholder="URl da imagem 2" />
    </div>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 3"/>
        <input class="url-resposta" type="url" placeholder="URl da imagem 3" />
    </div>
    `

    renderNextQuestions = document.querySelector(".clickNextQuestion")
    for (let i = 0; i < (quizzObject.questions); i++){
        alert (quizzObject.questions);
        renderNextQuestions.innerHTML += ` 
            <div class="nextQuestion"><p class="question-text">Pergunta ${i + 2}</p>
            <ion-icon name="create-outline" class="editButton" onclick="nextQuestion(this, 'question-${i + 1}')"></ion-icon></div>
            <div class="questions-box">
                <input id="question-text" placeholder="Texto da pergunta"></input>
                <input id="question-color" placeholder="Cor de fundo da pergunta"></input>
            </div>
            <p>Resposta correta</p>
            <div class="right-ansewer-box">
            <input class="ansewer-text" type="text" placeholder="Resposta correta"  />
            <input class="url-resposta" type="url" placeholder="URl da imagem" /></div>
            
            `


        for (let j = 0; j < 4; j++) {
            let answerPosition = document.querySelector(`.question-${i + 1}`);
            if (j === 0) {
                answerPosition.innerHTML += `
            <div>
                <input id="question-answer-${j + 1}" placeholder="Resposta Correta"></input>
                <input id="question-url-${j + 1}" placeholder="URL da imagem"></input>
            </div>
            `
            }
            else {
                answerPosition.innerHTML += `
            <div>
                <input id="question-answer-${j + 1}" placeholder="Resposta Incorreta"></input>
                <input id="question-url-${j + 1}" placeholder="URL da imagem"></input>
            </div>
            `
            }
        }
    }

}
// FUNÇÃO EDITAR PERGUNTAS ESCONDIDA
