function obterData() {
    const dataAtual = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    let dataFormatada = dataAtual.toLocaleDateString('pt-BR', options)

    // Transformar a primeira letra de cada palavra em maiúscula
    return dataFormatada.replace(/\b\w/g, l => l.toUpperCase())
}

// Executar a função ao iniciar o aplicativo (janela principal)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('dataAtual').innerHTML = obterData()
})
