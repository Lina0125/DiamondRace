class Diamond {
    constructor(coordinate, color, width, id) {
        this.coordinate = coordinate
        this.color = color
        this.width = width
        this.id = id
    }
    initiateDiamond() {
        const diamond = document.createElement('div')
        diamond.classList.add('diamond')
        diamond.setAttribute('data-id', this.id)
        diamond.style.left = this.coordinate[0] + 'px'
        diamond.style.bottom = this.coordinate[1] + 'px'
        diamond.style.backgroundColor = this.color
        diamond.style.width = this.width + 'px'
        diamond.style.height = this.width + 'px'
        return diamond
    }
}

class Score {
    constructor(coordinate, id) {
        this.coordinate = coordinate
        this.id = id
    }
    initiateScore() {
        const score = document.createElement('div')
        score.textContent = 0
        score.classList.add('score')
        score.setAttribute('data-id', this.id)
        score.style.left = this.coordinate[0] + 'px'
        score.style.bottom = this.coordinate[1] + 'px'
        return score
    }
}

let diamonds
let scores
const colorArray = ['blue', 'green', 'red', 'yellow']
const gameGrid = document.querySelector('.game-grid')
const scoreGrid = document.querySelector('.score-grid')
const diamondWidth = 60
const diamondsArray = [
    new Diamond([-30, 350], colorArray[0], diamondWidth, 0),
    new Diamond([-30, 250], colorArray[1], diamondWidth, 1),
    new Diamond([-30, 150], colorArray[2], diamondWidth, 2),
    new Diamond([-30, 50], colorArray[3], diamondWidth, 3)
]
const scoresArray = [
    new Score([90, 90], 0),
    new Score([90, 60], 1),
    new Score([90, 30], 2),
    new Score([90, 0], 3)
]

function drawScoreBar() {
    for (let i = 0; i < colorArray.length; i++) {
        const scoreBar = document.createElement('div')
        scoreBar.classList.add('score-bar')
        scoreBar.style.left = '0px'
        scoreBar.style.bottom = 90 - i * 30 + 'px'
        scoreBar.style.backgroundColor = colorArray[i]
        scoreGrid.appendChild(scoreBar)
    }
}

drawScoreBar()

function moveDiamond() {
    const diamondId = this.getAttribute('data-id')
    const previousPosition = Number(this.style.left.substr(0, this.style.left.length - 2))
    const currentScore = Number(scores[diamondId].textContent)
    if (currentScore < 10) {
        this.style.left = previousPosition + diamondWidth + 'px'
        scores[diamondId].textContent = currentScore + 1
    }
    if (currentScore + 1 == 10) {
        scores[diamondId].style.color = 'red'
        diamonds.forEach(diamonds => diamonds.removeEventListener('click', moveDiamond))
    }
}

function startGame() {
    diamondsArray.forEach(diamond => gameGrid.appendChild(diamond.initiateDiamond()))
    scoresArray.forEach(score => scoreGrid.appendChild(score.initiateScore()))
    diamonds = document.querySelectorAll('.diamond')
    scores = document.querySelectorAll('.score')
    diamonds.forEach(diamondChild => diamondChild.addEventListener('click', moveDiamond))
}

startGame()

function playAgain() {
    //Clean global var
    diamonds.forEach(diamondChild => diamondChild.remove())
    scores.forEach(scoreChild => scoreChild.remove())
    startGame()
}