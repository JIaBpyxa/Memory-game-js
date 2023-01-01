let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(".btn").on("click", onButtonClicked);
$(document).on("keydown" ,startGame);

function onButtonClicked(button) {
    let clickedColour = button.target.id;
    userClickedPattern.push(clickedColour);
    playSound(clickedColour);
    animatePress(clickedColour);
    checkAnswer();
}

function startGame() {
    if (level === 0) {
        gamePattern = [];
        nextSequence();
    }
}

function nextSequence() {
    level++;
    userClickedPattern = [];

    $("h1").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * buttonColours.length);
    let randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);

    let buttonObject = $(`.${randomColour}`);
    buttonObject
        .animate({opacity: 0.3}, 200)
        .animate({opacity: 1}, 200);

    playSound(randomColour);
}

function playSound(colour) {
    let audio = new Audio(`sounds/${colour}.mp3`);
    audio.play();
}

function animatePress(colour) {
    let buttonObject = $(`.${colour}`);
    buttonObject.addClass("pressed");
    setTimeout(function () {
        buttonObject.removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] === gamePattern[i]) {
            continue;
        }

        wrongAnswer();
        return;
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
    }
}

function wrongAnswer() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    level = 0;
}