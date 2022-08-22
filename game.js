var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


// button event
$('.btn').on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    if(userClickedPattern.length == gamePattern.length) {
        setTimeout(nextSequence, 1000);
    }
})


$('body').on('keydown', function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});


// function that generates random numbers
function nextSequence() {
    // random generation event
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenNumber = buttonColors[randomNumber];

    gamePattern.push(randomChosenNumber);

    // animation and sound for the button
    $("#" + randomChosenNumber).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenNumber);

    // incrementing level
    $('#level-title').text('Level ' + ++level);

    //reset user clicked pattern
    userClickedPattern = [];
    // counter = 0;
}





// function to play sound
function playSound(name) {
    new Audio('sounds/' + name + '.mp3').play();
}



// key press animation
function animatePress(currentColor) {
    var temp = $('#' + currentColor);
    temp.addClass('pressed');
    setTimeout( function() {    temp.removeClass('pressed')    }, 100);
}





function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function() {$('body').removeClass('game-over') }, 200);
        $('#level-title').text('Game Over, Press any key to Restart');
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
}