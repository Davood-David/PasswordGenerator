// DOM elements
const resultEl    = document.getElementById('result');
const lengthEl    = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl   = document.getElementById('numbers');
const symbolsEl   = document.getElementById('symbols');
const generateEl  = document.getElementById('generate');
const clipboard   = document.getElementById('clipboard');


//object to get random functions from generator functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generat event listen 
generateEl.addEventListener('click', () =>{
    //  + sign : for convert the string to integer
    const length    = +lengthEl.value;
    const hasLower  = lowercaseEl.checked;
    const hasUpper  = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// copy password to clipboard
clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password){
        return;
    }
    textarea.value = password; 
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
    
});
// Generate password function
function generatePassword(lower, upper, number, symbol, length){
    // 1. Init password var
    // 2. Filter out unchecked types
    // 3. Loop over Length call generator function for each type
    // 4. Add final password to the password var and return 

    let generatedPassword = '';
    // count number of cheched elements 
    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    // I want array of objects as key , for this we have to put all in {}
    // filter: because we want just checked elements 
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );
    // console.log('typesArr: ', typesArr);

    // if non checked we want to return nothing 
    if (typesCount === 0){
        return '';
    }

    for( let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}
// Generator functions

function getRandomLower(){
    // 26 because there are 26 characters in english 
    // 97 : because ascii code of first lower case character begins form 97
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}

function getRandomUpper(){
    // 65:  ascii code of first Uppercase character 
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

function getRandomNumber(){
    // 48 : ascii code of first number (o)
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48 );
}

function getRandomSymbol(){
    const symboles = '!@#$%^&*(){}[]=+-/,.<>';
    return symboles[Math.floor(Math.random() * symboles.length)];
}

