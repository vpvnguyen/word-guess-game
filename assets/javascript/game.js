// array of possible choices
var mainArr = ['Bulbasaur','Ivysaur','Venusaur','Charmander','Charmeleon','Charizard','Squirtle','Wartortle','Blastoise','Caterpie','Metapod','Butterfree','Weedle','Kakuna','Beedrill','Pidgey','Pidgeotto','Pidgeot','Rattata','Raticate','Spearow','Fearow','Ekans','Arbok','Pikachu','Raichu','Sandshrew','Sandslash','Nidoran','Nidorina','Nidoqueen','Nidoran','Nidorino','Nidoking','Clefairy','Clefable','Vulpix','Ninetales','Jigglypuff','Wigglytuff','Zubat','Golbat','Oddish','Gloom','Vileplume','Paras','Parasect','Venonat','Venomoth','Diglett','Dugtrio','Meowth','Persian','Psyduck','Golduck','Mankey','Primeape','Growlithe','Arcanine','Poliwag','Poliwhirl','Poliwrath','Abra','Kadabra','Alakazam','Machop','Machoke','Machamp','Bellsprout','Weepinbell','Victreebel','Tentacool','Tentacruel','Geodude','Graveler','Golem','Ponyta','Rapidash','Slowpoke','Slowbro','Magnemite','Magneton','Farfetch\'d','Doduo','Dodrio','Seel','Dewgong','Grimer','Muk','Shellder','Cloyster','Gastly','Haunter','Gengar','Onix','Drowzee','Hypno','Krabby','Kingler','Voltorb','Electrode','Exeggcute','Exeggutor','Cubone','Marowak','Hitmonlee','Hitmonchan','Lickitung','Koffing','Weezing','Rhyhorn','Rhydon','Chansey','Tangela','Kangaskhan','Horsea','Seadra','Goldeen','Seaking','Staryu','Starmie','Mr. Mime','Scyther','Jynx','Electabuzz','Magmar','Pinsir','Tauros','Magikarp','Gyarados','Lapras','Ditto','Eevee','Vaporeon','Jolteon','Flareon','Porygon','Omanyte','Omastar','Kabuto','Kabutops','Aerodactyl','Snorlax','Articuno','Zapdos','Moltres','Dratini','Dragonair','Dragonite','Mewtwo','Mew'];

// blank spaces of the answer
// store the correct answer
// wrong letters guessed
// amount of trys left
var blankArr =  [];
var answer = [];
var wrongArr = [];
var trys = 12;

// score
var wins = 0;
var loses = 0;

// set condition when user input matches the answer
var match = false;

// store amount of times user showed the answer, set condition to not exceed 1 per round
var noobCount = 0;
var answerShown = false;

// add audio to the game
var audioWin = function() {
    document.getElementById('audio-win').play();
};
var audioLose = function() {
    document.getElementById('audio-lose').play();
};
var audioAnswer = function() {
    document.getElementById('audio-answer').play();
};

// pick a random possible choice and push out it's character's blank spaces
var randomize = function() {
    var randomArr = mainArr[Math.floor(Math.random() * mainArr.length)];
    var randomArrUpper = randomArr.toUpperCase();
    answer = randomArrUpper.split('');
    console.log('\n======================');
    console.log(`Random Pick: ${answer}`);
    console.log('======================\n');

    document.getElementById('answer').innerHTML = `answer: ${answer}`;
    // Create blank spaces based on length of the answer
    for (var i = 0; i < answer.length; i++) {
        blankArr.push('_');
        document.getElementById('answer').innerHTML = blankArr.join(' ');
    }
};

// check to see if user's input matches an answer
// if user's input matches, replace the blank space(s) with the correct letter(s)
// if user's input does not match, store input in wrong array and lose a try 
var check = function(a) {
    // set condition to choose what happens when the input matches/mismatches
    match = false;
    // loop through the answer to see if input matches
    for (var i = 0; i < answer.length; i++) {
        // if input matches an answer and is not included in the blank array
        if (a === answer[i] && (!blankArr[i].includes(a))) {
            console.log(`==== MATCH! ====`);
            blankArr[i] = a;
            // set match to true to skip the rest
            match = true;
        }  
    }
    // set match to false to run if item did not match; if input is not in wrong array and the input is not the correct answer
    // store input into wrong array and lose a try
    if (match === false && wrongArr.indexOf(a) === -1 && answer.indexOf(a) === -1) {
        console.log('**** NO MATCH ****');
        wrongArr.push(a);
        trys--;
    }
};

// affect the dom
var showHtml = function() {
    document.getElementById('answer').innerHTML = blankArr.join(' ');
    document.getElementById('wrong').innerHTML = `Wrong Key: ${wrongArr.join(' ')}`;
    document.getElementById('trys').innerHTML = `Trys Left: ${trys} / 12`;
    document.getElementById('wins').innerHTML = `Wins: ${wins}`;
    document.getElementById('loses').innerHTML = `Loses: ${loses}`;
    document.getElementById('game').innerHTML = ``;
    if (noobCount > 0) {
        document.getElementById('noob-count').innerHTML = `Hints Used: ${noobCount}`;
    }
};

// advance to next round when user wins or loses
// reset global variables except for score
var next = function() {
    // lose if trys = 0
    if (trys === 0) {
        audioLose();
        loses++;
        showHtml();
        blankArr =  [];
        answer = [];
        wrongArr = [];
        trys = 12;
        match = false;
        answerShown = false;
        randomize();
        showHtml();
        document.getElementById('show-answer').innerHTML = `Show Answer`; 
    }
    // wins if answer matches blankarr
    if (answer.toString() === blankArr.toString()) {
        wins++;
        audioWin();
        showHtml();
        blankArr =  [];
        answer = [];
        wrongArr = [];
        trys = 12;
        match = false;
        answerShown = false;
        randomize();
        showHtml();
        document.getElementById('show-answer').innerHTML = `Show Answer`; 
    }
};

// show the answer and add to noobCount, display noobCount as amount of hints used
var showAnswer = function() {
    audioAnswer();
    var displayAnswer = answer.join(' ');
    document.getElementById('show-answer').innerHTML = `${displayAnswer}`; 
    if (!answerShown) {
        noobCount++;
        answerShown = true;
        showHtml();
    }
};

var highScore = function () {
    console.log('\n<----- HIGH SCORES ----->');
    console.log('CK | Wins: 100 | Loses: 000 | Hints: 000');
    console.log('CM | Wins: 020 | Loses: 001 | Hints: 000');
    console.log('RM | Wins: 004 | Loses: 001 | Hints: 000');
    console.log('<----- End HIGH SCORES ----->\n');
}

// game execution
// pick a random answer
randomize();
// when user presses a key
document.onkeyup = function(event) {
    console.log(`\n`);
    // save the key press
    if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 222 || event.keyCode == 32) {
        var keyPress = event.key;
        var userInput = keyPress.toUpperCase();
        console.log(`Key pressed: ${userInput}`);
        // check if input matches or mismatches
        check(userInput);
        // display correct or incorrect guesses
        showHtml();
        // check if user win or lose
        next();
    } else {
        alert(`Characters Allowed: \nLetter: A-Z \nApostrophe: ' \nPeriod: . \nspacebar: [ ]`);
    }
    console.log(`Current Guess: ${blankArr}`);
    console.log(`Wrong Letters: ${wrongArr}`);
    console.log(`Trys: ${trys} | Wins: ${wins} | Loses: ${loses}`);
};