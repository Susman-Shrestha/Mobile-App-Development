
function add(a, b) {   
    return a + b;
}

function subtract(a, b) {   
    return a - b;
}
function multiply(a, b) {

    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero is not possible";
    }
    return a / b;
}

let num1 = 10, num2 = 5;
let operator = "*";



if (operator === "+") { 
    console.log(add(num1, num2)); 
}
else if (operator === "-") {
    console.log(subtract(num1, num2));
}

else if (operator === "*") {
    console.log(multiply(num1, num2));
}
else if (operator === "/") {
    console.log(divide(num1, num2));
}
else {
    console.log("Invalid operator");
}
