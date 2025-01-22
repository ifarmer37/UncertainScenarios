# UncertainScenarios

**Players: 4-10 players** (human and/or AI).
Objective: The "Code Cracker" player guesses the order of other players' hidden numbers based on their answers to scenario questions.
**Gameplay:**

**Player Setup:**
Prompt for the number of human players.
For each human player:
Get their name.
Present a carousel of available tokens for them to choose.
Prompt for the number of AI players (ensuring 4-10 total players).
**For each AI player:**
Select from available AI profiles.
Assign an available token.
Category Selection: Players choose a category for the round (represented by colors).
Question & Scale: Display the question from the chosen category with a color-coded border. Show the scale (e.g., "least" to "most").
**Card Reveal:**
Randomly assign a unique number (A-10) to each player.
Individually reveal each player's number by clicking their card:
Announce "Revealing [Player Name]... all other players look away."
Animate the card (wiggle, sound, flip) to show the number.
After 2 seconds, flip the card back.
**Scenario Answers:**
The Code Cracker clicks "PLAY".
Highlight each player one by one.
The highlighted player gives an answer aligned with their number.
**For AI players:**
Generate an answer using a chat prompt.
Speak the answer using text-to-speech (with a replay option).
**Code Cracker's Guess:**
The Code Cracker drags and drops player cards into boxes, ordering them from least to most based on their answers.
