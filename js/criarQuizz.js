//botão criar Quizz - redireciona pra pagina criar quizz
function createQuizz() {
    document.querySelector(".conteudo").style.display = "none"; // Seleciona classe .conteudo e adiciona "Display: none" no css
    document.querySelector(".seusquizzes").style.display = "none";
    document.querySelector(".quizzes").style.display = "none";
    document.querySelector(".create-quizz-page").classList.remove("escondido");
    document.querySelector(".create-quizz-page1").classList.remove("escondido");
    // remove a classe "escondido" que estava junto com a classe .create-quizz-page1
}

// ------------------------ CHECAR DADOS COLOCADOS NA PRIMEIRA PÁGINA ------------------------ \\
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
let quantityQuizz = {questions: 0, levels: 0}

function goToPage2Quizz() {
    quizzObject.title = document.querySelector(".create-quizz-page1 input:first-child").value;
    quizzObject.image = document.querySelector(".create-quizz-page1 input:nth-child(2)").value;
    quantityQuizz.questions = document.querySelector(".create-quizz-page1 input:nth-child(3)").value;
    quantityQuizz.levels = document.querySelector(".create-quizz-page1 input:nth-child(4)").value;

    if ((quizzObject.title.length > 19 && quizzObject.title.length < 66) && 
        (checkUrl(quizzObject.image)) && (quantityQuizz.questions > 2) && (quantityQuizz.levels > 1)) {
        createQuestions();}//Se os requisitos estiverem certos, vai chamar a função de criar perguntas
    
    //Caso algum dos parametros não estiverem certos, vai aparecer um alert
    if (!(quizzObject.title.length > 19 && quizzObject.title.length < 66)) {
        alert("Titudo do Quizz deve ter entre 20 e 65 caracteres");}

    else if (!(checkUrl(quizzObject.image))) {
        alert("Isso não é um link de imagem");}

    else if (!(quantityQuizz.questions > 2)) {
        alert("O Quizz deve ter no mínimo 3 perguntas");}

    else if (!(quantityQuizz.levels > 1)) {
        alert("O Quizz deve ter no mínimo 2 níveis");}  
}

//----------------------------------------------- CRIAR PERGUNTAS ----------------------------------------------- \\
//CASO O USUÁRIO RESPONDA CORRETAMENTE, A PÁGINA DE CRIAR PERGUNTAS SERÁ ABERTA
function createQuestions(){
    document.querySelector(".create-quizz-page1").classList.add("escondido");
    document.querySelector(".create-quizz-page2").classList.remove("escondido");
    const renderQuestions = document.querySelector(".create-questions")
    //CRIAR PERGUNTA 1 COM OS INPUTS NA TELA
    renderQuestions.innerHTML +=`
    <div id="questionNumber${1}" data-identifier="question">
        <p>Pergunta ${1}</p>
        <div class="questions-box">
            <input class="question-text" type="text" placeholder="Texto da pergunta" />
            <input class="question-color" type="color" placeholder="Cor de fundo da pergunta" />
        </div>
        <p>Resposta correta</p>
        <div class="right-answer-box" id="question-answer${1}">
            <input class="answer-text" type="text" placeholder="Resposta correta"  />
            <input class="url-answer" type="url" placeholder="URl da imagem" />
        </div>
        <p>Respostas incorretas</p>
        <div class="wrong-answer" id="question-answer${2}">
            <input class="answer-text" type="text" placeholder="Resposta incorreta 1"/>
            <input class="url-answer" type="url" placeholder="URl da imagem 1" />
        </div>
        <div class="wrong-answer" id="question-answer${3}">
            <input class="answer-text" type="text" placeholder="Resposta incorreta 2"/>
            <input class="url-answer" type="url" placeholder="URl da imagem 2" />
        </div>
        <div class="wrong-answer" id="question-answer${4}">
            <input class="answer-text" type="text" placeholder="Resposta incorreta 3"/>
            <input class="url-answer" type="url" placeholder="URl da imagem 3" />
        </div>
    </div>`
    ;
    
    //LAÇO PARA CRIAR AS QUESTÕES QUE ESTÃO COM INPUTS OCULTOS
    for (let i = 0; i < (quantityQuizz.questions - 1); i++) {
        renderQuestions.innerHTML += `
        <div id = "questionNumber${i+2}" data-identifier="question">
            <div class="nextQuestion" data-identifier="expand">
                <div class="newQuestion">
                    <p>Pergunta ${i+2}</p>
                    <ion-icon name="create-outline" onclick="editQuestion(this,'questionNumber${i+2}')"></ion-icon>
                </div>
            
            <div class = "hiddenNewQuestions escondido">
                <div class="questions-box">
                    <input class="question-text" type="text" placeholder="Texto da pergunta" />
                    <input class="question-color" type="color" placeholder="Cor de fundo da pergunta" />
                </div>
                <p  class="">Resposta correta</p>
                <div class="right-answer-box" id="question-answer${1}">
                    <input class="answer-text right-answer-box" type="text" placeholder="Resposta correta"  />
                    <input class="url-answer right-answer-box" type="url" placeholder="URl da imagem" />
                </div>
                <p class="">Respostas incorretas</p>
                <div class="wrong-answer" id="question-answer${2}">
                    <input class="answer-text wrong-answer" type="text" placeholder="Resposta incorreta 1"/>
                    <input class="url-answer wrong-answer" type="url" placeholder="URl da imagem 1" />
                </div>
                <div class="wrong-answer" id="question-answer${3}">
                    <input class="answer-text wrong-answer" type="text" placeholder="Resposta incorreta 2"/>
                    <input class="url-answer wrong-answer" type="url" placeholder="URl da imagem 2" />
                </div>
                <div class="wrong-answer" id="question-answer${4}">
                    <input class="answer-text wrong-answer" type="text" placeholder="Resposta incorreta 3"/>
                    <input class="url-answer wrong-answer" type="url" placeholder="URl da imagem 3" />
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
    divEscondida[3].classList.remove("escondido");
}
//----------------------------------------- ELEMENTOS ------------------------------------------- \\

/*
        //resposta correta
        RespostaCorreta = document.getElementById(`questionNumber${1}`).childNodes[7].childNodes[1].value;
        LinkRespostaCorreta = document.getElementById(`questionNumber${1}`).childNodes[7].childNodes[3].value;
        answerObject.text = RespostaCorreta
        answerObject.image = LinkRespostaCorreta
        
        //resposta errada 1
        RespostaIncorreta1 = document.getElementById(`questionNumber${1}`).childNodes[11].childNodes[1].value;
        LinkRespostaIncorreta1 = document.getElementById(`questionNumber${1}`).childNodes[11].childNodes[3].value;
        answerObject.text = RespostaIncorreta1;
        answerObject.image = LinkRespostaIncorreta1;
        
        
        //resposta errada 2
        RespostaIncorreta2 = document.getElementById(`questionNumber${1}`).childNodes[13].childNodes[1].value;
        LinkRespostaIncorreta2 = document.getElementById(`questionNumber${1}`).childNodes[13].childNodes[3].value;
        answerObject.text = RespostaIncorreta2;
        answerObject.image = LinkRespostaIncorreta2;
        
        //resposta errada 3
        RespostaIncorreta3 = document.getElementById(`questionNumber${1}`).childNodes[15].childNodes[1].value;
        LinkRespostaIncorreta3 = document.getElementById(`questionNumber${1}`).childNodes[15].childNodes[3].value;
        answerObject.text = RespostaIncorreta3;
        answerObject.image = LinkRespostaIncorreta3;
*/

//------------------------------------------------------------------------------------------------------\\

//----------------------------------------- CHECAR QUESTOÕES ------------------------------------------- \\

    function goToPage3Quizz() {
    let counterQuestionItens = {length: 0, color: 0, quantityAnsewerItens: 0, isAnswerEmpty: 0, isUrl: 0, isTrue: 0};

    for (let x = 0; x < quantityQuizz.questions; x++) {
        console.log(x)
        let questionObject = {title: '', color: '', answersList: []};
        //Respostas das questões 1 estão em divs filhas diferentes das demais questões
        if(x == 0){
            let tituloPergunta = document.getElementById(`questionNumber${x+1}`).childNodes[3].childNodes[1];
            questionObject.title = tituloPergunta.value;
            let corDaPergunga = document.getElementById(`questionNumber${x+1}`).childNodes[3].childNodes[3]
            questionObject.color = corDaPergunga.value;

            let RespostaCorreta = document.getElementById(`questionNumber${x+1}`).childNodes[7].childNodes[1].value;
            let LinkRespostaCorreta = document.getElementById(`questionNumber${x+1}`).childNodes[7].childNodes[3].value;

            let RespostaIncorreta1 = document.getElementById(`questionNumber${x+1}`).childNodes[11].childNodes[1].value;
            let LinkRespostaIncorreta1 = document.getElementById(`questionNumber${x+1}`).childNodes[11].childNodes[3].value;

            let RespostaIncorreta2 = document.getElementById(`questionNumber${x+1}`).childNodes[13].childNodes[1].value;
            let LinkRespostaIncorreta2 = document.getElementById(`questionNumber${x+1}`).childNodes[13].childNodes[3].value;

            let RespostaIncorreta3 = document.getElementById(`questionNumber${x+1}`).childNodes[15].childNodes[1].value;
            let LinkRespostaIncorreta3 = document.getElementById(`questionNumber${x+1}`).childNodes[15].childNodes[3].value;
            
            for (let z = 0; z < 4; z++) {
                let answerObject = {text: '', image: '', isCorrectAnswer: ''};

                if (z == 0) {
                    answerObject.text = RespostaCorreta
                    answerObject.image = LinkRespostaCorreta
                    answerObject.isCorrectAnswer = true;
                }
                else if (z == 1) {
                    answerObject.text = RespostaIncorreta1;
                    answerObject.image = LinkRespostaIncorreta1;
                    answerObject.isCorrectAnswer = false;
                }
                else if (z == 2) {
                    answerObject.text = RespostaIncorreta2;
                    answerObject.image = LinkRespostaIncorreta2;
                    answerObject.isCorrectAnswer = false;
                }
                else if (z == 3) {
                    answerObject.text = RespostaIncorreta3;
                    answerObject.image = LinkRespostaIncorreta3;
                    answerObject.isCorrectAnswer = false;
                }

                if (answerObject.image) {
                    questionObject.answersList.push(answerObject);
                }
            }}


            else if (x==1 || x ==2 || x==3){
            let tituloPergunta = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[1].childNodes[1];
            questionObject.title = tituloPergunta.value;
            let corDaPergunga = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[1].childNodes[3];
            questionObject.color = corDaPergunga.value;
                console.log(questionObject.title)

            let RespostaCorreta = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[5].childNodes[1].value;
            let LinkRespostaCorreta = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[5].childNodes[3].value;

            let RespostaIncorreta1 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[9].childNodes[1].value
            let LinkRespostaIncorreta1 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[9].childNodes[3].value

            let RespostaIncorreta2 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[11].childNodes[1].value;
            let LinkRespostaIncorreta2 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[11].childNodes[3].value;

            let RespostaIncorreta3 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[13].childNodes[1].value;
            let LinkRespostaIncorreta3 = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[13].childNodes[3].value;
            
            for (let z = 0; z < 4; z++) {
                let answerObject = {text: '', image: '', isCorrectAnswer: ''};

                if (z == 0) {
                    answerObject.text = RespostaCorreta
                    answerObject.image = LinkRespostaCorreta
                    answerObject.isCorrectAnswer = true;
                }
                else if (z == 1) {
                    answerObject.text = RespostaIncorreta1;
                    answerObject.image = LinkRespostaIncorreta1;
                    answerObject.isCorrectAnswer = false;
                }
                else if (z == 2) {
                    answerObject.text = RespostaIncorreta2;
                    answerObject.image = LinkRespostaIncorreta2;
                    answerObject.isCorrectAnswer = false;
                }
                else if (z == 3) {
                    answerObject.text = RespostaIncorreta3;
                    answerObject.image = LinkRespostaIncorreta3;
                    answerObject.isCorrectAnswer = false;
                }

                if (answerObject.image) {
                    questionObject.answersList.push(answerObject);
                }
            }
        }
        quizzObject.questions.push(questionObject);
    }

    //O método forEach() executa uma dada função em cada elemento de um array.
    quizzObject.questions.forEach((question) => {
        let Y = 0;
        if (counterQuestionItens.length == 0 && !(question.title.length > 19) && !(question.title.length < 66)) {
            alert("Os titulos das questões devem ter entre 20 e 65 caracteres");
            quizzObject.questions = [];
            counterQuestionItens.length++;}

        else if (question.answersList.length < 2 && counterQuestionItens.quantityAnsewerItens == 0) {
            alert("Você deve colocar no mínimo uma resposta certa e uma errada");
            quizzObject.questions = [];
            counterQuestionItens.quantityAnsewerItens++;}
            

        question.answersList.forEach((answer) => {
            if ((!(checkUrl(answer.image)) || answer.image == undefined) && counterQuestionItens.isUrl == 0) {
                alert("A imagem deve ser em formato de link url");
                quizzObject.questions = [];
                counterQuestionItens.isUrl++;}
            
            else if ((answer.text == "") && counterQuestionItens.isAnswerEmpty == 0) {
                alert("Não pode haver questões sem texto");
                quizzObject.questions = [];
                counterQuestionItens.isAnswerEmpty++;}

            else if (answer.isCorrectAnswer === true) {Y++;}
         });
        
        if ((Y == 0) && counterQuestionItens.isTrue == 0) {
            alert("Todas as questões devem ter uma resposta correta");
            counterQuestionItens.isTrue++;
            quizzObject.questions = [];
        }
    });
    if (quizzObject.questions.length !== 0) {
        createLevels();
    }
}

//----------------------------------------------- NIVEIS ----------------------------------------------- \\
//MOSTRARA PAGINA DE CRIAR NÍVEIS
function createLevels(){
    document.querySelector(".create-quizz-page2").classList.add("escondido");
    const renderCreateLevel = document.querySelector(".create-quizz-page3")
    renderCreateLevel.classList.remove("escondido");
    renderCreateLevel.innerHTML += `
        <p>Agora, decida os níveis!</p>
        <div class="level">
            <p>Nível 1</p>
            <input class="level-name" placeholder="Título do nível" type="text" />
            <input class="media" placeholder="% de acerto mínima" type="number" />
            <input class="url-image-level" placeholder="URL da imagem do nível" type="url" />
            <input class="text-description-level" placeholder="Descrição do nível" type="text" />
        </div>`;
        
        for (let i = 0; i < (quizzObject.levels - 1); i++) {
        renderCreateLevel.innerHTML +=`
        <div class="newLevel">
            <div class ="numberLevel">
                <p>Nível ${i+2}</p>
                <ion-icon name="create-outline" onclick="editlevel(this)"></ion-icon>
            </div>
            <div class="inputsLevelHidden escondido">
                <input class="level-name" placeholder="Título do nível" type="text" />
                <input class="media" placeholder="% de acerto mínima" type="number" />
                <input class="url-image-level" placeholder="URL da imagem do nível" type="url" />
                <input class="text-description-level" placeholder="Descrição do nível" type="text" />
            </div>  
        </div>`;
        }
        renderCreateLevel.innerHTML +=`
        <button class="finish-quizz" onclick="finishQuizz()">Finalizar Quizz</button>`;
}
//EXPANDIR AO CLICAR NO BOTÃO DE EDITAR LEVEL
function editlevel(level){
    const divAvo = level.parentNode.parentNode;
    const divEscondida = divAvo.childNodes;
    divEscondida[3].scrollIntoView();
    divEscondida[3].classList.remove("escondido");

}


// ------------------------ CHECAR DADOS COLOCADOS NA SEGUNDA PÁGINA ------------------------ \\

