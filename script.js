const cellElements = document.querySelectorAll("[data-cell"); //seleciona todas as células, '[]' seleciona um atributo
const board = document.querySelector("[data-board]");


let isCircleTurn; //variável q indica se é a vez do circulo jogar

const statGame = () => { //inicialização do jogo, começando pelo X
    for(const cell of cellElements){
        cell.addEventListener("click", handleClick, {once: true}); //adiciona em cada célula um addEventListener com o nome 'click' e chama a função 'handleclick. Acontecendo só uma vez (once: true) para não sobrepor uma jogada anterior
    } 
    let isCircleTurn = false;
    
    board.classList.add("x");
}

const placeMark = (cell, classToAdd) => { //função que recebe cell e classToAdd
    cell.classList.add(classToAdd);
}

//função para mudar o símbolo

const swapTurns = () => {
    isCircleTurn = !isCircleTurn //reverte o símbolo

    board.classList.remove("circle"); //remove o circulo e o x da board para não ser adicionados vários em sequencia
    board.classList.remove("x");

    if (isCircleTurn){            
        board.classList.add("circle"); //se for a vez do circulo, o adiciona, senão, adiciona o x
    } else {
        board.classList.add("x");
    }
}

const handleClick = (e) => { //(e) é elemento da celula = cell
    const cell = e.target;
    //adiciona o simbolo (x ou circulo)
    const classToAdd = isCircleTurn ? 'circle' : 'x'; //é a vez do circulo jogar? se sim, adiciona à celula a classe 'circle', senão adiciona a classe 'x'

    placeMark (cell, classToAdd);

    swapTurns (); //muda o símbolo
}

//, verifica quem ganha, verifica se deu empate, 

statGame();