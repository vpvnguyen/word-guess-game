var array = ["m", "a", "d", "o", "n"]; // madonna
var wrong = 12;

document.onkeyup = function (a) {
    var userGuess = a.key;
    console.log("User input: " + userGuess);

    // Start game logic
    if (userGuess === 'm') {
        document.getElementById("first-letter").innerHTML = "m";
    } else if (userGuess === 'a') {
        document.getElementById("second-letter").innerHTML = "a";
        document.getElementById("seventh-letter").innerHTML = "a";
    } else if (userGuess === 'd') {
        document.getElementById("third-letter").innerHTML = "d";
    } else if (userGuess === 'o') {
        document.getElementById("fourth-letter").innerHTML = "o";
    } else if (userGuess === 'n') {
        document.getElementById("fifth-letter").innerHTML = "n";
        document.getElementById("sixth-letter").innerHTML = "n";
    } else if (array.indexOf(userGuess) === -1) {
        wrong--; // lose a point
        document.getElementById("wrong").innerHTML = " " + wrong;
        console.log("Points left: " + wrong);
    }
}