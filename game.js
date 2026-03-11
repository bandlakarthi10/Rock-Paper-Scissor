const images = {
    rock: "images/rock.png",
    paper: "images/paper.png",
    scissors: "images/scissors.png"
};

const choices = ["rock", "paper", "scissors"];

let mode = "computer"; // "computer" or "friend"
let currentRound = 1;
let player1Score = 0;
let player2Score = 0;
let currentTurn = "p1"; // for friend mode: "p1" or "p2"
let pendingP1Choice = null;

function getElements() {
    return {
        userHand: document.getElementById("user"),
        computerHand: document.getElementById("computer"),
        result: document.getElementById("result"),
        roundNumber: document.getElementById("round-number"),
        player1ScoreEl: document.getElementById("player1-score"),
        player2ScoreEl: document.getElementById("player2-score"),
        player1Label: document.getElementById("player1-label"),
        player2Label: document.getElementById("player2-label"),
        turnIndicator: document.getElementById("turn-indicator")
    };
}

function updateScoreboard() {
    const { roundNumber, player1ScoreEl, player2ScoreEl } = getElements();
    roundNumber.textContent = String(currentRound);
    player1ScoreEl.textContent = String(player1Score);
    player2ScoreEl.textContent = String(player2Score);
}

function updateTurnIndicator() {
    const { turnIndicator } = getElements();

    if (!turnIndicator) return;

    if (mode === "computer") {
        turnIndicator.textContent = "Your move: choose Rock, Paper, or Scissors.";
    } else {
        if (currentTurn === "p1") {
            turnIndicator.textContent = "Player 1: choose your move.";
        } else {
            turnIndicator.textContent = "Player 2: choose your move.";
        }
    }
}

function setResult(text, statusClass) {
    const { result } = getElements();
    if (!result) return;

    result.className = "";
    if (statusClass) {
        result.classList.add(statusClass);
    }
    result.textContent = text;
}

function changeMode(newMode) {
    mode = newMode === "friend" ? "friend" : "computer";

    const { player1Label, player2Label } = getElements();

    if (mode === "computer") {
        if (player1Label) player1Label.textContent = "You";
        if (player2Label) player2Label.textContent = "Computer";
    } else {
        if (player1Label) player1Label.textContent = "Player 1";
        if (player2Label) player2Label.textContent = "Player 2";
    }

    resetGame();
}

function resetGame() {
    const { userHand, computerHand } = getElements();

    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    currentTurn = "p1";
    pendingP1Choice = null;

    if (userHand) userHand.src = images.rock;
    if (computerHand) computerHand.src = images.rock;

    setResult("", "");
    updateScoreboard();
    updateTurnIndicator();
}

function decideWinner(firstChoice, secondChoice) {
    if (firstChoice === secondChoice) {
        return "draw";
    }

    const winsAgainst = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (winsAgainst[firstChoice] === secondChoice) {
        return "p1";
    }

    return "p2";
}

function applyOutcome(outcome) {
    if (outcome === "p1") {
        player1Score += 1;
        setResult(mode === "computer" ? "You win this round." : "Player 1 wins this round.", "win");
    } else if (outcome === "p2") {
        player2Score += 1;
        setResult(mode === "computer" ? "Computer wins this round." : "Player 2 wins this round.", "lose");
    } else {
        setResult("This round is a draw.", "draw");
    }

    currentRound += 1;
    updateScoreboard();
    updateTurnIndicator();
}

function handleChoice(choice) {
    const { userHand, computerHand } = getElements();

    if (!userHand || !computerHand) return;

    userHand.classList.add("shake");
    computerHand.classList.add("shake");

    // Delay to show shake animation before revealing hands
    setTimeout(() => {
        if (mode === "computer") {
            playVsComputer(choice);
        } else {
            playFriendMode(choice);
        }
    }, 600);
}

function playVsComputer(userChoice) {
    const { userHand, computerHand } = getElements();
    if (!userHand || !computerHand) return;

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    userHand.src = images[userChoice];
    computerHand.src = images[computerChoice];

    userHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    const outcome = decideWinner(userChoice, computerChoice);
    applyOutcome(outcome);
}

function playFriendMode(choice) {
    const { userHand, computerHand } = getElements();
    if (!userHand || !computerHand) return;

    if (currentTurn === "p1") {
        // Store Player 1 choice, switch turn without revealing yet
        pendingP1Choice = choice;
        currentTurn = "p2";

        userHand.classList.remove("shake");
        computerHand.classList.remove("shake");

        setResult("Player 2: choose your move.", "");
        updateTurnIndicator();
        return;
    }

    if (!pendingP1Choice) {
        return;
    }

    const p1Choice = pendingP1Choice;
    const p2Choice = choice;

    pendingP1Choice = null;
    currentTurn = "p1";

    userHand.src = images[p1Choice];
    computerHand.src = images[p2Choice];

    userHand.classList.remove("shake");
    computerHand.classList.remove("shake");

    const outcome = decideWinner(p1Choice, p2Choice);
    applyOutcome(outcome);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    updateScoreboard();
    updateTurnIndicator();
});