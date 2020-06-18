const goodAndswerNumber = document.querySelector('.good-number');
const questionNumber = document.querySelector('.question-number');
const countryDom = document.querySelector('.country');
const optionsCapital = document.querySelectorAll('.option');
const gameBoard = document.querySelector('.quiz-box');
const resultBoard = document.querySelector('.end-game');

const country = ['Suisse', 'Colombie', 'Ghana', 'Corée du Sud',
'Japon', 'Island', 'Canada', 'Argentine', 'Allemagne', 'Portugal',
'Brésil', 'République Tchèque', ]

const capital = ['Berne', 'Bogota', 'Accra', 'Seoul', 'Tokyo',
'Reykjavik', 'Ottawa', 'Buenos Aires', 'Berlin', 'Lisbonne',
'Brasilia', 'Prague']

const getARandomIndex = (max) => {
    $index = Math.floor(Math.random() * max);
    return $index;
}

let countQuestion = 0;
let countGoodAnswer = 0; 

goodAndswerNumber.textContent = countGoodAnswer;
questionNumber.textContent = countQuestion;
let index = getARandomIndex(12);
let indexAnswer = getARandomIndex(4);
let secondClick = false;

const place = () => {

    countryDom.textContent = country[index];
    optionsCapital[indexAnswer].textContent = capital[index];

    for(let i = 0; i < 4; i++) {

        if(indexAnswer == i) {
            optionsCapital[i].textContent = capital[index];
        } else {
            optionsCapital[i].textContent = capital[getARandomIndex(12)];
        }
    }
}

const isItGoodAnswer = (event) => {

    if(!secondClick) {

        secondClick = true;
   
        if(event.target.textContent == capital[index]) {
            event.target.classList.add('good'); 
            countGoodAnswer++;
            countQuestion++; 
            goodAndswerNumber.textContent = countGoodAnswer;
        } else {
            event.target.classList.add('wrong');
            for(const option of optionsCapital) {
                if(option.textContent == capital[index]) {
                    option.classList.add('good');
                }
            }
            countQuestion++;
        }

        questionNumber.textContent++;
        
        for(const option of optionsCapital) {
            if(option.classList.contains('good')) {
            setTimeout(() => {option.classList.remove('good')}, 1000);
            }
            if(option.classList.contains('wrong')) {
                setTimeout(() => {option.classList.remove('wrong')}, 1000);
            }
        } 
        
        if(countQuestion == 20) {
            setTimeout(() => {  endGame(); }, 1000);
        } else {
            index = getARandomIndex(12);
            indexAnswer = getARandomIndex(4);

            setTimeout(() => {  place(); }, 1000);
        }

        setTimeout(() => {secondClick = false}, 1200);

    }  else {
        return;
    }
    
}

const endGame = () => {
    gameBoard.classList.add('hide');
    resultBoard.classList.remove('hide');
}


for(const option of optionsCapital) {
    option.addEventListener('click', isItGoodAnswer);
}

place();