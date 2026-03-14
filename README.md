## Rock Paper Scissors Arena

A small, polished Rock–Paper–Scissors web game with round tracking and a simple scoreboard versus the computer.

### Technologies Used

- **HTML**: Page structure and layout.
- **CSS**: Modern, dark-themed UI, arena layout, buttons, animations.
- **JavaScript**: Game logic (computer choice, win/lose/draw rules, score and round updates, reset behavior).

### How to Run

- **Option 1 – Open directly**
  - Double‑click `game.html` in the project folder, or
  - From a terminal in the project directory:
    - On Windows PowerShell:
      ```powershell
      start .\game.html
      ```

- **Option 2 – Run via local web server (recommended)**
  - From the project folder, if you have Python installed:
    ```bash
    python -m http.server 8000
    ```
  - Then open `http://localhost:8000/game.html` in your browser.

### Game Workflow

- **1. Start the game**
  - Open `game.html` in a modern browser.
  - You will see your score, computer score, and current round at the top.

- **2. Play a round**
  - Click **Rock**, **Paper**, or **Scissors**.
  - Both hands animate, then reveal the chosen symbols.
  - The result text shows whether you **win**, **lose**, or **draw**.
  - Scores and the **round number** automatically update.

- **3. Reset the match**
  - Click **Reset Match** to:
    - Set both scores back to `0`.
    - Reset the round to `1`.
    - Return the hands to the default rock pose.

### Project Structure

- **`game.html`**: Main HTML file and layout.
- **`game.css`**: Styling for the arena, scoreboard, buttons, and animations.
- **`game.js`**: Core logic for turns, computer AI, results, and state management.
- **`images/rock.png`**, **`images/paper.png`**, **`images/scissors.png`**: Hand icons used for the game visuals.

