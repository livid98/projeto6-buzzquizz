//botão criar Quizz - redireciona pra pagina criar quizz
function createQuizz() {
    document.querySelector(".conteudo").classList.add("hidden") 
    document.querySelector(".seusquizzes").classList.add("hidden")
    document.querySelector(".quizzes").classList.add("hidden")
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
        <p class="stylePergunta">Pergunta ${1}</p>
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
                    <p class="newQuestionPergunta">Pergunta ${i+2}</p>
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

    //CHECAR DADOS COLOCADOS NA SEGUNDA PÁGINA
    //O método forEach() executa uma dada função em cada elemento de um array.
    quizzObject.questions.forEach((question) => {
        let Y = 0;
        if (counterQuestionItens.length == 0 && !(question.title.length > 19) && !(question.title.length < 66)) {
            alert("Os titulos das questões devem ter entre 20 e 65 caracteres");
            quizzObject.questions = [];
            counterQuestionItens.length++;}

        else if (counterQuestionItens.quantityAnsewerItens == 0 && (question.answersList.length < 2)) {
            alert("Você deve colocar no mínimo uma resposta certa e uma errada");
            quizzObject.questions = [];
            counterQuestionItens.quantityAnsewerItens++;}
            

        question.answersList.forEach((answer) => {
            if (counterQuestionItens.isUrl == 0 && (answer.image == undefined || !(checkUrl(answer.image)))) {
                alert("A imagem deve ser em quizzObjectato de link url");
                quizzObject.questions = [];
                counterQuestionItens.isUrl++;}
            
            else if (counterQuestionItens.isAnswerEmpty == 0 && (answer.text == "")) {
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


    // COLOCAR QUESTÕES DENTRO DO OBJETO DAS PERGUNTAS E RESPOSTAS DO QUIZZ
    for (let x = 0; x < quantityQuizz.questions; x++) {
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


            else if (x==1 || x ==2 || x==3 || x == 4 || x == 5 || x==6 || x ==7 || x==8 || x == 9 || x == 10 || x==11 || x ==12 || x==13 || x == 14 || x == 15){
            let tituloPergunta = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[1].childNodes[1];
            questionObject.title = tituloPergunta.value;
            let corDaPergunga = document.getElementById(`questionNumber${x+1}`).childNodes[1].childNodes[3].childNodes[1].childNodes[3];
            questionObject.color = corDaPergunga.value;

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
        
        for (let i = 0; i < (quantityQuizz.levels); i++) {
        renderCreateLevel.innerHTML +=`
        <div id="numberLevel${i+1}" class="organizeLevelmore">
            <div class ="namelevel organizeLevel">
                <p>Nível ${i+1}</p>
                <ion-icon name="create-outline" onclick="editlevel(this, 'level${i+1}')"></ion-icon>
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
function editlevel(elemento){

    const divAvo = elemento.parentNode.parentNode;
    const divEscondida = divAvo.childNodes;
    divEscondida[3].scrollIntoView();
    divEscondida[3].classList.remove("escondido");
}

//CAPTURAR DADOS COLOCADOS NOS LEVEIS
/*
    Para o level 0;
        let LevelName = document.getElementById(`level${l}`).childNodes[3].value;
        let PercentualMedia = document.getElementById(`level${l}`).childNodes[5].value;
        let ImageLevelItem = document.getElementById(`level${l}`).childNodes[7].value;
        let LevelDescription = document.getElementById(`level${l}`).childNodes[9].value;


    Para leveis acima do lvl 0;
        LevelName = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[1].value;
        PercentualMedia = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[3].value;
        ImageLevelItem = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[5].value;
        LevelDescription = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[7].value;
*/

    function finishQuizz() {
        let testLevel = { length: 0, porcentLevel: 0, imgLevelItem: 0, textDescriptionCaracter: 0, levelzero: 0};
        for (let l = 1; l <= quantityQuizz.levels; l++) {
            let levelObject = { title: null, image: null, text: null, porcentLevel: null};
    
            levelObject.title = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[1].value;
            levelObject.porcentLevel = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[3].value;
            levelObject.image = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[5].value;
            levelObject.text = document.getElementById(`numberLevel${l}`).childNodes[3].childNodes[7].value;
    
            quizzObject.levels.push(levelObject);
        }
    
        quizzObject.levels.forEach((level) => {
            if (testLevel.length === 0 && level.title.length < 10) {
                alert("O titulo do nível deve no mínimo 10 caracteres");
                quizzObject.levels = [];
                testLevel.length++;}

            if ((level.porcentLevel < 0) || (level.porcentLevel > 100) || (level.porcentLevel === '') && testLevel.porcentLevel === 0) {
                alert("Os niveis devem variar entre 0 e 100");
                quizzObject.levels = [];
                testLevel.porcentLevel++;
            }
            if (!(checkUrl(level.image)) && testLevel.imgLevelItem === 0) {
                alert("A imagem deve ser em formato link URL");
                quizzObject.levels = [];
                testLevel.imgLevelItem++;
                
            }
            if (level.text.length < 30 && testLevel.textDescriptionCaracter === 0) {
                alert("A descrição de cada nível deve ter no mínimo 30 caracteres");
                quizzObject.levels = [];
                testLevel.textDescriptionCaracter++;
                
            }
            if (!level.porcentLevel.includes(0) && testLevel.levelzero == 0) {
                alert("Deve existir o nível 0, para quem n acerta nada");
                quizzObject.levels = [];
                testLevel.levelzero++;
            }
        })
        if (quizzObject.levels.length !== 0) {
            finalizeQuizzCreation();
        }
    
    }

function finalizeQuizzCreation() {
    //essa função tem que retirar tela 3 de quizz da tela, colocar tela 4 de quizz
    //enviar pro servidor o objeto do quizz
    sendQuizzToServer(quizzObject);
    document.querySelector(".create-quizz-page3").classList.add("escondido");
    document.querySelector(".create-quizz-page4").classList.remove("escondido");
    document.querySelector(".imgquizzfinalizado").innerHTML +=`
    <img src="${quizzObject.image}" alt="">`;
   
}

function goToHome(){
    document.querySelector(".create-quizz-page").classList.add("escondido");
    document.querySelector(".conteudo").classList.remove("hidden");
    document.querySelector(".seusquizzes").classList.remove("hidden");
    document.querySelector(".quizzes").classList.remove("hidden");
}

function sendQuizzToServer(quizzCreated) {
	axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzCreated)
		.then(response => {
			let IDUsuario = JSON.stringify(quizzCreated)
			localStorage.setItem(response.data.id.toString(), IDUsuario)
			let key = "3kl" + response.data.id.toString()
			localStorage.setItem(key, response.data.key.toString())
		})
}
