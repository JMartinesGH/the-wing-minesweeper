let minesweeper = {
    config:{
        cells: 9,
        bombs: 10,
        activeBombs: 0
    },
    generateSquare: ()=>{
        // console.log("GenerateSquare")
        let type = 0
        if(minesweeper.config.activeBombs >= minesweeper.config.bombs){
            type = 0;
        }else{
            type = Math.floor(Math.random() * Math.floor(4))
        }
        if (type === 1) {
            minesweeper.config.activeBombs++
            console.log(minesweeper.activeBombs)
        }

        let square = document.createElement('div')
            square.classList.add('square')
        
            type === 1 ? square.classList.add('bomb') : square.classList.add('empty')
        let squareText = type === 1 ? '💣' : '💜'

        
            square.textContent=squareText
            
        return square
    },
    generateGrid: () => {
        console.log("GenerateGrid")
        document.getElementById('app').innerHTML = ""
        minesweeper.activeBombs = 0
        length = minesweeper.config.cells

        // set width of app container
        let app = document.getElementById('app');
        gridWidth = length * 20;
        app.style.width = gridWidth+"px";
        let grid = []
        for (let index = 0; index < length*length; index++) {
            grid.push(minesweeper.generateSquare())
        }
        console.log("grid size:",grid.length)
        grid.map((item)=>{
            app.append(item);
        })

        minesweeper.addClicktoSquares();
    },
    addClicktoSquares: ()=>{
        // click events for squares
        let squares = document.querySelectorAll('.square');
        for (i = 0; i < squares.length; i++) {
            // console.log(squares[i])
            squares[i].addEventListener('click', function () {
                this.classList.add('active')
                minesweeper.clickSquare(this);
            })
        }
    },
    distanceFromMine: (inObj)=>{
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
        minesweeper.config.activeBombs = 0
        minesweeper.generateGrid()
        // show gameover
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
    gameOver: ()=>{
        console.log('gameOver')
        let squares = document.querySelectorAll('.square'); 
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.pointerEvents = 'none';
            squares[i].classList.add('active')
        }
        // show gameover
        gameOver = document.getElementById("gameOver")
        gameOver.style.display = 'block';
        // show bombs

    },
    easyMode: ()=>{
        minesweeper.config.cells = 9
        minesweeper.config.bombs = 10
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
        // minesweeper.generateGrid()
    },
    mediumMode: () => {
        minesweeper.config.cells = 18
        minesweeper.config.bombs = 36
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
        // minesweeper.generateGrid()
    },
    hardMode: () => {
        minesweeper.config.cells = 36
        minesweeper.config.bombs = 144
        minesweeper.config.activeBombs = 0
        minesweeper.resetGame()
        // minesweeper.generateGrid()
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