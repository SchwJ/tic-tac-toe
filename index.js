const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = new Array([EMPTY, EMPTY, EMPTY], [EMPTY,EMPTY,EMPTY], [EMPTY,EMPTY,EMPTY])
let player = 1;
let haveWinner = false;
let countEmptyCells = 9;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function isThereWinner(){
    if (!haveWinner && countEmptyCells === 0) {
        alert("Победила дружба");
    } else {
        for (let i = 0; i < field.length; i++) {
            if (field[0][i] !== EMPTY && field[0][i] === field[1][i] && field[1][i] === field[2][i]) {
                haveWinner = true;
                renderSymbolInCell(field[0][i], 0, i, '#FF0000');
                renderSymbolInCell(field[0][i], 1, i, '#FF0000');
                renderSymbolInCell(field[0][i], 2, i, '#FF0000');
                if (field[0][i] == 'X') {
                    alert('Выиграл cross!');
                } else {
                    alert('Выиграл zero!');
                }
            }
            if (field[i][0] !== EMPTY && field[i][0] === field[i][1] && field[i][1] === field[i][2]) {
                haveWinner = true;
                renderSymbolInCell(field[i][0], i, 0, '#FF0000');
                renderSymbolInCell(field[i][0], i, 1, '#FF0000');
                renderSymbolInCell(field[i][0], i, 2, '#FF0000');
                if (field[i][0] == 'X') {
                    alert('Выиграл cross!');
                } else {
                    alert('Выиграл zero!');
                }
            }
        }
        if (field[0][0] !== EMPTY && field[0][0] === field[1][1] && field[1][1] === field[2][2]) {
            haveWinner = true;
            renderSymbolInCell(field[0][0], 0, 0, '#FF0000');
            renderSymbolInCell(field[1][1], 1, 1, '#FF0000');
            renderSymbolInCell(field[2][2], 2, 2, '#FF0000');
            if (field[0][0] == 'X') {
                alert('Выиграл cross!');
            } else {
                alert('Выиграл zero!');
            }
        }
    }
    if(field[0][2] !== EMPTY && field[0][2] === field[1][1] && field[1][1] === field[2][0]){
        haveWinner = true;
        renderSymbolInCell(field[0][2], 0, 2, '#FF0000');
        renderSymbolInCell(field[0][2], 1, 1, '#FF0000');
        renderSymbolInCell(field[0][2], 2, 0, '#FF0000');
        if(field[0][2] == 'X'){
            alert('Выиграл cross!');
        }
        else{
            alert('Выиграл zero!');
        }
    }
}

function cellClickHandler (row, col) {
    // Пиши код тут
    if (field[row][col] === EMPTY && !haveWinner)
    {
        countEmptyCells -= 1;
        console.log(`Clicked on cell: ${row}, ${col}`);
        if (player === 1) {
            field[row][col] = 'X';
            renderSymbolInCell(CROSS, row, col);
            player = 2;
        } else {
            field[row][col] = 'O';
            renderSymbolInCell(ZERO, row, col);
            player = 1;
        }
        isThereWinner();
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}