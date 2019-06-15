# Tic Tac Toe
CLI Tic Tac Toe game in vanilla JS

## playScript.js
Set up players (human or AI) and modify the completion callback if necessary. Run the game.

## HumanPlayer
Gets input from player via Node readline module and returns the result in a promise.

## ComputerPlayer
Recursively scores and selects the best space to play and returns the result in a promise.

## Game
Handles playback and requests input from players.

## Board
Holds the game board, places markers, checks for wins, etc.
