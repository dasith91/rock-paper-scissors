"use strict"

function computerPlay() {
    const selections = ["Rock", "Paper", "Scissors"];
    let selectionIndex = Math.floor(Math.random() * 3);

    return selections[selectionIndex];
}

function playAround(playerSelection, computerSelection) {
    const rockRgex = /^(Rock)$/ig;
    const paperRgex = /^(Paper)$/ig;
    const scissorRgex = /^(Scissors)$/ig;
    const drawMessage = "The computer thinking like you therefore game is a draw!";

    if (rockRgex.test(playerSelection)) {
        switch (computerSelection) {
            case 'Paper':
                return "You Lose! Paper beats Rock";
                break;
            case 'Scissors':
                return "You Win! Rock beats Scissor";
                score++
                break;
            default:
                return drawMessage
                break;
        }
    } else if (paperRgex.test(playerSelection)) {
        switch (computerSelection) {
            case 'Rock':
                return "You Win! Paper beats Rock";
                break;
            case 'Scissors':
                return "You Lose! Scissor beats Paper";
                break;
            default:
                return drawMessage
                break;
        }
    } else if (scissorRgex.test(playerSelection)) {
        switch (computerSelection) {
            case 'Rock':
                return "You Lose! Rock beats Scissor";
                break;
            case 'Paper':
                return "You win! Scissor beats Paper";
                break;
            default:
                return drawMessage
                break;
        }
    } else {
        return "Wrong selection!";
    }
}

function game() {
    let playerSelection;

    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Insert 'Rock, Paper or Scissors'");

        let computerSelection = computerPlay();
        let result = playAround(playerSelection, computerSelection);

        alert(result);
    }

    // alert(`Your score ${score}/5`)
}

game();
