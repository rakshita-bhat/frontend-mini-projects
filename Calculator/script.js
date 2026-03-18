const display = document.getElementById('display');
let currentInput = '0';
let lastActionEquals = false;

function updateDisplay(value) {
    display.textContent = value.substring(0, 15);
}

function clearDisplay() {
    currentInput = '0';
    lastActionEquals = false;
    updateDisplay(currentInput);
}

function deleteLast() {
    if (currentInput === '0' || lastActionEquals) return;

    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay(currentInput);
}

function appendNumber(number) {
    if (lastActionEquals) {
        currentInput = '0';
        lastActionEquals = false;
    }

    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (number === '.') {
        const parts = currentInput.split(/[+\-*/]/);
        if (!parts[parts.length - 1].includes('.')) {
            currentInput += number;
        }
    } else {
        currentInput += number;
    }

    updateDisplay(currentInput);
}

function appendOperator(operator) {
    lastActionEquals = false;

    const lastChar = currentInput.slice(-1);
    const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);
    
    if (currentInput === '0' && operator !== '-') {
         return;
    }

    if (isLastCharOperator) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }

    updateDisplay(currentInput);
}

function calculate() {
    if (lastActionEquals) return;

    try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');

        let result = eval(expression);

        if (result !== Infinity && result !== -Infinity) {
             result = parseFloat(result.toFixed(10));
        }

        currentInput = String(result);
        updateDisplay(currentInput);
        lastActionEquals = true;

    } catch (error) {
        updateDisplay("Error");
        currentInput = '0';
        lastActionEquals = true;
        console.error("Calculation Error:", error);
    }
}