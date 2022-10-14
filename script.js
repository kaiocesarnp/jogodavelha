const cellElements = document.querySelectorAll("[data-cell"); //seleciona todas as células, '[]' seleciona um atributo

let isCircleTurn; //variável q indica se é a vez do circulo jogar

const placeMark = (cell, classToAdd) => { //função que recebe cell e classToAdd
    cell.classList.add(classToAdd);
}

const handleClick = (e) => { //(e) é elemento da celula = cell
    const cell = e.target;
    //adiciona o simbolo (x ou circulo)
    const classToAdd = isCircleTurn ? 'circle' : 'x'; //é a vez do circulo jogar? se sim, adiciona à celula a classe 'circle', senão adiciona a classe 'x'

    placeMark (cell, classToAdd);
}

//, verifica quem ganha, verifica se deu empate, muda o símbolo

for(const cell of cellElements){
    cell.addEventListener("click", handleClick, {once: true}); //adiciona em cada célula um addEventListener com o nome 'click' e chama a função 'handleclick. Acontecendo só uma vez (once: true) para não sobrepor uma jogada anterior
} 

