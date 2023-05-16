let display = document.querySelector("#result");
let buttons = document.querySelectorAll(".btn");
let displayVal = display.value;



for (btn of buttons) {
    btn.addEventListener('click', (e) => {
        let btnVal = e.target.innerText;
        if (displayVal == "0") {
            displayVal = btnVal;
            display.value = displayVal;
        }
        else if (btnVal == 'C') {
            displayVal = "0";
            display.value = displayVal;
        }
        else if (btnVal == '=') {
            displayVal = eval(display.value)
            display.value = displayVal;
        }
        else if (btnVal == 'DEL') {
            displayVal = display.value;
            if (displayVal.length) {
                displayVal = displayVal.slice(0, -1);
                display.value = displayVal;
            }
        } else {
            displayVal += btnVal;
        }

        display.value = displayVal;
    })
}