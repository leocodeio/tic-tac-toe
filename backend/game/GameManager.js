import { Game } from "./Game.js";
import { INIT_GAME, MOVE } from "./messages.js";

class GameManager {
  users = [];
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket) {
    this.users.push(socket);
    this.addHandler(socket);
  }

  removeUser(socket) {
    this.users = this.users.filter((user) => user !== socket);
  }

  addHandler(socket) {
    // console.log("handler added ");
    socket.on("message", (data) => {
      // console.log("message received");
      const message = JSON.parse(data.toString());
      // console.log(message);
      if (message.type === INIT_GAME) {
        // console.log("initgame");
        if (this.pendingUser) {
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }

      if (message.type === MOVE) {
        // console.log("move");
        const game = this.games.find(
          (game) => game.player1 === socket || game.player2 === socket
        );
        if (game) {
          // console.log("move");
          game.makeUserMove(socket, message.move);
        }
      }
    });
  }
}

export default GameManager;
