"use strict"
/**
 * Rock Paper Scissors Game
 */
const main = document.querySelector('.main');
const machine = document.querySelector('.machine');
const machineText = document.querySelector('.machine-text');
const selectionLayout = document.querySelector('.selection-temp');
const selectionButtons = document.querySelectorAll('.selection-btn');
const scoreBoard = document.querySelectorAll('.score-text');
const messageBox = document.querySelector('.message-box')
const messageText = document.createElement('p');
const resetBtn = document.createElement('button');
const defaultMachineImg = document.querySelector('.machine-img');
const gameObject = {
    numberOfAttempt: 0,
    machineSelection: "",
    machineScore: 0,
    machineImg: "",
    playerSelection: "",
    playerScore: 0,
    message: "Shoot",
    tie: 0,
    get selectionPair() {
        return this.playerSelection + this.machineSelection
    }
};

function fetchGameData() {
    let payload;

    if (localStorage.getItem('gameData') === null) {
        addGameDataToLocalStorage(gameObject)
        payload = JSON.parse(localStorage.getItem('gameData'))
    } else {
        payload = JSON.parse(localStorage.getItem('gameData'))
    }

    return payload
}

function gameLayout() {
    const { numberOfAttempt, message, machineSelection, machineScore, playerSelection, playerScore, tie } = fetchGameData();

    // Score board layout
    scoreBoard[0].textContent = `${machineScore} Machine`
    scoreBoard[1].textContent = `${playerScore} Player`
    scoreBoard[2].textContent = `${tie} Tie`

    // Player score layout
    if (numberOfAttempt === 5) {
        machine.removeChild(defaultMachineImg)
        displayMessageBox()
    }

    // Machine selection layout
    if (gameObject.machineImg !== "") {
        const img = document.createElement('img');
        
        setAttributes(img, {
            src: gameObject.machineImg,
            alt: (machineSelection === 'r') ? 'Rock' : (machineSelection === 'p') ? 'Paper' : 'Scissors',
            class: 'machine-selection-img',
            width: 72,
            height: 72
        })
        img.style.padding = '6px 20px'
        defaultMachineImg.style.display = "none"
        machineText.style.margin = '9em auto'
        machineText.textContent = `Machine select ${(machineSelection === 'r') ? 'Rock' : (machineSelection === 'p') ? 'Paper' : 'Scissors'} ${message}`
        machine.append(img, machineText)
        isDisableSelectionButton(true)
        activeSelectionButton(playerSelection, 'active')

        setTimeout(() => {
            machine.removeChild(img)
            defaultMachineImg.style.display = "flex";
            machineText.style.margin = '11em auto'
            machineText.textContent = (numberOfAttempt !== 5) ? "Shoot" : "";
            isDisableSelectionButton(false)
            activeSelectionButton(playerSelection, 'inactive')
        }, 1300)
    }
}
gameLayout()

function resetLayout() {
    localStorage.removeItem('gameData')
    location.reload()
}

function displayMessageBox() {
    setTimeout(() => {
        defaultMachineImg.style.display = "none"
        machineText.style.display = "none"
        messageText.className = "message-text"
        messageText.textContent = createMessage(fetchGameData())
        resetBtn.className = "btn-green"
        resetBtn.textContent = "Try Again"
        resetBtn.addEventListener('click', resetLayout)
        messageBox.append(messageText, resetBtn)
        isDisableSelectionButton(true)
    }, 1500)
}

function createMessage({ playerScore, machineScore }) {
    let msg;

    if (playerScore > machineScore) {
        msg = `${playerScore}/5 You win! and machine lost the game.`
    }

    if (playerScore < machineScore || (playerScore == 0 && machineScore == 0)) {
        msg = `${playerScore}/5 You lost! and machine win the game.`
    }

    if (playerScore != 0 && machineScore != 0) {
        if (playerScore == machineScore) msg = "Game is draw!"
    }

    return msg;
}

function isDisableSelectionButton(value) {
    for (let selectionButton of selectionButtons) {
        selectionButton.disabled = value
    }
    
}

function activeSelectionButton(playerSelect, status) {
    selectionButtons.forEach((selectedButton, key) => {
        if(selectedButton.value == playerSelect) {
            if(status == 'active') {
                selectedButton.style.border = '4px solid black'
                selectedButton.style.transition = '1s'
            }

            if(status == 'inactive') {
                selectedButton.style.border = '4px solid #b56be1'
                selectedButton.style.transition = '1s'
            }
        }
    })
}

function addGameDataToLocalStorage(data) {
    localStorage.setItem('gameData', JSON.stringify(data))
}

function computerPlay() {
    const computerSelections = [
        { r: './img/rock-machine.png' },
        { p: './img/paper-machine.png' },
        { s: './img/scissors-machine.png' }
    ];
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
            gameObject.message = "Player Win!"
            gameObject.playerScore = playerScore + 1
            gameObject.machineScore = machineScore
            gameObject.tie = tie
            break;
        case 'sr':
        case 'rp':
        case 'ps':
            gameObject.message = "Machine Win!"
            gameObject.machineScore = machineScore + 1
            gameObject.playerScore = playerScore
            gameObject.tie = tie
            break;
        case 'rr':
        case 'pp':
        case 'ss':
            gameObject.message = "Game is Tie!"
            gameObject.tie = tie + 1
            gameObject.machineScore = machineScore
            gameObject.playerScore = playerScore
            break;
    }

    addGameDataToLocalStorage(gameObject)
    gameLayout()
}

function gamePlay(e) {
    const computerPlayObj = computerPlay();

    gameObject.playerSelection = e.target.value;
    gameObject.machineSelection = Object.keys(computerPlayObj).toString();
    gameObject.machineImg = Object.values(computerPlayObj).toString();
    playAround()

}

for (let selectionBtn of selectionButtons) {
    selectionBtn.addEventListener('click', gamePlay)
}

function setAttributes(tagName, attributes) {
    Object.keys(attributes).forEach((attribute, key) => {
        tagName.setAttribute(attribute, Object.values(attributes)[key])
    })
}
