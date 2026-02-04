function play(userChoice) {

    const images = {
        rock: "images/rock.png",
        paper: "images/paper.png",
        scissors: "images/scissors.png"
    };

    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    const userHand = document.getElementById("user");
    const computerHand = document.getElementById("computer");
    const result = document.getElementById("result");

    // Reset
    result.className = "";
    userHand.classList.add("shake");
    computerHand.classList.add("shake");

    setTimeout(() => {
        userHand.src = images[userChoice];
        computerHand.src = images[computerChoice];

        userHand.classList.remove("shake");
        computerHand.classList.remove("shake");

        if (userChoice === computerChoice) {
            result.textContent = "It's a Draw 🤝";
            result.classList.add("draw");
        } else if (
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")
        ) {
            result.textContent = "You Win 🎉";
            result.classList.add("win");
        } else {
            result.textContent = "You Lose 😢";
            result.classList.add("lose");
        }

    }, 600);
}