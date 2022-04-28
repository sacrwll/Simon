var currentButton = 0;
var currentStreak = 0
var longestStreak = 0;
var sequence = [];

/* Add a color to the sequence depending on what random number
is generated.*/
function addToSequence() {

    randomNum = Math.floor(Math.random() * 4);

    switch (randomNum) {
        case 0:
            sequence.push("green");
            break;
        case 1:
            sequence.push("red");
            break;
        case 2:
            sequence.push("yellow");
            break;
        case 3:
            sequence.push("blue");
            break;
    }
}

/* Highlight the selected button by adding a css class called
gameButtonAnimated then remove that class after 500ms. The 
class sets opacity to 100% where default is 50%*/
function animateButton(buttonColor) {

    $(`#${buttonColor}`).addClass("gameButtonAnimated");

    setTimeout(function () {
        $(`#${buttonColor}`).removeClass("gameButtonAnimated");
    }, 500);
}

/* New game: reset variables back to 0 or [], remove the start
button,  start a new sequence and play it*/
function newGame() {
    currentButton = 0;
    sequence = [];
    currentStreak = 0;

    $("h2").html("Game on!");
    $("#gameOver").hide();

    addToSequence();
    playSequence();
}

/* Play sequence of colors - First disable the player buttons,
then set them to be reenabled after the same time it takes to
play the entire sequence. Then loop loop through the colors in
the sequence triggering animateButton for them all */
function playSequence() {

    $(".gameButton").prop("disabled", true);
    setTimeout(function () {
        $(".gameButton").prop("disabled", false);
    }, ((sequence.length + 1) * 800));

    for (let i = 0; i < sequence.length; i++) {
        setTimeout(function () {
            animateButton(sequence[i])
        }, ((i + 1) * 800));
    }
}

/* Functioned triggered when a game button is pressed,
game logic happens in here*/
function pressButton() {

    //first get the button color and animate the pressed button
    buttonColor = event.target.id;
    animateButton(buttonColor);

    /* Check to see is the pressed button matches the current color
    in the series. If the colors don't match its game over, so the 
    'New Game!' button is added back and the game buttons are disabled*/
    if (sequence[currentButton] != buttonColor) {
        $("h2").html('<button id="startButton" onclick="newGame()">New Game!</button>');
        $(".gameButton").prop("disabled", true);
        $("#gameOver").show();
    }

    /* Button color was ok, so check if the pressed button is the end
    of the sequence, if not add one to the current button */
    else if ((currentButton + 1) != sequence.length) {
        currentButton++;
    }

    /* Button color was ok, the player is at the end of the color sequence,
    so update the player streak, add another color to the sequence, play the
    sequence and reset the current button*/
    else {
        if (currentButton > longestStreak) {
            longestStreak = currentButton;
        }
        if (currentButton > currentStreak) {
            currentStreak = currentButton;
        }
        $("#streak").html(`Current Streak: ${currentStreak + 1}</br>Best Streak: ${longestStreak + 1}`);

        addToSequence();
        playSequence();
        currentButton = 0;
    }
}

$(".gameButton").on("click", pressButton);
