import { usuarios } from '../constantes/usuarios.js'

document.addEventListener('submit', (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    if (!email || !senha) {
        alert("Os campos obrigatórios")
    } else {
        const usuarioEncontrado = usuarios.find(
            usuario =>
                usuario.email === email && usuario.senha === senha
        )

        if(usuarioEncontrado) {  
             window.location.href = "home.html"
            // redireciona usuario
        } else {
            alert("Usuário não encontrado")
        }
    }
})