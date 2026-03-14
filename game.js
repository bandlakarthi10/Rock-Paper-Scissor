const images = {
    rock: "images/rock.png",
    paper: "images/paper.png",
    scissors: "images/scissors.png"
};

const choices = ["rock", "paper", "scissors"];

let currentRound = 1;
let player1Score = 0;
let player2Score = 0;
let isGameOver = false;

function getElements() {
    return {
        userHand: document.getElementById("user"),
        computerHand: document.getElementById("computer"),
        userWrapper: document.getElementById("user-wrapper"),
        computerWrapper: document.getElementById("computer-wrapper"),
        result: document.getElementById("result"),
        roundNumber: document.getElementById("round-number"),
        player1ScoreEl: document.getElementById("player1-score"),
        player2ScoreEl: document.getElementById("player2-score"),
        turnIndicator: document.getElementById("turn-indicator"),
        matchLimitEl: document.getElementById("match-limit"),
        gameOverOverlay: document.getElementById("game-over-overlay"),
        finalHeroScore: document.getElementById("final-hero-score"),
        finalAndroidScore: document.getElementById("final-android-score"),
        finalStatus: document.getElementById("final-status"),
        finalMessage: document.getElementById("final-message"),
        arenaMain: document.getElementById("arena-main"),
        gameControls: document.getElementById("game-controls")
    };
}

function updateScoreboard() {
    const { roundNumber, player1ScoreEl, player2ScoreEl } = getElements();
    if (roundNumber) roundNumber.textContent = String(currentRound);
    if (player1ScoreEl) player1ScoreEl.textContent = String(player1Score);
    if (player2ScoreEl) player2ScoreEl.textContent = String(player2Score);
}

function updateTurnIndicator(text) {
    const { turnIndicator } = getElements();
    if (!turnIndicator) return;
    turnIndicator.textContent = text || "Your move, Hero. Select your weapon.";
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

function clearEffects() {
    const { userWrapper, computerWrapper, userHand, computerHand } = getElements();
    [userWrapper, computerWrapper].forEach(w => {
        if (!w) return;
        w.classList.remove("winner", 
            "anim-smash-left", "anim-smash-right", 
            "anim-wrap-left", "anim-wrap-right", 
            "anim-cut-left", "anim-cut-right", 
            "anim-clash-left", "anim-clash-right",
            "anim-react-hit-left", "anim-react-hit-right"
        );
    });
    [userHand, computerHand].forEach(h => h?.classList.remove("shake"));
}

function resetGame() {
    const { userHand, computerHand, gameOverOverlay, arenaMain, gameControls } = getElements();

    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    isGameOver = false;

    if (userHand) userHand.src = images.rock;
    if (computerHand) computerHand.src = images.rock;

    clearEffects();
    setResult("", "");
    updateScoreboard();
    updateTurnIndicator();

    if (gameOverOverlay) {
        gameOverOverlay.classList.add("hidden");
        gameOverOverlay.classList.remove("victory", "defeat");
    }
    arenaMain?.style.setProperty("filter", "none");
    gameControls?.classList.remove("disabled");
}

function showGameOver(winner) {
    const els = getElements();
    const { gameOverOverlay, finalHeroScore, finalAndroidScore, finalMessage, finalStatus, arenaMain, gameControls } = els;
    
    isGameOver = true;
    
    if (finalHeroScore) finalHeroScore.textContent = String(player1Score);
    if (finalAndroidScore) finalAndroidScore.textContent = String(player2Score);
    
    if (winner === "p1") {
        if (finalStatus) {
            finalStatus.textContent = "HERO VICTORIOUS";
            finalStatus.style.color = "var(--accent-blue)";
        }
        if (finalMessage) finalMessage.textContent = "You have dominated the Arena. Future belongs to you.";
        gameOverOverlay?.classList.add("victory");
        gameOverOverlay?.classList.remove("defeat", "draw");
    } else if (winner === "p2") {
        if (finalStatus) {
            finalStatus.textContent = "ANDROID VICTORIOUS";
            finalStatus.style.color = "var(--accent-red)";
        }
        if (finalMessage) finalMessage.textContent = "The Android has surpassed its creator. Better luck next time.";
        gameOverOverlay?.classList.add("defeat");
        gameOverOverlay?.classList.remove("victory", "draw");
    } else {
        if (finalStatus) {
            finalStatus.textContent = "IT'S A TIE";
            finalStatus.style.color = "var(--accent-yellow, #f0c040)";
        }
        if (finalMessage) finalMessage.textContent = "The Arena could not determine a champion. Perfectly matched!";
        gameOverOverlay?.classList.add("draw");
        gameOverOverlay?.classList.remove("victory", "defeat");
    }

    if (gameOverOverlay) {
        gameOverOverlay.classList.remove("hidden");
    }
    arenaMain?.style.setProperty("filter", "blur(10px)");
    gameControls?.classList.add("disabled");
}

function decideWinner(firstChoice, secondChoice) {
    if (firstChoice === secondChoice) return "draw";

    const winsAgainst = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    return winsAgainst[firstChoice] === secondChoice ? "p1" : "p2";
}

function applyOutcome(outcome, userChoice, computerChoice) {
    const { userWrapper, computerWrapper, matchLimitEl } = getElements();
    
    clearEffects();

    // Determine specific interaction animation
    if (outcome === "p1") {
        player1Score += 1;
        setResult("Victory is yours, Hero!", "win");
        userWrapper?.classList.add("winner");
        
        // Winner animations
        if (userChoice === "rock") userWrapper?.classList.add("anim-smash-left");
        if (userChoice === "paper") userWrapper?.classList.add("anim-wrap-left");
        if (userChoice === "scissors") userWrapper?.classList.add("anim-cut-left");
        
        // Loser reactions
        computerWrapper?.classList.add("anim-react-hit-right");

    } else if (outcome === "p2") {
        player2Score += 1;
        setResult("The Android prevails.", "lose");
        computerWrapper?.classList.add("winner");

        // Winner animations
        if (computerChoice === "rock") computerWrapper?.classList.add("anim-smash-right");
        if (computerChoice === "paper") computerWrapper?.classList.add("anim-wrap-right");
        if (computerChoice === "scissors") computerWrapper?.classList.add("anim-cut-right");
        
        // Loser reactions
        userWrapper?.classList.add("anim-react-hit-left");

    } else {
        setResult("A stalemate in the arena.", "draw");
        userWrapper?.classList.add("anim-clash-left");
        computerWrapper?.classList.add("anim-clash-right");
    }

    currentRound += 1;
    updateScoreboard();

    const totalRounds = parseInt(matchLimitEl?.value || "0");
    // Rounds played = currentRound - 1 (we already incremented above)
    const roundsPlayed = currentRound - 1;
    if (totalRounds > 0 && roundsPlayed >= totalRounds) {
        isGameOver = true;
        setTimeout(() => {
            if (player1Score > player2Score) {
                showGameOver("p1");
            } else if (player2Score > player1Score) {
                showGameOver("p2");
            } else {
                showGameOver("tie");
            }
        }, 1000);
    }
}

function handleChoice(choice) {
    if (isGameOver) return;

    const { userHand, computerHand } = getElements();
    if (!userHand || !computerHand) return;

    clearEffects();
    userHand.classList.add("shake");
    computerHand.classList.add("shake");
    
    updateTurnIndicator("Engaging battle protocols...");

    setTimeout(() => {
        playVsComputer(choice);
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
    applyOutcome(outcome, userChoice, computerChoice);
    
    if (!isGameOver) {
        setTimeout(() => {
            if (outcome === "draw") {
                updateTurnIndicator("The arena demands another clash.");
            } else {
                updateTurnIndicator("Choose your next strike, Hero.");
            }
        }, 2000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateScoreboard();
    updateTurnIndicator();
});