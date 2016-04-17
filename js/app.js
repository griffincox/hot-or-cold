// sets SecretNum to 0 on page load
var secretNum = 0;
var count = 0;
var guess = $("#userGuess").val();
var previousGuesses = [];
$(document).ready(function() {
	// /* Begins a new game on page load */
	newGame();
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});
  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
	/* on "+ New Game" click, calls newGame */
	$(".new").click(function () {
		newGame();
	});
});
// Function to reset game
function newGame() {
	console.log("called newGame");
	// Pick a new random number 1-100
	secretNum = Math.floor((Math.random() * 100) + 1);
	console.log('secretNum is ' + secretNum);
	// Resets feedback to "Make your Guess!"
	$("#feedback").text("Make your Guess!");
  // Clears past guesses
  $("#guessList").empty();
	// Shows inputs
	$("input").show();
	// resets guess count
	count = 0;
	$("#count").text("0");
	// resets placeholder
	$("#userGuess").attr("placeholder", "Enter your Guess");
	// resets previous guesses array
	previousGuesses = [];
}
// Form submission handler
$("form").submit(function() {
	guess = $("#userGuess").val();
	console.log("secretNum is " + secretNum);
	console.log("user guessed " + guess);
	// Check if guess is 1 <= integer <= 1-100
	if (isInt(guess) && guess >=1 && guess <= 100) {
		// Check if previous guessed
		if (previousGuesses.indexOf(guess) == -1) {
			// Prepend to previousGuesses array
			previousGuesses.push(guess);
			console.log("previous guesses: " + previousGuesses);
				// Calculuate difference between guess and the secretNum
				var guessDifference = Math.abs((guess - secretNum));
				console.log("guessDifference was " + guessDifference);
				if (guessDifference >= 40) {
					console.log("guess more than 40 units away from secretNum");
					$("#feedback").text("Cold");
					countUpdate();
				}
				else if (guessDifference >= 20) {
					console.log("guess more than 20 units away from secretNum");
					$("#feedback").text("Warm");
					countUpdate();
				}
				else if (guessDifference >= 10) {
					console.log("guess more than 10 units away from secretNum");
					$("#feedback").text("Hot");
					countUpdate();
				}
				else if (guessDifference >= 1) {
					console.log("guess more than 1 units away from secretNum");
					$("#feedback").text("Very Hot");
					countUpdate();
				}
				else {
					console.log("guess = secretNum");
					$("#feedback").text("You Win! Click New Game to start over");
					countUpdate();
					$("input").hide();
					count = 0;
				}
			}
			else {
				guessedPreviously();
				return false;
			}
		}
		else {
			invalidEntry();
			return false;
		}
		return false;
	});
function isInt(n) {
	return n % 1 === 0;
}
function countUpdate() {
	count ++;
	$("#count").text(count);
	$("#guessList").prepend('<li>'+guess+'</li>');
	$("#userGuess").val("");
	$("#userGuess").attr("placeholder", "");
	return false;
}
function invalidEntry() {
	$("#feedback").text("Guess must be an integer between 1-100");
	$("#userGuess").val("");
	$("#userGuess").attr("placeholder", "");
	return false;
}
function guessedPreviously() {
	$("#feedback").text("You already guessed that number");
	$("#userGuess").val("");
	$("#userGuess").attr("placeholder", "");
	return false;
}
