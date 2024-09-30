import Board from "./Board.js";
import { io } from "../socket/socket.js";
import { INIT_GAME, GAME_DRAW, GAME_OVER, MOVE } from "./messages.js";

export class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board(["", "", "", "", "", "", "", "", ""]);
    this.startTime = new Date();
    this.currentPlayer = player1; // Initialize the first player

    console.log(`Initializing game between ${player1.id} and ${player2.id}`);

    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          symbol: "X",
        },
      })
    );
    console.log(`Sent INIT_GAME to player1: ${player1.id}`);

    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          symbol: "O",
        },
      })
    );
    console.log(`Sent INIT_GAME to player2: ${player2.id}`);
  }

  makeUserMove(socket, index) {
    // Validation
    if (!this.board.isMoveValid(index)) {
      console.log(`Invalid move by player ${socket.id} at index ${index}`);
      return;
    }

    // Check if it's the current player's turn
    if (this.currentPlayer !== socket) {
      console.log(`It's not ${socket.id}'s turn.`);
      return; // Ignore the move if it's not the current player's turn
    }

    // Update board
    const symbol = socket === this.player1 ? "X" : "O";
    try {
      this.board.makeMove(index, symbol);
    } catch (e) {
      console.log(e);
      return;
    }

    // Switch to the other player's turn
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;

    // Check for game over
    if (this.board.isGameDraw()) {
      // Send draw message
      console.log("Game is a draw");
      this.player1.send(
        JSON.stringify({
          type: GAME_DRAW,
          payload: {
            winner: "X/O",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_DRAW,
          payload: {
            winner: "X/O",
          },
        })
      );
      return;
    }

    if (this.board.isGameOver()) {
      // Send game over message
      console.log(`Game over. Winner: ${this.board.getWinner()}`);
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.getWinner(),
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.getWinner(),
          },
        })
      );
      return;
    }

    // Send move message to both players
    const moveMessage = JSON.stringify({
      type: MOVE,
      payload: {
        move: index,
        symbol,
      },
    });

    if (socket === this.player1) {
      console.log(`Player1 made a move: ${index}`);
      this.player1.send(moveMessage);
      this.player2.send(moveMessage);
    } else {
      console.log(`Player2 made a move: ${index}`);
      this.player1.send(moveMessage);
      this.player2.send(moveMessage);
    }
    console.log(this.board.grid.slice(0, 3)); //first 3 ele
    console.log(this.board.grid.slice(3, 6)); //second 3 ele
    console.log(this.board.grid.slice(6, 9)); //third 3 ele
  }

  // Function to send a message to a specific player
  sendPlayerMessage(player, messageType, payload) {
    player.send(
      JSON.stringify({
        type: messageType,
        payload: payload,
      })
    );
  }
}
