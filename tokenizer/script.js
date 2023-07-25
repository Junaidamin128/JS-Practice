console.log("tokenizer");

let str =  `my name(is)*8374 "hello world"`;
let ops = "+-/*()!@#$%^&_".split("");
let tokens = [];
let token = ""
let type = 
isString = null;



for(let i = 0;i<str.length;i++){
    let prev = str[i-1];
    let char = str[i];
    let next = str[i+1];

    if(char === `"` || char === `'`){
        if(isString == true){
            isString = false;
        }
        isString = true;
        addToken();
    }else if(isString === true){
        token+=char;
    }else if(char === " "){
            addToken();
    }else if(ops.indexOf(char)!==-1){
        addToken();
    }else{
        token+=char;
    }
}
addToken();
console.log(tokens);







function addToken(){
    if(token !== ""){
        tokens.push(token);
    }
    token =""
}