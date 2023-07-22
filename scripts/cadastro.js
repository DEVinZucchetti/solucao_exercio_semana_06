const campoNumeroQuarto = document.getElementById('n-quarto')
const campoNomeCliente = document.getElementById('nome')
const campoCpfCliente = document.getElementById('cpf')
const campoDataEntrada = document.getElementById('datain')
const campoDataSaida = document.getElementById('dataout')

document.getElementById('form-add').addEventListener('submit', cadastrarReserva)

function cadastrarReserva(event) {
    event.preventDefault()

    const numero = campoNumeroQuarto.value
    const nome = campoNomeCliente.value
    const cpf = campoCpfCliente.value
    const dataEntrada = campoDataEntrada.value
    const dataSaida = campoDataSaida.value

    if (!numero || !nome || !cpf || !dataEntrada || !dataSaida) {
        alert("Preencha todos os campos")
    } else {
        // 1 - URL da api
        // 2 - informar o método
        // 3 - informar o corpo da requisição
        // 4 - Colocar JSON.stringify
        // 5 - Colocar o headers
        // 6 - Implementar o cenário feliz - .then 
        // 7 - Implementar o cenário infeliz - .catch

        fetch('http://localhost:3000/reservas', {
            method: 'POST',
            body: JSON.stringify({
                numero_quarto: numero,
                nome_cliente: nome,
                cpf: cpf,
                data_entrada: dataEntrada,
                data_saida: dataSaida
            }),
            headers: {
                'Accept': 'applicantion/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok === false) {
                    throw new Error()
                }
                return response.json()
            })
            .then(() => {
                console.log("entrei aqui no then")
                alert('Cadastrado com sucesso')

                campoNumeroQuarto.value = ""
                campoNomeCliente.value = ""
                campoCpfCliente.value = ""
                campoDataEntrada.value = ""
                campoDataSaida.value = ""

                window.history.href = "home.html"
            })
            .catch((error) => {
                console.log(error)
                alert("Falha ao tentar cadastrar a reserva")
            })
    }
}
