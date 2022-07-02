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
    const renderQuestions = document.querySelector(".create-questions")
    //CRIAR PERGUNTA 1 COM OS INPUTS NA TELA
    renderQuestions.innerHTML +=`
    <p>Pergunta 1</p>
    <div class="questions-box">
        <input class="question-text" type="text" placeholder="Texto da pergunta" />
        <input class="question-color" type="color" placeholder="Cor de fundo da pergunta" />
    </div>
    <p>Resposta correta</p>
    <div class="right-ansewer-box">
        <input class="ansewer-text" type="text" placeholder="Resposta correta"  />
        <input class="url-ansewer" type="url" placeholder="URl da imagem" />
    </div>
    <p>Respostas incorretas</p>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 1"/>
        <input class="url-ansewer" type="url" placeholder="URl da imagem 1" />
    </div>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 2"/>
        <input class="url-ansewer" type="url" placeholder="URl da imagem 2" />
    </div>
    <div class="wrong-ansewer">
        <input class="ansewer-text" type="text" placeholder="Resposta incorreta 3"/>
        <input class="url-ansewer" type="url" placeholder="URl da imagem 3" />
    </div>`;
    
    //LAÇO PARA CRIAR AS QUESTÕES QUE ESTÃO COM INPUTS OCULTOS
    for (let i = 0; i < (quizzObject.questions - 1); i++) {
        renderQuestions.innerHTML += `
            <div class="nextQuestion" data-identifier="expand">
                <div class="newQuestion">
                    <p>Pergunta ${i+2}</p>
                    <ion-icon name="create-outline" onclick="editQuestion(this)"></ion-icon>
                </div>
            
            <div class = "hiddenNewQuestions escondido">
                <div class="questions-box">
                    <input class="question-text" type="text" placeholder="Texto da pergunta" />
                    <input class="question-color" type="color" placeholder="Cor de fundo da pergunta" />
                </div>
                <p  class="">Resposta correta</p>
                <div class="right-ansewer-box">
                    <input class="ansewer-text" type="text" placeholder="Resposta correta"  />
                    <input class="url-ansewer" type="url" placeholder="URl da imagem" />
                </div>
                <p class="">Respostas incorretas</p>
                <div class="wrong-ansewer">
                    <input class="ansewer-text" type="text" placeholder="Resposta incorreta 1"/>
                    <input class="url-ansewer" type="url" placeholder="URl da imagem 1" />
                </div>
                <div class="wrong-ansewer">
                    <input class="ansewer-text" type="text" placeholder="Resposta incorreta 2"/>
                    <input class="url-ansewer" type="url" placeholder="URl da imagem 2" />
                </div>
                <div class="wrong-ansewer">
                    <input class="ansewer-text" type="text" placeholder="Resposta incorreta 3"/>
                    <input class="url-ansewer" type="url" placeholder="URl da imagem 3" />
                </div>
                </div>
            </div>`;
    }
	
    renderQuestions.innerHTML += `
        <button onclick="goToPage3Quizz()">Prosseguir pra criar níveis</button>`;   
}

//MONSTRAR QUESTÕES AO CLICAR NO BOTÃO DE EDITAR
function editQuestion(question) {
    const divAvo = question.parentNode.parentNode;
    const divEscondida = divAvo.childNodes;
    divEscondida[3].scrollIntoView();
    divEscondida[3].classList.remove("escondido")
    //question.querySelector(".hiddenNewQuestions").classList.remove("escondido");
}

