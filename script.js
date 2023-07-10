// Constants
const gameContainer = document.querySelector(".game-container");
const snakeElement = document.querySelector(".snake");
const scoreElement = document.getElementById("score");

// Game variables
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let score = 0;
let direction = "right";
let intervalId = null;

// Initialize the game
function init() {
  // Reset snake position
  snake = [{ x: 200, y: 200 }];
  direction = "right";

  // Generate food
  generateFood();

  // Reset score
  score = 0;
  updateScore();

  // Start the game loop
  intervalId = setInterval(moveSnake, 100);
}

// Generate food at random position
function generateFood() {
  food.x = Math.floor(Math.random() * (gameContainer.clientWidth / 20)) * 20;
  food.y = Math.floor(Math.random() * (gameContainer.clientHeight / 20)) * 20;

  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  gameContainer.appendChild(foodElement);
}

// Update the score
function updateScore() {
  scoreElement.textContent = score;
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  // Move the snake based on the current direction
  switch (direction) {
    case "up":
      head.y -= 20;
      break;
    case "down":
      head.y += 20;
      break;
    case "left":
      head.x -= 20;
      break;
    case "right":
      head.x += 20;
      break;
  }

  // Check collision with the walls
  if (
    head.x < 0 ||
    head.x >= gameContainer.clientWidth ||
    head.y < 0 ||
    head.y >= gameContainer.clientHeight
  ) {
    gameOver();
    return;
  }

  // Check collision with self
  if (isCollisionWithSelf(head)) {
    gameOver();
    return;
  }

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    // Increase score
    score++;
    updateScore();

    // Generate new food
    removeFood();
    generateFood();

    // Grow the snake
    snake.unshift({ ...head });
  } else {
    // Remove the tail segment
    snake.pop();
  }

  // Add the new head to the snake
  snake.unshift(head);

  // Update snake's position
  updateSnakePosition();
}

// Check collision with self
function isCollisionWithSelf(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Remove the food element
function removeFood() {
  const foodElement = document.querySelector(".food");
  if (foodElement) {
    gameContainer.removeChild(foodElement);
  }
}

// Update snake's position on the game container
function updateSnakePosition() {
  // Clear the game container
  gameContainer.innerHTML = "";

  // Append each snake segment
  for (let i = 0; i < snake.length; i++) {
    const snakeSegment = document.createElement("div");
    snakeSegment.classList.add("snake");
    snakeSegment.style.left = snake[i].x + "px";
    snakeSegment.style.top = snake[i].y + "px";
    gameContainer.appendChild(snakeSegment);
  }

  // Append the food element
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = food.x + "px";
  foodElement.style.top = food.y + "px";
  gameContainer.appendChild(foodElement);
}

// Game over
function gameOver() {
  clearInterval(intervalId);
  alert("Game Over! Your score: " + score);
  init();
}

// Handle keydown event to change the snake's direction
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }
});

// Start the game
init();
