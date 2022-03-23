"use strict"
const main = document.querySelector('.main');
const machine = document.querySelector('#machine');
const machineText = document.querySelector('.machine-message');
const selectionLayout = document.querySelector('.selection-temp');
const selectionButtons = document.querySelectorAll('.selection-btn');
const scoreBoard = document.querySelectorAll('.score-text');
const scoreCard = document.createElement('div');
const scoreCardHeader = document.createElement('div');
const scoreCardContent = document.createElement('div');
const header = document.createElement('h3');
const paragraph = document.createElement('p');
const button = document.createElement('button');
const gameObject = {
    numberOfAttempt: 0,
    machineSelection: "",
    machineScore: 0,
    playerSelection: "",
    playerScore: 0,
    message: "Shoot",
    tie: 0,
    get selectionPair() {
        return this.playerSelection + this.machineSelection
    }
};

scoreCard.className = 'card';
scoreCardHeader.className = 'card-header';
scoreCardContent.className = 'card-content';
button.id = 'try_again';
button.className = 'btn-green';
button.textContent = 'Try Again';
scoreCardHeader.appendChild(header);
scoreCardContent.append(paragraph, button)
scoreCard.append(scoreCardHeader, scoreCardContent)


function fetchGameData() {
    let payload;

    if (localStorage.getItem('gameData') === null) {
        addGameDataToLocalStorage(gameObject)
        payload = JSON.parse(localStorage.getItem('gameData'))
    } else {
        payload = JSON.parse(localStorage.getItem('gameData'))
    }

    return payload
    // console.table(payload)
}

function gameLayout() {
    const { numberOfAttempt, message, machineScore, playerScore, tie } = fetchGameData();

    // Selection layout
    machineText.textContent = message;
    scoreBoard[0].textContent = `${machineScore} Machine`
    scoreBoard[1].textContent = `${playerScore} Player`
    scoreBoard[2].textContent = `${tie} Tie`

    // Score card layout

    if (numberOfAttempt == 5) {
        main.removeChild(selectionLayout)
        main.appendChild(scoreCard)
        header.textContent = 'You Win!'
        paragraph.textContent = `${playerScore}/5`
        const resetBtn = document.querySelector('#try_again')
        resetBtn.addEventListener('click', resetLayout)
    } 

}   
gameLayout()

// Reset selection layout
function resetLayout() {
    localStorage.removeItem('gameData')
    main.removeChild(scoreCard)
    main.appendChild(selectionLayout)
    location.reload()
}

function addGameDataToLocalStorage(data) {
    localStorage.setItem('gameData', JSON.stringify({ fetchGameData, ...data }))
}

function computerPlay() {
    const computerSelections = ['r', 'p', 's'];
    const selectionIndex = Math.floor(Math.random() * 3)

    return computerSelections[selectionIndex]
}

function playAround() {
    const { numberOfAttempt, machineScore, playerScore, tie } = fetchGameData();

    gameObject.numberOfAttempt = numberOfAttempt + 1;

    switch (gameObject.selectionPair) {
        case 'pr':
        case 'sp':
        case 'rs':
            gameObject.message = "Player Win"
            gameObject.playerScore = playerScore + 1
            gameObject.machineScore = machineScore
            gameObject.tie = tie
            break;
        case 'sr':
        case 'rp':
        case 'ps':
            gameObject.message = "Machine Win"
            gameObject.machineScore = machineScore + 1
            gameObject.playerScore = playerScore
            gameObject.tie = tie
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            gameObject.message = "Game is Tie"
            gameObject.tie = tie + 1
            gameObject.machineScore = machineScore
            gameObject.playerScore = playerScore
            break;
    }

    addGameDataToLocalStorage(gameObject)
    gameLayout()
    // console.log(rockPaperScissors.selectionPair)
}

function gamePlay(e) {
    gameObject.playerSelection = e.target.value;
    gameObject.machineSelection = computerPlay();
    playAround()

    console.log(e.target.value)
}

for (let selectionBtn of selectionButtons) {
    selectionBtn.addEventListener('click', gamePlay)
}





// let previewPage = "Home"
// const homeTemplate = document.createElement('div');
// const logoImg = document.createElement('img');
// const shootBtn = document.createElement('button');
// shootBtn.id = "shoot-btn"
// shootBtn.className = "btn-green";
// shootBtn.textContent = "Shoot";
// const selectionTemplate = document.createElement('div');
// const machineNode = document.createElement('div');
// const machineContent = document.createElement('div');
// machineNode.className = "card";
// machineContent.className = "card-content";
// machineContent.textContent = "This is machine";


// // Helper function: Set attributes to the element
// function setAttributes(ele, attributes) {
//     Object.keys(attributes).forEach((attribute, key) => {
//         ele.setAttribute(attribute, Object.values(attributes)[key])
//     })
// }

// // Set attributes to the 'img' element
// setAttributes(logoImg, {
//     src: "./img/log.png",
//     alt: "RockPaperScissors Image",
//     width: "128",
//     height: "128"
// });

// homeTemplate.append(logoImg, shootBtn);
// machineNode.appendChild(machineContent)
// selectionTemplate.appendChild(machineNode);

// function previewPageTemplate() {
//     switch(previewPage) {
//         // case 'Home':
//         //     main.appendChild(homeTemplate);
//         //     main.removeChild(selectionTemplate);
//         //     break;
//         case 'Selection':
//             main.appendChild(selectionTemplate);
//             main.removeChild(homeTemplate);
//             break;
//         default:
//             main.appendChild(homeTemplate);
//             break;
//     }
// }
// previewPageTemplate()

// document.querySelector('#shoot-btn').addEventListener('click', () => {
//     previewPage = "Selection";
//     previewPageTemplate()
// });




// // Return "Rock, Paper or Scissor" randomly selected by the computer
// function computerPlay() {
//     const selections = ["Rock", "Paper", "Scissors"];
//     let selectionIndex = Math.floor(Math.random() * 3);

//     return selections[selectionIndex];
// }

// // Compare player selection and computer selection and return result
// function playAround(playerSelection, computerSelection) {
//     const rockRgex = /^(Rock)$/ig;
//     const paperRgex = /^(Paper)$/ig;
//     const scissorRgex = /^(Scissors)$/ig;
//     let playerCurrentSelection = null;
//     //const drawMessage = "The computer thinking like you therefore game is a draw!";

//     if (rockRgex.test(playerSelection)) {
//         playerCurrentSelection = "Rock";
//     } else if (paperRgex.test(playerSelection)) {
//         playerCurrentSelection = "Paper";
//     } else if (scissorRgex.test(playerSelection)) {
//         playerCurrentSelection = "Scissors";
//     } else {
//         playerCurrentSelection = null;
//     }

//     if (
//         (playerCurrentSelection == "Rock" && computerSelection == "Scissors") ||
//         (playerCurrentSelection == "Paper" && computerSelection == "Rock") ||
//         (playerCurrentSelection == "Scissors" && computerSelection == "Paper")
//     ) {
//         return `You Win! ${playerCurrentSelection} beats ${computerSelection}`;
//     } else if (
//         (playerCurrentSelection == "Rock" && computerSelection == "Paper") ||
//         (playerCurrentSelection == "Paper" && computerSelection == "Scissors") ||
//         (playerCurrentSelection == "Scissors" && computerSelection == "Rock")
//     ) {
//         return `You Lose! ${computerSelection} beats ${playerCurrentSelection}`;
//     } else if (
//         (playerCurrentSelection == "Rock" && computerSelection == "Rock") ||
//         (playerCurrentSelection == "Paper" && computerSelection == "Paper") ||
//         (playerCurrentSelection == "Scissors" && computerSelection == "Scissors")
//     ) {
//         return "The computer thinking like you therefore game is a draw!";
//     } else {
//         return "Wrong selection!";
//     }


//     // if (rockRgex.test(playerSelection)) {
//     //     switch (computerSelection) {
//     //         case 'Paper':
//     //             return "You Lose! Paper beats Rock";
//     //             break;
//     //         case 'Scissors':
//     //             return "You Win! Rock beats Scissor";
//     //             break;
//     //         default:
//     //             return drawMessage
//     //             break;
//     //     }
//     // } else if (paperRgex.test(playerSelection)) {
//     //     switch (computerSelection) {
//     //         case 'Rock':
//     //             return "You Win! Paper beats Rock";
//     //             break;
//     //         case 'Scissors':
//     //             return "You Lose! Scissor beats Paper";
//     //             break;
//     //         default:
//     //             return drawMessage
//     //             break;
//     //     }
//     // } else if (scissorRgex.test(playerSelection)) {
//     //     switch (computerSelection) {
//     //         case 'Rock':
//     //             return "You Lose! Rock beats Scissor";
//     //             break;
//     //         case 'Paper':
//     //             return "You win! Scissor beats Paper";
//     //             break;
//     //         default:
//     //             return drawMessage
//     //             break;
//     //     }
//     // } else {
//     //     return "Wrong selection!";
//     // }
// }

// // Exicute playAround function around five times and it provides final score
// function game() {
//     let playerSelection;
//     let score = 0;

//     for (let i = 0; i < 5; i++) {
//         playerSelection = window.prompt("Insert 'Rock, Paper or Scissors'");

//         const winRgex = /\b(Win)\b/g;
//         let computerSelection = computerPlay();
//         let result = playAround(playerSelection, computerSelection);

//         alert(result);
//         if (winRgex.test(result)) { score++ }

//     }

//     alert(`Your score ${score}/5`)
// }

// game();
