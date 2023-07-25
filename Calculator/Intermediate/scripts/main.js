let buttons = document.querySelectorAll(".btn");
let preDisplay = document.querySelector('#prevResult');
let display = document.querySelector('#newResult');
let ops = "+-/*÷×%".split('');
let fns = '1/× ×² ²√× +/-'.split(' ');
let string = '';
let preString = '';

// console.log(ops[0]);




for (let btn of buttons) {
    btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        let btnText = btn.textContent;
        // let dataAttr = btn.getAttribute("data-kotak")
        // if (dataAttr) {
        //     btnText = dataAttr;
        // }
        checkButton(btnText);
    })
}

function checkButton(btn) {
    if (ops.indexOf(btn) !== -1) {
        checkOps(btn);
    }
    else if (fns.indexOf(btn) !== -1) {
        repFns(btn);
    }
    else if (btn === 'C' || btn === 'CE' || btn === 'DEL') {
        switch (btn) {
            case 'C':
                string = '';
                preString = '';
                display.value = '0';
                preDisplay.value = '';
                break;
            case 'CE':
                preString = '';
                preDisplay.value = '';
                string = display.value;
                break;
            case 'DEL':
                deleteChar();
                break;

            default:
                break;
        }
    }
    else if (btn === "=") {
        result();
    }
    else {
        addToString(btn);
    }
}



function addToString(text) {
    if (string == '0') {
        string = text;
    } else {
        string += text;
    }
    display.value = string;
}

function checkOps(text) {
    console.log(text);

    // if(text === '×' || text === '÷'){
    // }
    if (preString === '') {
        preString = string;
        preString += text;
        string = "";
    } else {
        if (string === '') {
            let lch = preString.substr(-1);
            if (ops.indexOf(lch) !== -1) {
                preString = preString.substr(0, preString.length - 1) + text;
            }
        } else {
            string += text;
        }
        preString += string;
        string = "";
    }
    preDisplay.value = preString;
}

function result() {
    if (string === '') {
        let lch = preString.substr(-1);
        if (ops.indexOf(lch) !== -1) {
            preString = preString.slice(0, -1);
            preString = replaceOps(preString);
            string = eval(preString);
        }
    } else {
        preString += string;
        preString = replaceOps(preString);
        string = eval(preString);
    }
    display.value = string;
    preString = '';
    console.log(preString);
    preDisplay.value = preString;
}

function deleteChar() {
    string = string.slice(0, -1);
    if (string === '') {
        display.value = '0';
    } else {
        display.value = string;
    }
}


function replaceOps(str) {
    for (let i = 0; i < str.length; i++) {
        let nxtchr = str[i + 1];
        let prechr = str[i - 1];
        let chr = str[i];
        if (ops.indexOf(chr) !== -1) {
            switch (chr) {
                case '×':
                    str = str.replace(str[i], '*');
                    break;

                case '÷':
                    str = str.replace(str[i], '/');
                    break;

                default:
                    break;
            }

        }
    }
    return str;
}

function repFns(text) {

    console.log("hello", text);
    if (string !== '') {

        switch (text) {
            case "×²":
                preString+='sqr('+ string +')';
                preDisplay.value = preString;
                string = '';
                break;
            case "²√×":

                break;
            case "1/×":

                break;

            default:
                break;
        }
    }
}