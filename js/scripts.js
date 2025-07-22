// Dice object constructor
class Dice{
    constructor(){
        this.numbers = [1,2,3,4,5,6];
    }
    // Roll the dice and return a value
    roll() {
        let index = Math.floor(Math.random()*this.numbers.length);
        return this.numbers[index];
    }
}
// Player object constructor
class Player{
    constructor(){
        this.scores = [0,0,0];
        this.die = [0,0];
    }
    calculateTotalScore() {
        return this.scores[0]+this.scores[1]+this.scores[2];
    }
}


// Roll the four die
function executeTurn(player, dealer) {
    player.die[0] = dice.roll();
    player.die[1] = dice.roll();
    player.scores[currentTurn] = calculateScore(player.die[0],player.die[1]);
    dealer.die[0] = dice.roll();
    dealer.die[1] = dice.roll();
    dealer.scores[currentTurn] = calculateScore(dealer.die[0],dealer.die[1]);
    updateHtml(player, dealer);
    currentTurn++;
}

// Update all fields in the HTML
async function updateHtml(player, dealer, reset=false){
    if(reset==false){
        animateDice();
        await sleep(800);
    }
    $('#player-dice-1').attr("src",`../images/${player.die[0]}.svg`);
    $('#player-dice-2').attr("src",`../images/${player.die[1]}.svg`);
    $('#dealer-dice-1').attr("src",`../images/${dealer.die[0]}.svg`);
    $('#dealer-dice-2').attr("src",`../images/${dealer.die[1]}.svg`);
    $('#player-roll-1').html(player.scores[0]);
    $('#player-roll-2').html(player.scores[1]);
    $('#player-roll-3').html(player.scores[2]);
    $('#dealer-roll-1').html(dealer.scores[0]);
    $('#dealer-roll-2').html(dealer.scores[1]);
    $('#dealer-roll-3').html(dealer.scores[2]);
    $('#player-total').html(player.calculateTotalScore());
    $('#dealer-total').html(dealer.calculateTotalScore());
}

// Function to calculate scores
function calculateScore(num1, num2) {
    let score;
    if(num1==1 || num2==1){
        score = 0;
    } else if (num1==num2) {
        score = (num1+num2)*2;
    } else {
        score = num1+num2;
    }
    return score;
}

// Function to animate the dice
function animateDice(){
    diceAnimationFrame = requestAnimationFrame(function(){
        setTimeout(function(){
            if(counter==12){
                counter = 0;
                return;
            } else {
                counter++;
            }
            currentImageString = '../images/'+dice1.roll()+'.svg';
            $playerDice1.attr('src',currentImageString);
            currentImageString = '../images/'+dice1.roll()+'.svg';
            $playerDice2.attr('src',currentImageString);
            currentImageString = '../images/'+dice1.roll()+'.svg';
            $dealerDice1.attr('src',currentImageString);
            currentImageString = '../images/'+dice1.roll()+'.svg';
            $dealerDice2.attr('src',currentImageString);

            diceAnimationFrame = requestAnimationFrame(animateDice);
        },60)
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to show the game result
async function showResult(player, dealer){
    if(player.calculateTotalScore()>dealer.calculateTotalScore()){
        // Show winning message
        $('#game-result').html('🎉 Congratulations, you win! 🎉');
    } else if(player.calculateTotalScore()<dealer.calculateTotalScore()){
        // Show losing message
        $('#game-result').html('😞 You lose, try again 😞');
    } else {
        // Show tied message
        $('#game-result').html("😐 It's a tie, try again 😐");
    }
    await sleep(800);
    $('#game-result').show();
}

// Function to reset the game
function resetGame() {
    currentTurn = 0;
    player.die = [0,0];
    dealer.die = [0,0];
    player.scores = [null,null,null];
    dealer.scores = [null,null,null];
    $('#button-roll-dice').prop('disabled',false).removeClass('disabled-button-style').removeClass('no-hover');
    $('#game-result').hide();
    updateHtml(player,dealer,true);
}

// Create Button action
$(document).ready(function(){
    $('#button-roll-dice').on('click', function() {
        // Button action to execute a turn.
        executeTurn(player,dealer);
        if(currentTurn>2){
            $('#button-roll-dice').prop('disabled',true).addClass('disabled-button-style').addClass('no-hover');
            showResult(player,dealer);
        }
    })
})

$(document).ready(function(){
    $('#button-reset-game').on('click', function() {
        // Button action to reset game
        resetGame();
    })
})

// Set game variables
let currentTurn = 0;
let player = new Player();
let dealer = new Player();
let diceAnimationFrame;
let currentImageString='';
const $playerDice1 = $('#player-dice-1');
const $playerDice2 = $('#player-dice-2');
const $dealerDice1 = $('#dealer-dice-1');
const $dealerDice2 = $('#dealer-dice-2');
let counter = 0;
resetGame();
// Create a dice object
const dice = new Dice();
const dice1 = new Dice();
