let exp = "0";
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".button");

function isDigit(character) {
    if (character >= "0" && character <= "9") return true; else false;
}

function containsDecimal(exp) {
    for (let i = exp.length-1; i >= 0; i --) {
        if (exp[i] === ".") return true;
        if (exp[i] === " ")  return false;
    }

    return false;
}

function trimExpression(exp, last) {
    if (last === ".") exp = exp.slice(0, -1);
    if (last === " ") exp = exp.slice(0, -3);

    return exp;
}

let clear = false;

for (const button of buttons) {
    button.addEventListener("click", () => {
        const char = button.innerHTML.trim();
        const last = exp.charAt(exp.length-1);
        const secondLast = exp.charAt(exp.length-2);

        if (char === "~") exp = exp;
        else if (isDigit(char)) {
            if (clear === true || exp === "0") exp = "";

            exp += char;
            clear = false;
        }
        else if (char === "CE") {
            exp = exp.slice(0, (last === " " ? (-3) : (-1)));

            if (exp === "" || exp === "-") exp = "0";
        }
        else if (char === "=") {
            if (isDigit(last) || last === ".") {
                exp = String(eval(exp));
                clear = true;
            }
        }
        else if (char === ".") {
            if (clear === true) {
                exp = "0.";
                clear = false;
            }
            else if (!containsDecimal(exp)) {
                if (isDigit(last)) exp += "."; else exp += "0.";
            }
        }
        else {
            if (!(secondLast == "-" && !isDigit(exp.charAt(exp.length-4)))) {
                if (char === "÷") {
                    exp = trimExpression(exp, last);
                    exp += " / ";
                }
                else if (char === "×") {
                    exp = trimExpression(exp, last);
                    exp += " * ";
                }
                else if (char === "-") {
                    if (last === ".") exp = exp.slice(0, -1);
                    else if (secondLast === "+" || secondLast === "-") {
                        exp = exp.slice(0, -3);
                    }
    
                    exp += " - ";
                }
                else if (char === "+" || char === "%") {
                    exp = trimExpression(exp, last);
                    exp += ` ${char} `;
                }
                else exp += char;
            }

            clear = false;
        }

        result.innerHTML = exp;

        if (exp === "NaN" || exp === "Infinity" || exp === "-Infinity") {
            exp = "0";
        }
    });
}