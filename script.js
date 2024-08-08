// Get references to the elements
const startButton = document.getElementById('startButton');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const resultSection = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');
const resultImage = document.getElementById('resultImage');

// Paths to the sounds
const lightsaberSound = new Audio('lightsaber.mp3');
const dragonSound = new Audio('dragon.mp3');
const tigerSound = new Audio('tiger.mp3');
const fanfareSound = new Audio('fanfare.mp3');
const ringSound = new Audio('ring.mp3');

// Define the game state
let currentPlayer = 'X'; // The player who goes first
let board = Array(9).fill(null); // Empty board

// Paths to the images
const dragonImage = 'dragon.jpg';
const tigerImage = 'tiger.png';

// Function to start the game
function startGame() {
    lightsaberSound.play(); // Play the lightsaber sound
    setTimeout(() => {
        startScreen.classList.add('hidden'); // Hide the start screen
        gameScreen.classList.remove('hidden'); // Show the game screen
        updatePlayerDisplay(); // Initialize player display
    }, lightsaberSound.duration * 1000); // Delay the game screen visibility until sound ends
}

// Function to update the current player display
function updatePlayerDisplay(){
    if(currentPlayer === 'X') {
        currentPlayerDisplay.textContent = "Player1: Dragon's Turn";
    } else {
        currentPlayerDisplay.textContent = "Player2: Tiger's Turn";
    }
}

// Function to handle cell click
function handleClick(event) {
    const cell = event.target; // The clicked cell
    const index = cell.getAttribute('data-index'); // Index of the clicked cell

    // If the cell is already filled or the game is over, do nothing
    if (board [index] || checkWinner()) return;

    // Update the board and cell background image
    board [index] = currentPlayer;
    cell.style.backgroundImage = `url('${currentPlayer === 'X' ? dragonImage: tigerImage}')`;

    // Play the corresponding sound
    if (currentPlayer === 'X') {
        dragonSound.play();
    } else {
        tigerSound.play();
    }

    // Check for a winner or a tie
    if (checkWinner()) {
        fanfareSound.play(); // Play the fanfare sound for a winner
        showResult(`${currentPlayer === 'X' ? 'Dragon': 'Tiger'} wins!`, currentPlayer === 'X' ? dragonImage: tigerImage);
    } else if (board.every(cell => cell)) {
        ringSound.play(); // Play the ring sound for a tie
        showResult("It's a tie!", [dragonImage, tigerImage]);
    } else {
    // Switch players and update display
        currentPlayer = currentPlayer === 'X' ? '0': 'X';
        updatePlayerDisplay();
    }
}

// Function to show the result
function showResult (message, imageSrc) {
    resultMessage.textContent = message;
    if (Array.isArray (imageSrc)) {
        // Show both images for a tie
        resultImage.src = '';
        const imageContainer = document.createElement('div');
        imageSrc.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.style.width = '100px';
            img.style.height = '100px';
            imageContainer.appendChild(img);
        });
        resultSection.appendChild(imageContainer);
    } else {
        // Show the winner's image
        resultImage.src = imageSrc;
    }
    resultSection.classList.remove('hidden');
}  

// Function to reset the game
function resetGame() {
    board = Array(9).fill(null); // Clear the board
    cells.forEach(cell => cell.style.backgroundImage = ''); // Clear the cell content
    currentPlayer = 'X'; // Reset to player X
    updatePlayerDisplay(); // Update player display to Dragon's turn 
    resultSection.classList.add('hidden'); // Hide the result section 
    resultImage.src = ''; // Clear the result image
    // Remove any additional images (in case of a tie)
    if (resultSection.contains (resultSection.querySelector('div'))) {
        resultSection.querySelector('div').remove();
    }
    startScreen.classList.remove('hidden'); // Show the start screen again
    gameScreen.classList.add('hidden'); // Hide the game screen
}

// Function to check for a winner
function checkWinner() {
    const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombos.some (combo => {
        const [a, b, c] = combo;
        return board [a] && board [a] == board [b] && board [a] === board [c];
    });
}

// Initialize the player display
updatePlayerDisplay();

// Add event listeners to the cells
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Add event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Add event listener to the start button
startButton.addEventListener('click', startGame);