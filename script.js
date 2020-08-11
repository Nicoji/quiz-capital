// DOM's element
const goodAndswerNumber = document.querySelector('.good-number');
const questionNumber = document.querySelector('.question-number');
const countryDom = document.querySelector('.country');
const optionsCapital = document.querySelectorAll('.option');
const gameBoard = document.querySelector('.quiz-box');
const resultBoard = document.querySelector('.end-game');
const reset = document.querySelector('.reset');
const result = document.querySelector('.result');

// Countries and capitals
const country = ['Suisse', 'Colombie', 'Ghana', 'Corée du Sud',
'Japon', 'Island', 'Canada', 'Argentine', 'Allemagne', 'Portugal',
'Brésil', 'République Tchèque', 'Italie', 'Mongolie', 'Russie',
'Slovaquie', 'Croatie', 'Pérou', 'Chili', 'Chine']

const capital = ['Berne', 'Bogota', 'Accra', 'Seoul', 'Tokyo',
'Reykjavik', 'Ottawa', 'Buenos Aires', 'Berlin', 'Lisbonne',
'Brasilia', 'Prague', 'Rome', 'Oulan-Bator', 'Moscou',
'Bratislava', 'Zagreb', 'Lima', 'Santiago', 'Pékin']

// Function needed to create some variables
const getARandomIndex = (max) => {
    $index = Math.floor(Math.random() * max);
    return $index;
}

// Variables
let countQuestion = 0;
let countGoodAnswer = 0; 
let index = getARandomIndex(country.length);
let indexAnswer = getARandomIndex(4);
let secondClick = false;
let alreadyUsed = [];
let answerOption = [];
goodAndswerNumber.textContent = countGoodAnswer;
questionNumber.textContent = countQuestion;

// Functions
const place = () => {

    // Not ask the same question twice : 
    while(alreadyUsed.indexOf(country[index]) != -1) {
        index = getARandomIndex(country.length);
    }
    alreadyUsed.push(country[index]);     

    countryDom.textContent = country[index];

    let randomIndex = getARandomIndex(country.length)

    // Get 4 different answers, including the good answer
    for(let i = 0; i < 4; i++) {
        while(answerOption.indexOf(capital[randomIndex]) != -1) {
            randomIndex = getARandomIndex(country.length);
        } 

        if(indexAnswer == i) {
            optionsCapital[i].textContent = capital[index];
        } else {
            while(capital[index] == capital[randomIndex]) {
                randomIndex = getARandomIndex(country.length);
            }
            optionsCapital[i].textContent = capital[randomIndex];
        }
        answerOption.push(optionsCapital[i].textContent);
    }
    
    answerOption = [];    
}

const isItGoodAnswer = (event) => {

    /* Verify that the user didn't click again before the end of
       our setTimeout */
    if(!secondClick) {
        
        secondClick = true;
   
        // Verify if it's the good answer
        if(event.target.textContent == capital[index]) {
            event.target.classList.add('good'); 
            countGoodAnswer++;
            goodAndswerNumber.textContent = countGoodAnswer;
        } else {
            event.target.classList.add('wrong');
            for(const option of optionsCapital) {
                if(option.textContent == capital[index]) {
                    option.classList.add('good');
                }
            }
        }

        countQuestion++;
        questionNumber.textContent = countQuestion;
        
        // Reset answer's background
        for(const option of optionsCapital) {
            if(option.classList.contains('good')) {
            setTimeout(() => {option.classList.remove('good')}, 1000);
            }
            if(option.classList.contains('wrong')) {
                setTimeout(() => {option.classList.remove('wrong')}, 1000);
            }
        } 
        
        // Verify if it's the end of the game 
        if(countQuestion == 20) {
            result.textContent = countGoodAnswer + "/" + countQuestion;
            setTimeout(() => {  gameBoard.classList.add('hide'); }, 1000);
            setTimeout(() => {  resultBoard.classList.remove('hide'); }, 1000);
        } else {
            index = getARandomIndex(country.length);
            indexAnswer = getARandomIndex(4);

            setTimeout(() => {  place(); }, 1000);
        }

        setTimeout(() => {secondClick = false}, 1200);

    }  else {
        return;
    }
}

const resetGame = () => {
    countQuestion = 0;
    countGoodAnswer = 0;
    goodAndswerNumber.textContent = countGoodAnswer;
    questionNumber.textContent = countQuestion;
    resultBoard.classList.add('hide');
    gameBoard.classList.remove('hide'); 
    alreadyUsed = [];
}

// Events 
for(const option of optionsCapital) {
    option.addEventListener('click', isItGoodAnswer);
}

reset.addEventListener('click', resetGame);

// Initialization
place();