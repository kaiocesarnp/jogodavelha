const cellElements = document.querySelectorAll("[data-cell"); //seleciona todas as células, '[]' seleciona um atributo
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restarButton = document.querySelector("[data-restart-button]");

let isCircleTurn; //variável q indica se é a vez do circulo jogar

const winningCombinations = [ //combinações de vitória
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const statGame = () => { //inicialização do jogo, começando pelo X
    for(const cell of cellElements){
         isCircleTurn = false;

        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true}); //adiciona em cada célula um addEventListener com o nome 'click' e chama a função 'handleclick. Acontecendo só uma vez (once: true) para não sobrepor uma jogada anterior
    } 
    
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

const endGame = (isDraw) =>{   //função que encerra o jogo, verfificando se deu empate. draw = empate
    if (isDraw){
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X venceu!";
    }
    winningMessage.classList.add("show-winning-message");
};
const RandleRestartClick = () => {
}

//função que verifica a vitoria, puxando a const 'winningCombinations'. 'currentPlayer' é a classe atual da board, o jogador atual
const checkForWin = (currentPlayer) => { 
    return winningCombinations.some((combination) => { //verifica se alguma combinação está preenchida com o jogador atual, 'currentPlayer'
        return combination.every((index) => {         //verifica se em cada célula na sequencia da combinação extá preenchida com o mesmo elemento,  ex: [1, 2, e 3] preenchida com 'x'
            return cellElements[index].classList.contains(currentPlayer);
        });                                        
    });
};

const checkForDraw = () => {    //checa se todas as células estão ocupadas e não ocorreu nenhuma vitória
    return [...cellElements].every((cell) => {
       return cell.classList.contains("x") || cell.classList.contains("circle")
    });
};  


const placeMark = (cell, classToAdd) => { //função que recebe cell e classToAdd
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove("circle"); //remove o circulo e o x da board para não ser adicionados vários em sequencia
    board.classList.remove("x");

    if (isCircleTurn){            
        board.classList.add("circle"); //se for a vez do circulo, o adiciona, senão, adiciona o x
    } else {
        board.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn; //reverte o símbolo

    setBoardHoverClass();
}

const handleClick = (e) => { //(e) é elemento da celula = cell
    const cell = e.target;
    //adiciona o simbolo (x ou circulo)
    const classToAdd = isCircleTurn ? "circle" : "x"; //é a vez do circulo jogar? se sim, adiciona à celula a classe 'circle', senão adiciona a classe 'x'

    placeMark (cell, classToAdd);

    const isWin = checkForWin(classToAdd);  //verifica quem ganha. 'classToAdd' represente o 'currentPlayer', o jogador atual

    const isDraw = checkForDraw(); // verifica se deu empate

    if(isWin){
        endGame(false);
    } else if (isDraw){
        endGame(true)
    }else {
        swapTurns (); //muda o símbolo
    }
};

statGame();

restarButton.addEventListener("click", statGame); //reiniciar o jogo