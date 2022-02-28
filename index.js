const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = new Array([EMPTY, EMPTY, EMPTY], [EMPTY,EMPTY,EMPTY], [EMPTY,EMPTY,EMPTY])
let player = 1;
let haveWinner = false;

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
    if (!haveWinner) {
        alert("Победила дружба");
    }}

function isThereWinner(){
    for(let i = 0; i < field.length; i++){
        if(field[0][i] === field[1][i] && field[1][i] === field[2][i]){
            haveWinner = true;
            if(field[0][i] == 'X'){
                alert('Выиграл cross!');
            }
            else{
                alert('Выиграл zero!');
            }
        }
        if(field[i][0] === field[i][1] && field[i][1] === field[i][2]){
            haveWinner = true;
            if(field[i][0] == 'X'){
                alert('Выиграл cross!');
            }
            else{
                alert('Выиграл zero!');
            }
        }
    }
    if(field[0][0] === field[1][1] && field[1][1] === field[2][2]){
        haveWinner = true;
        if(field[0][0] == 'X'){
            alert('Выиграл cross!');
        }
        else{
            alert('Выиграл zero!');
        }
    }
    if(field[0][2] === field[1][1] && field[1][1] === field[2][0]){
        haveWinner = true;
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
    if (field[row][col] !== EMPTY)
    {
        console.log(`Clicked on cell: ${row}, ${col}`);
        if (player === 1) {
            field[row][col] = 'X';
            renderSymbolInCell(CROSS, row, col);
        } else {
            field[row][col] = 'O';
            renderSymbolInCell(ZERO, row, col);
        }
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