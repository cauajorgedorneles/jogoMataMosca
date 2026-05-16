let altura = 0
let largura = 0
let vidas = 1
let tempo = 80
let criaMoscaTempo = 2000

//Pegand o nivel do jogo
let nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'lerdao'){
    //2000
    criaMoscaTempo = 2000
} else if(nivel === 'normal'){
    //1200
    criaMoscaTempo = 1200
} else if (nivel === 'trem-bala'){
    //0800
    criaMoscaTempo = 800
}



function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;
    
    console.log(largura, altura)
}

let cronometro = setInterval(function(){
    

    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }

    tempo -= 1

}, 1000)

//Criando posições aleatórias
function posicaoRandomica() {
     ajustaTamanhoPalcoJogo()
    //Verificar se já tem um elemento img com id mosca // Remover mosca anterior
    let elemento = document.getElementById('mosca')
    
    if(elemento){
        elemento.remove()

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'
            vidas++
        }
    }

    let tamanhoMosca = largura < 768 ? 100 : 200

    let posicaoX = Math.floor(Math.random() * (largura - tamanhoMosca))
    let posicaoY = Math.floor(Math.random() * (altura - tamanhoMosca))

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    //Criando o elemento HTML
    let mosca = document.createElement('img')
    mosca.src = 'imagens/mosca.png'
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosca'
    mosca.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosca)
}

function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3)
    
    switch(classe){
        case 0:
            return 'mosca1'
        case 1:
            return 'mosca2'
        case 2:
            return 'mosca3'
    } 
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)
    
    switch(classe){
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    } 
}

let criaMosca = setInterval(function(){
    posicaoRandomica()
}, criaMoscaTempo)

window.onload = function(){
    ajustaTamanhoPalcoJogo()
}

window.addEventListener('resize', function(){
        ajustaTamanhoPalcoJogo()
    })

