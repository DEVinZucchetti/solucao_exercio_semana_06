let dadosReserva = []

document.getElementById('logout').addEventListener('click', () => {
    window.location.href = "index.html"
})

function gerarLinhasTabela(filteredData) {
    // const currentData = filteredData?.length > 0 ? filteredData : dadosReserva - desafio

    const currentData = dadosReserva

    currentData.map((reserva) => {
        const tr = document.createElement('tr')
        tr.setAttribute('id', reserva.id)

        const tdNumeroQuarto = document.createElement('td')
        tdNumeroQuarto.innerHTML = reserva.numero_quarto
        tr.appendChild(tdNumeroQuarto)

        const tdNomeCliente = document.createElement('td')
        tdNomeCliente.innerHTML = reserva.nome_cliente
        tr.appendChild(tdNomeCliente)

        const tdCpfCliente = document.createElement('td')
        tdCpfCliente.innerHTML = reserva.cpf
        tr.appendChild(tdCpfCliente)

        const tdData = document.createElement('td')
        tdData.innerHTML = reserva.data_entrada + '-' + reserva.data_saida
        // tdData.innerHTML = `${reserva.data_entrada} - ${reserva.data_saida}` // interpolação
        tr.appendChild(tdData)

        const tdAcoes = document.createElement('td')

        const botaoDeletar = document.createElement('button')
        botaoDeletar.innerText = 'Deletar'

        botaoDeletar.addEventListener('click', () => deletarItem(reserva.id))

        tdAcoes.appendChild(botaoDeletar)

        tr.appendChild(tdAcoes)

        document.getElementById('corpo-tabela').appendChild(tr)
    })
}

function deletarItem(id) {

    fetch(`http://localhost:3000/reservas/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        alert("deletado com sucesso")
        // - pegar toda lista novamente
        document.getElementById('corpo-tabela').innerHTML = ''
        pegarListaReservas()
        // document.getElementById(id).remove()
    })
    .catch(() => alert("Erro ao deletar a reserva"))
}

function pegarListaReservas() {
    fetch("http://localhost:3000/reservas")
        .then((response) => {
            if (response.ok === false) {
                throw new Error()
            }
            return response.json()
        })
        .then((dados) => {
            dadosReserva = dados
            gerarLinhasTabela()
        })
        .catch((error) => {
            console.log(error)
            alert("Falha ao tentar listar as reservas")
        })
}

window.onload = pegarListaReservas

/* ----------------------------------- SOLUCAO DESAFIO -------------------------------------------------------- */

let final_transcript = "";

// Configuração do reconhecimento
let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = 'pt-BR'

speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }

    if (interim_transcript === 'resetar') {
        document.getElementById('corpo-tabela').innerHTML = ''
        gerarLinhasTabela(dadosReserva)
    } else {
        let filteredData = dadosReserva.filter(item => item.numero_quarto.toString() === interim_transcript)
        if (filteredData.length > 0) {
            document.getElementById('corpo-tabela').innerHTML = ''
            gerarLinhasTabela(filteredData)
        }
        interim_transcript = ""
    }
};

let espacoPressionado = false;
let espacoIntervalo;

// Função para ser chamada enquanto a tecla Espaço estiver pressionada
function segurarEspaco() {
    // Implemente o código que deseja executar enquanto a tecla Espaço estiver pressionada
    if (espacoPressionado) {
        speechRecognition.start();
    }
    console.log("Segurando a tecla Espaço...");
}

// Função para lidar com o evento de pressionar uma tecla
function keyDownHandler(event) {
    if (event.keyCode === 32) {
        if (!espacoPressionado) {
            espacoPressionado = true;
            segurarEspaco();
        }
    }
}

// Função para lidar com o evento de liberar uma tecla
function keyUpHandler(event) {
    if (event.keyCode === 32) {
        if (espacoPressionado) {
            espacoPressionado = false;
            speechRecognition.stop();
            clearInterval(espacoIntervalo);
        }
    }
}

// Adiciona os event listeners para os eventos de pressionar e liberar teclas
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);



