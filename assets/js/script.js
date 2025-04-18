document.querySelector('.gerarSenha').addEventListener('click', () => {


    const senhaGerada = document.querySelector('.senhaGerada')
    const quantCaracteres = document.querySelector('#qantCaract')
    const addNum = document.querySelector('#checkNumber')
    const addMaius = document.querySelector('#checkMaiuscula')
    const addMinus = document.querySelector('#checkMenuscula')
    const addEspecial = document.querySelector('#checkEspecial')

    if(quantCaracteres.value < 6 || quantCaracteres.value > 20){
        senhaGerada.innerHTML = 'A quantidade dever esta entre 6 e 20';
        return;
    }

    function gera(){
        const senha = geraSenha(
            quantCaracteres.value,
            addMaius.checked,
            addMinus.checked,
            addNum.checked,
            addEspecial.checked
        )
     return senha || 'Nada Selecionado'
    }

    senhaGerada.innerHTML = gera();

})

function geraSenha(qtd, maiusculas, minusculas, numeros, simbolos) {
    const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const geraMaiuscula = () => String.fromCharCode(rand(65, 91));
    const geraMinuscula = () => String.fromCharCode(rand(97, 123));
    const geraNumero = () => String.fromCharCode(rand(48, 58));
    const simbolosChar = ',.;~!@#$%*+_-';
    const geraSimbolo = () => simbolosChar[rand(0, simbolosChar.length)];

    const senhaArray = [];
    qtd = Number(qtd)
    for (let i = 0; i < qtd; i++) {
        maiusculas && senhaArray.push(geraMaiuscula())
        minusculas && senhaArray.push(geraMinuscula())
        numeros && senhaArray.push(geraNumero())
        simbolos && senhaArray.push(geraSimbolo())
    }
    return senhaArray.join('').slice(0, qtd)
}

document.querySelector('.formSenha').addEventListener('submit', e =>{
    e.preventDefault();
    
    fetch('assets/password/senhasComuns.txt')
    .then(data =>data.text())
    .then(senhas => comparaSenhas(senhas))
    .catch(e => console.log(e))
})


function comparaSenhas(senhas) {
    const inputSenha = document.querySelector('#inputSenha').value.trim();
    const listaSenhas = senhas.split('\n'); 
    const resultado = document.querySelector('#resultado')
  
    for (let senha of listaSenhas) {
      if (inputSenha === senha.trim()) {
        resultado.innerHTML = '⚠️ Sua senha é muito comum!';
        return;
      }
    }
  
    resultado.innerHTML = '✅ Sua senha não está entre as mais comuns!'
}
  

