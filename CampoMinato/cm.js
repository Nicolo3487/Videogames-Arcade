document.addEventListener('DOMContentLoaded', function() {
    // Tutto il tuo codice JavaScript qui
 
/*  CREAZIONE TABELLA  */
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');
const easyButtton = document.getElementById('easy-button');
const mediumButton = document.getElementById('medium-button');
const hardButton = document.getElementById('hard-button');

let totalCells, totalBombs, maxScore, bombsList, score;

/* FUNZIONI SCELTA DIFFICOLTA' */
/* funzione crea difficoltà */
function setDifficulty(difficulty) {
    if(difficulty === 'easy') {
        totalCells = 101;
        totalBombs = 15;
    } else if(difficulty === 'medium') {
        totalCells = 101;
        totalBombs = 20;
    } else if(difficulty === 'hard') {
        totalCells = 101;
        totalBombs = 30;
    }
    maxScore = totalCells - totalBombs;
    bombsList = [];
    score = 0;
}

/* funzione scegli difficoltà */
function initGame(difficulty) {
    setDifficulty(difficulty);
    bombsList = [];
    while(bombsList.length < totalBombs) {
        const number = Math.floor(Math.random() * totalCells) + 1;
        if(!bombsList.includes(number)) bombsList.push(number);
    }
    console.log(bombsList);
    createGrid();
}

easyButtton.addEventListener('click', () => {
    initGame('easy');
    hideDifficultyButtons();
});

mediumButton.addEventListener('click', () => {
    initGame('medium');
    hideDifficultyButtons();
})

hardButton.addEventListener('click', () => {
    initGame('hard');
    hideDifficultyButtons();
});

function hideDifficultyButtons() {
    const difficultyButtons = document.querySelector('.difficulty-buttons');
    if (difficultyButtons) {
        difficultyButtons.classList.add('hidden');
    }
}


/* mostra i bottoni di difficoltà */
const gameContainer = document.querySelector('.game-container');
gameContainer.style.display = 'none';

/* visualizza la griglia una volta scelta la difficolta */
function showGame() {
    gameContainer.style.display = 'block';
}

window.addEventListener('load', () => {
    showGame();
})

/* FUNZIONI GIOCO */
/* genera bombe causali */


/* creazione griglia */
function createGrid() {
    grid.innerHTML = ''; //pulizia griglia
    let isCellEven = false;
    let isRowEven = false;
    /* creo la griglia con le celle */
    for(let i = 1; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        isCellEven = i % 2 === 0;
        if(isRowEven && isCellEven) cell.classList.add('cell-dark');   // Se la riga è pari e la cella è pari: casella grigia
        else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');   // Se la riga è dispari e la cella è dispari: casella grigia

        if( i % 10 === 0) isRowEven = !isRowEven;

        /* gestione click per cella*/
        cell.addEventListener('click', function() {
            if(cell.classList.contains('cell-clicked')) return;

            if(bombsList.includes(i)) {
                cell.classList.add('cell-bomb')
                endGame(false);
            } else {
                cell.classList.add('cell-clicked');
                updateScore();
            }
        });

        grid.appendChild(cell);
    }
}

/*  END GAME    */
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5, 0);
    if(score === maxScore) endGame(true);
}

function endGame(isVictory) {
    if(isVictory === true) {
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU <br> WIN';
    } else {
       revealBombs(); 
    }
    
    endGameScreen.classList.remove('hidden');
}

playAgainButton.addEventListener('click', playAgain);

function playAgain() {
    location.reload();
}

function revealBombs() {
 const cells = document.querySelectorAll('.cell');
    if( cells) {
        for(let i = 1; i <= cells.length; i++) {
            if(bombsList.includes(i)) {
                const cellToReveal = cells[i - 1];
                cellToReveal.classList.add('cell-bomb');
            }
        }
    }
}
});
