const words = [
    { original: "winner", translated: "переможець" },
    { original: "height", translated: "висота" },
    { original: "hospital", translated: "лікарня" },
    { original: "bedroom", translated: "спальня" },
    { original: "chocolate", translated: "шоколад" },
    { original: "role", translated: "роль" },
    { original: "comparison", translated: "порівняння" },
    { original: "army", translated: "армія" },
    { original: "midnight", translated: "північ" },
    { original: "restaurant", translated: "ресторан" },
    { original: "buyer", translated: "покупець" },
    { original: "volume", translated: "об'єм" },
    { original: "student", translated: "студент" },
    { original: "product", translated: "продукт" },
    { original: "studio", translated: "студія" },
    { original: "psychology", translated: "психологія" },
    { original: "television", translated: "телебачення" },
    { original: "affair", translated: "справа" },
    { original: "clothes", translated: "одяг" },
    { original: "two", translated: "два" },
    { original: "failure", translated: "невдача" },
    { original: "art", translated: "мистецтво" },
    { original: "coffee", translated: "кава" },
    { original: "mixture", translated: "суміш" }
];
const mediumWords = [
    { original: "abstain", translated: "утримуватися" },
    { original: "acknowledgment", translated: "визнання" },
    { original: "adequate", translated: "адекватний" },
    { original: "adversity", translated: "нещастя" },
    { original: "benevolent", translated: "доброзичливий" },
    { original: "bewildered", translated: "заплутаний" },
    { original: "bias", translated: "упередженість" },
    { original: "brazen", translated: "безсоромний" },
    { original: "capability", translated: "здатність" },
    { original: "capacious", translated: "просторий" },
    { original: "capitulate", translated: "капітулювати" },
    { original: "chronic", translated: "хронічний" },
    { original: "hone", translated: "відточувати" },
    { original: "heritage", translated: "спадщина" },
    { original: "hybrid", translated: "гібрид" },
    { original: "illegitimate", translated: "незаконний" },
    { original: "immerse", translated: "занурювати" },
    { original: "implicit", translated: "неявний" },
    { original: "pandemic", translated: "пандемія" },
    { original: "outwit", translated: "перехитрити" },
    { original: "reliant", translated: "залежний" },
    { original: "saga", translated: "сага" },
    { original: "scold", translated: "лаяти" },
    { original: "seasoned", translated: "досвідчений" }
];
const hardWords = [
    { original: "abash", translated: "соромити" },
    { original: "abate", translated: "зменшувати" },
    { original: "abdicate", translated: "відрікатися" },
    { original: "aberration", translated: "відхилення" },
    { original: "abstruse", translated: "складний" },
    { original: "basin", translated: "басейн" },
    { original: "bemoan", translated: "оплакувати" },
    { original: "boisterous", translated: "гучний" },
    { original: "chaff", translated: "віття" },
    { original: "caveat", translated: "зауваження" },
    { original: "clairvoyant", translated: "ясновидящий" },
    { original: "stipulate", translated: "вимагати" },
    { original: "swindler", translated: "шахрай" },
    { original: "threshold", translated: "поріг" },
    { original: "unequivocal", translated: "однозначний" },
    { original: "untenable", translated: "непідтримуваний" },
    { original: "verdict", translated: "вирок" },
    { original: "vicinity", translated: "околиці" },
    { original: "wrought", translated: "оброблений" },
    { original: "yearn", translated: "жадати" },
    { original: "yeoman", translated: "йоман" },
    { original: "zenith", translated: "зеніт" },
    { original: "laud", translated: "хвалити" },
    { original: "laudatory", translated: "похвальний" }
];


let currentWords = [];

let currentEasyWords = [];
let currentMediumWords = [];
let currentHardwords = [];

let currentSize;
let current = 0;
let maxSize = words.length;

let easyGuessed = new Array(currentSize).fill(false);
let mediumGuessed = new Array(currentSize).fill(false);
let hardGuessed = new Array(currentSize).fill(false);
let guessed = easyGuessed;

let state = true;
let easyGuesses = [0,0];
let mediumGuesses = [0,0];
let hardGuesses = [0,0];
let guesses = easyGuesses;


let temp = prompt("Введіть кількість слів (від 10 до 25)");
if (temp >= 10 && temp <= maxSize+1) {
    currentSize = parseInt(temp);
} else{
    currentSize = 10;
}

function fillWords(array, original){
    let availableWords = original.slice();
    for(let i = 0; i < currentSize; ++i){
        let index = Math.floor(Math.random() * availableWords.length);
        array.push(availableWords[index]);
        availableWords.splice(index, 1);
    }
}

fillWords(currentEasyWords, words);
fillWords(currentMediumWords, mediumWords);
fillWords(currentHardwords, hardWords);
currentWords = currentEasyWords.slice();


$("#wordDiv").text(currentWords[0].original);
$("#current").text(`${current+1}/${currentSize}`);

$(".arrow-img").on("click", function() {
    if ($(this).is(":first-child")) {
        if(current != 0){
            current-=1;
        }
        $("#wordDiv").text(currentWords[current].original);
        $("#current").text(`${current+1}/${currentSize}`);
    } else {
        if(current != currentSize - 1){
            current+=1;
        }
        $("#wordDiv").text(currentWords[current].original);
        $("#current").text(`${current+1}/${currentSize}`);
    }

    if(guessed[current]){
        $("#takeAGuess").prop("disabled", true);
    } else{
        $("#takeAGuess").prop("disabled", false);
    }
});

$("#wordDiv").on("click", ()=>{
    if(guessed[current]){
        if(state){
            $("#wordDiv").text(currentWords[current].translated);
            state = false;
        } else {
            $("#wordDiv").text(currentWords[current].original);
            state = true;
        }

    }
});

$("#takeAGuess").on("keydown", (keyPress) => {
    let state = false;
    if (keyPress.key === "Enter") {
        if($("#takeAGuess").val().toLowerCase().trim() === currentWords[current].translated) {
            guesses[0]++;
            $("#correct").html(`Вірно <br> ${guesses[0]}`);
            state = true;
        } else{
            guesses[1]++;
            $("#incorrect").html(`Невірно <br> ${guesses[1]}`);
        }

        $("#takeAGuess").val("");
        $("#takeAGuess").prop("disabled", true);
        guessed[current] = true;

        if(guesses[0] + guesses[1] === currentSize){
            gameEnd();
        }

        if(state){
            if(current != currentSize - 1){
                current+=1;
            } else {
                current-=1;
            }
            $("#wordDiv").text(currentWords[current].original);
            $("#current").text(`${current+1}/${currentSize}`)

            if(!guessed[current]){
                $("#takeAGuess").prop("disabled", false);
            }
        }
    }
});

function gameEnd(){
    let rightPer = Math.round((guesses[0]/currentSize) * 100), wrongPer = Math.round((guesses[1]/currentSize) * 100);
    $("#green").css("width", `${rightPer}%`);
    $("#red").css("width", `${wrongPer}%`);
    $("#overlay").css("display", "flex");

    let addLine;
    if(rightPer == 0){
        addLine = "Спробуй ще раз!";
    } else if(rightPer < 25 ){
        addLine = "Гарна спроба, але недостатньо!";
    } else if(rightPer < 50){
        addLine = "Чудово, але все ще недостатньо!";
    } else if(rightPer < 100){
        addLine = "Чудово!";
    } else if(rightPer == 100){
        addLine = "Мегачудово!";
    }
    $("#comparisonDiv+p").html(`Вірно ${guesses[0]}
        <br> Не вірно ${guesses[1]} 
        <br> ${addLine}`);
}

$("#overlay").on("click", ()=>{
    $("#overlay").css("display", "none");
    easyGuessed.fill(false);
    mediumGuessed.fill(false);
    hardGuessed.fill(false);
    easyGuesses[0] = 0;
    easyGuesses[1] = 0;
    mediumGuesses[0] = 0;
    mediumGuesses[1] = 0;
    hardGuesses[0] = 0;
    hardGuesses[1] = 0;
    current = 0;
    $("#takeAGuess").prop("disabled", false);
    $("#current").text(`${current+1}/${currentSize}`);

    fillWords(currentEasyWords, words);
    fillWords(currentMediumWords, mediumWords);
    fillWords(currentHardwords, hardWords);
    $("#wordDiv").text(currentWords[0].original);
    $("#correct").html(`Вірно <br> ${guesses[0]}`);
    $("#incorrect").html(`Невірно <br> ${guesses[1]}`);
});

function radioFunc(url, difficulty1, difficulty2, difficulty3){
    $("body").css("background-image", url);
    currentWords = difficulty1.slice();
    $("#wordDiv").text(currentWords[current].original);
    guessed = difficulty2;
    if(!guessed[current]){
        $("#takeAGuess").prop("disabled", false);
    } else {
        $("#takeAGuess").prop("disabled", true);
    }
    guesses = difficulty3;
    $("#correct").html(`Вірно <br> ${guesses[0]}`);
    $("#incorrect").html(`Невірно <br> ${guesses[1]}`);
}

$("#easy").on("change", ()=> {
    radioFunc("url(IMG/LR_12.1_BG.jpg)", currentEasyWords, easyGuessed, easyGuesses);
});

$("#medium").on("change", ()=> {
    radioFunc("url(IMG/LR_12.2_BG.jpg)", currentMediumWords, mediumGuessed, mediumGuesses);
});

$("#hard").on("change", ()=> {
    radioFunc("url(IMG/LR_12.3_BG.jpg)", currentHardwords, hardGuessed, hardGuesses);
});
