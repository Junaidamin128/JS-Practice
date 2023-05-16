let str = `abcd(e) '2343' *56456 a*sdfasd`;


let ops = ["+", "-", "*", "/", "."]
let tokens = [];
let token = "";

let stringChar = null;

function addToken() {
    if (token !== "") {
        let type = "number";
        if (token.match(/[a-z]/gi)) {
            type = "identifier";
        }

        tokens.push({ token, type });
    }
    token = ""

}

for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (stringChar !== null) {
        if (char === stringChar) {
            tokens.push({ token, type: "string" });
            stringChar = null;
            token = "";
        } else {
            token += char
        }

    } else if (char === " ") {
       addToken();
    } else if (char === "'" || char === '"') {
        stringChar = char;
        console.log(stringChar)
    } else if (ops.indexOf(char) !== -1) {
        addToken();
        tokens.push({ token: char, type: 'operator' });
    } else if (char === "(" || char === ")") {
        if (token !== "") {
            let type = "number";
            if (token.match(/[a-z]/gi)) {
                type = "identifier";
            }

            tokens.push({ token, type });
        }
        tokens.push({ token: char, type: "parenthesis" });
        token = "";
    } else {
        token += char;

    }
}
if (token) {
    addToken();
}
console.table(tokens);