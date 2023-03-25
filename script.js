// Cache DOM elements
const screen = document.querySelector('.screen');
const buttons = document.querySelector('.cal-buttons');

let runningTotal = 0;
let buffer = "0";
let previousOperator;
let shouldUpdateScreen = true;

// Button click event listener
buttons.addEventListener('click', function(event) {
    const target = event.target;

    // Ignore clicks on non-button elements
    if (!target.matches('button')) {
        return;
    }

    const value = target.innerText;
    buttonClick(value);
});s

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    if (shouldUpdateScreen) {
        updateScreen();
    }
}

function handleSymbol(symbol) {
switch (symbol) {
    case 'C':
        buffer = '0';
        runningTotal = 0;
        shouldUpdateScreen = true;
        break;
    case '=':
        if (previousOperator === null) {
        return;
        }
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = runningTotal;
        runningTotal = 0;
        shouldUpdateScreen = true;
        break;
    case '←':
        if (buffer.length === 1) {
        buffer = '0';
        } else {
        buffer = buffer.substring(0, buffer.length - 1);
        }
        shouldUpdateScreen = true;
        break;
    case '+':
    case '−':
    case '×':
    case '÷':
        handleMath(symbol);
        shouldUpdateScreen = true;
        break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    shouldUpdateScreen = true;
}

function addCommas(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}

function updateScreen() {
    screen.innerText = addCommas(buffer);
}