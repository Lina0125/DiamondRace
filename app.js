const colorArray = ['blue', 'green', 'red', 'yellow']
const gameGrid = document.querySelector('.game-grid')
const scoreGrid = document.querySelector('.score-grid')
const diamondWidth = 60
const firstDimondYAxis = 50
const diamondMargin = 100
const diamondStartXAxis = -(diamondWidth / 2)
const barWidth = 600
const barHight = 20
const barMargin = 30

//Get position of every diamonds and score bar
class GetCoordinate {
    constructor(xAxis, yAxis, shapeWidth, shapeHight) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + shapeWidth, yAxis]
        this.topRight = [xAxis + shapeWidth, yAxis + shapeHight]
        this.topLeft = [xAxis, yAxis + shapeHight]
    }
}

//All position for 4 diamonds
const diamondPositions = [
    new GetCoordinate(diamondStartXAxis, firstDimondYAxis + diamondMargin * 3, diamondWidth, diamondWidth),
    new GetCoordinate(diamondStartXAxis, firstDimondYAxis + diamondMargin * 2, diamondWidth, diamondWidth),
    new GetCoordinate(diamondStartXAxis, firstDimondYAxis + diamondMargin, diamondWidth, diamondWidth),
    new GetCoordinate(diamondStartXAxis, firstDimondYAxis, diamondWidth, diamondWidth)
]

//All position for 4 score bars
const scoreBarPositions = [
    new GetCoordinate(0, barMargin * 3, barWidth, barHight),
    new GetCoordinate(0, barMargin * 2, barWidth, barHight),
    new GetCoordinate(0, barMargin, barWidth, barHight),
    new GetCoordinate(0, 0, barWidth, barHight)
]

 function startBoard() {
    for (let i = 0; i < colorArray.length; i++) {
        //Add diamonds
        const diamond = document.createElement('div')
        diamond.classList.add('diamond')
        diamond.setAttribute('data-id', i)
        diamond.style.left = diamondPositions[i].bottomLeft[0] + 'px'
        diamond.style.bottom = diamondPositions[i].bottomLeft[1] + 'px'
        diamond.style.backgroundColor = colorArray[i]
        gameGrid.appendChild(diamond)
        //Add score bars
        const scoreBar = document.createElement('div')
        scoreBar.classList.add('score-bar')
        scoreBar.setAttribute('data-id', i)
        scoreBar.style.left = scoreBarPositions[i].bottomLeft[0] + 'px'
        scoreBar.style.bottom = scoreBarPositions[i].bottomLeft[1] + 'px'
        scoreBar.style.backgroundColor = colorArray[i]
        scoreGrid.appendChild(scoreBar)
        // Add scores
        const score = document.createElement('div')
        score.textContent = 0
        score.classList.add('score')
        score.setAttribute('data-id', i)
        score.style.left = scoreBarPositions[i].bottomLeft[0] + 90 + 'px'
        score.style.bottom = scoreBarPositions[i].bottomLeft[1] + 'px'
        scoreGrid.appendChild(score)
    }
}

//Move diamond, calculate score. If score == 10, window stop until reset game
function moveDiamond() {
    let diamondId = this.getAttribute('data-id')
    let previousPosition = this.style.left
    let currentScore = Number(scores[diamondId].textContent)
    if (currentScore < 10) {
        previousPosition = Number(previousPosition.substr(0, previousPosition.length - 2))
        this.style.left = previousPosition + diamondWidth + 'px'
        scores[diamondId].textContent = currentScore + 1
    }
    //Check if it's now to stop
    if (currentScore + 1 == 10) {
        scores[diamondId].style.color = 'red'
        diamonds.forEach(diamonds => diamonds.removeEventListener('click', moveDiamond))
    }
}

function startGame() {
    startBoard()
    //Use these 2 classes globally
    diamonds = document.querySelectorAll('.diamond')
    scores = document.querySelectorAll('.score')
    diamonds.forEach(diamonds => diamonds.addEventListener('click', moveDiamond))
}

//Start the game until reset
startGame()

//Set reset command if click reset button
function playAgain() {
    //Clean global var
    diamonds.forEach(diamonds => diamonds.remove())
    scores.forEach(scores => scores.remove())
    startGame()
}