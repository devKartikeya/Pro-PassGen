// Game Variables
let rand = null;
let count = 0;
const maxLives = 7;

// Select Elements
const genButton = document.getElementById("gen");
const label = document.getElementById("label");
const user = document.getElementById("user");
const go = document.getElementById("go");

// 1. Generate / Restart Logic
genButton.addEventListener("click", () => {
  rand = Math.floor(Math.random() * 101);
  count = 0;

  // UI Reset
  label.innerHTML = "Guess the Number...";
  label.classList.remove("winner");
  label.style.color = "";
  user.value = "";
  user.disabled = false;
  user.focus();

  genButton.textContent = "Restart";
  console.log("New Number Generated: " + rand);
});

// 2. Submit / "Go" Logic
go.addEventListener("click", () => {
  // Check if game has started
  if (rand === null) {
    label.innerHTML = "Click Generate First!";
    return;
  }

  let userValue = parseInt(user.value);

  // Validation
  if (user.value.length === 0 || isNaN(userValue)) {
    label.innerHTML = "Enter Your Number!";
    return;
  }

  // Increment Attempts
  count++;

  // The Core Game Logic
  if (userValue === rand) {
    // WIN
    label.innerHTML = `Mission Accomplished! It was ${rand}`;
    label.classList.add("winner");
    endGame();
  } else if (count >= maxLives) {
    // LOSS
    label.innerHTML = `GAME FINISHED! The number was ${rand}`;
    label.style.color = "#ff4b2b"; // Red for game over
    endGame();
  } else {
    // HINTS (High/Low)
    if (userValue > rand) {
      label.innerHTML = "Too Big, reduce...";
    } else {
      label.innerHTML = "Too small, enlarge...";
    }

    // Clear input for next guess but keep focus
    user.value = "";
    user.focus();
  }
});

// 3. End Game 
function endGame() {
  user.disabled = true;
  rand = null; // Prevents clicking 'Go' after game ends
}

// 4. Visual Focus Effect (From your original code)
user.addEventListener("focus", () => {
  go.style.backgroundColor = "var(--neon-blue)";
  go.style.transform = "translateY(-2px)";
});

user.addEventListener("blur", () => {
  go.style.backgroundColor = "";
  go.style.transform = "";
});

