import { reservas } from "../constantes/reservas.js";

let dadosReserva = [...reservas]

document.getElementById('logout').addEventListener('click', () => {
    window.location.href = "index.html"
})

function gerarLinhasTabela() {
    dadosReserva.map((reserva) => {
        const tr = document.createElement('tr')

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
    const filtrados = dadosReserva.filter(item => item.id !== id)
    document.getElementById('corpo-tabela').innerHTML = ''
    dadosReserva = filtrados

    filtrados.map((reserva) => {
        const tr = document.createElement('tr')

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


window.onload = gerarLinhasTabela