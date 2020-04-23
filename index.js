let minesweeper = {
    config:{
        cells: 9,
        bombs: 10,
        activeBombs: 0
    },
    generateSquare: ()=>{
        // console.log("GenerateSquare")
        // sets square to 1 or 0
        let type = 0
        if(minesweeper.config.activeBombs >= minesweeper.config.bombs){
            type = 0;
        }else{
            type = Math.floor(Math.random() * Math.floor(4))
        }
        // if 1, increments active bombs
        if (type === 1) {
            minesweeper.config.activeBombs +=1 
            console.log(minesweeper.config.activeBombs)
        }

        // create dom element, add .square
        let square = document.createElement('div')
            square.classList.add('square')
        
        // if 1 set to .bomb and add emoji
            type === 1 ? square.classList.add('bomb') : square.classList.add('empty')
        let squareText = type === 1 ? '💣' : '💜'
            square.textContent=squareText
            
        return square
    },
    generateGrid: () => {
        console.log("GenerateGrid")
        document.getElementById('app').innerHTML = "" // empty grid
        length = minesweeper.config.cells 

        // set width of app container in px
        let app = document.getElementById('app');
        gridWidth = length * 20;
        app.style.width = gridWidth+"px";
        let grid = []
        for (let index = 0; index < length*length; index++) {
            grid.push(minesweeper.generateSquare())
        }
        // shuffle grid and append to body
        grid = minesweeper.shuffleBombs(grid)
        console.log("grid size:",grid.length)
        grid.map((square)=>{
            app.append(square);
        })

        // add click handler to squares
        minesweeper.addClicktoSquares();
    },
    shuffleBombs: (array) => {
        // basic fisher-yates shuffle algorithm
        let j,x
        for(let i = array.length-1; i>0; i--){
            // sets j to random number between 1 and length-1
            j = Math.floor(Math.random() * (i+1))
            // sets x to current position
            x = array[i]
            // set current position to j and sets j to current position
            array[i] = array[j];
            array[j] = x
        }
        return array
    },
    addClicktoSquares: ()=>{
        // click events for squares
        let squares = document.querySelectorAll('.square');
        for (i = 0; i < squares.length; i++) {
            // console.log(squares[i])
            squares[i].addEventListener('click', function () {
                this.classList.add('active')
                minesweeper.clickSquare(this)
            })
            // add right click
            squares[i].addEventListener('contextmenu', function(event) {
                event.preventDefault()
                minesweeper.addFlagToSquare(this)
            })
        }
    },
    distanceFromMine: (inObj)=>{
        // need ot document
        console.log("DistanceFromMine")
        let squares = document.querySelectorAll('.square');
        let inIndex = 0;
        for (let index = 0; index < squares.length; index++) {
            if(squares[index] === inObj)
                inIndex = index;
        }
        const cellLength = minesweeper.config.cells
        const siblings = [
            squares[inIndex - 1], 
            squares[inIndex + 1],
            squares[inIndex - cellLength],
            squares[inIndex + cellLength],
            squares[inIndex - (cellLength - 1)],
            squares[inIndex + (cellLength + 1)], 
            squares[inIndex - (cellLength + 1)],
            squares[inIndex + (cellLength - 1)],
        ]
        console.log(siblings)
        for (let index = 0; index < siblings.length; index++) {
            if ( siblings[index].classList.contains('empty')){
                siblings[index].classList.add('active')
            }
            
        }

    },
    resetGame: ()=>{
        console.log("Game Reset")
        // set active bombs back to zero, generate grid
        minesweeper.config.activeBombs = 0
        minesweeper.generateGrid()
        // hide gameover
        gameOver = document.getElementById("gameOver")
        gameOver.style.display = 'none';
    },
    clickSquare: (inObj)=>{
        console.log('square clicked')
        console.log(inObj);
        if(inObj.classList.contains('bomb')){
            minesweeper.gameOver()
        }else{
            minesweeper.distanceFromMine(inObj)
        }
    },
    addFlagToSquare: (inObj)=>{
        console.log('right click')
        console.log(inObj)
        // if bomb, set .active to display, change to 🚩, 
        // decrement active bombs, if no more bombs, show gameover
        if(inObj.classList.contains('bomb')){
            inObj.classList.remove('bomb')
            inObj.classList.add('active')
            inObj.innerHTML = "🚩"
            if (minesweeper.config.activeBombs > 0){
                minesweeper.config.activeBombs--
            }else{
                minesweeper.gameOver()
            }
        // if not bomb, set as 🚩anyway
        }else{
            inObj.classList.add('active')
            inObj.classList.add('empty')
            inObj.innerHTML = "🚩"
        }
    },
    gameOver: ()=>{
        console.log('gameOver')
        let squares = document.querySelectorAll('.square'); 
        // show bombs, diable clicks
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.pointerEvents = 'none';
            squares[i].classList.add('active')
        }
        // show gameover
        gameOver = document.getElementById("gameOver")
        gameOver.style.display = 'block';
    },
    easyMode: ()=>{
        minesweeper.config.cells = 9
        minesweeper.config.bombs = 10
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
    },
    mediumMode: () => {
        minesweeper.config.cells = 18
        minesweeper.config.bombs = 36
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
    },
    hardMode: () => {
        minesweeper.config.cells = 36
        minesweeper.config.bombs = 144
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
    },
}

window.onload = function () {
    // console.log(minesweeper.generateSquare())
    minesweeper.generateGrid()

    resetBtn = document.getElementById('reset');
    easy = document.getElementById('easy');
    medium = document.getElementById('medium');
    hard = document.getElementById('hard');
    reset.addEventListener('click', ()=>minesweeper.resetGame())
    easy.addEventListener('click', () => minesweeper.easyMode())
    medium.addEventListener('click', () => minesweeper.mediumMode())
    hard.addEventListener('click', () => minesweeper.hardMode())
}