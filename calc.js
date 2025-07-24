function addition(a, b) {
    return (a + b).toFixed(3);
}
function subtraction(a, b) {
    return (a - b);
}
function multiplication(a, b) {
    return (a * b).toFixed(3);
}
function divide(a, b) {
    return b === 0 ? "Error" : (a/b).toFixed(2);
}

let buttons = document.querySelectorAll(".num1");
let clr = document.querySelector(".clear");
let ops = document.querySelectorAll(".num");
let equals = document.querySelector(".equal");
let dis = document.querySelector(".disp");
let decimal = document.querySelector(".dot");
let del = document.querySelector(".bspace");


let a = "";
let b = "";
let o = "";
let oprnd = false;
let justEvaluated = false;

function calculateAndSetResult() {
    const num1 = Number(a);
    const num2 = Number(b);
    let result;

    switch (o) {
        case "+":
            result = addition(num1, num2);
            break;
        case "-":
            result = subtraction(num1, num2);
            break;
        case "*":
            result = multiplication(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            result = "Invalid";
    }

    a = result;
    b = "";
    o = "";
    oprnd = false;
    return result;
}

function operate() {
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (justEvaluated) {
                a = button.value
                
                dis.textContent = `${a}`;
                justEvaluated = false;
            
            }

            else if (!oprnd) {
                a += button.value;
            } else {
                b += button.value;
            }
            dis.textContent = `${a} ${o} ${b}`;
        });
    });
    
    decimal.addEventListener('click', () => {
        

        if (!oprnd) {
            a += a === "" ? ".0": ".";
        } else {
            b += b === "" ? ".0": ".";
        }
        dis.textContent = `${a} ${o} ${b}`;
    });
        
    del.addEventListener('click', () => {
        if(a==="" && b===""){
            return
        }
        

        if (!oprnd) {
            a=a.slice(0,-1);
        } 
        else {
            b=b.slice(0,-1);
        }
        dis.textContent = `${a} ${o} ${b}`;
    });
    

    
    ops.forEach(button => {
        button.addEventListener('click', () => {
            if (a === "") return;

            if (oprnd && b !== "") {
                calculateAndSetResult();
                dis.textContent = `${a} ${button.value}`;
                o = button.value;
                oprnd = true;
                

            } else {
                o = button.value;
                oprnd = true;
                dis.textContent = `${a} ${o}`;
                justEvaluated = false;
            }
        });
    });

    
    equals.addEventListener('click', () => {
        if (a !== "" && b !== "" && o !== "") {
            const result = calculateAndSetResult();
            dis.textContent = result;
            justEvaluated = true;
            
        }
    });

    
    clr.addEventListener("click", () => {
        a = "";
        b = "";
        o = "";
        oprnd = false;
        justEvaluated = false;
        dis.textContent = "";
    });
}

operate();
