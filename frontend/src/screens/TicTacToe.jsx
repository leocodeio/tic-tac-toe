import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useAccountContext } from "../context/AccountContext";
import { INIT_GAME, MOVE, GAME_DRAW, GAME_OVER } from "../context/messges";
import "./TicTacToe.css";

const TicTacToe = () => {
  const { socket } = useSocketContext();
  const { account, setAccount } = useAccountContext();
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [symbol, setSymbol] = useState("loading");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ type: INIT_GAME }));
      socket.on("message", (data) => {
        const message = JSON.parse(data);
        if (message.type === INIT_GAME) {
          setSymbol(message.payload.symbol);
        }
        if (message.type === MOVE) {
          console.log(message.payload.symbol);
          setCurrentTurn(message.payload.symbol === "X" ? "O" : "X");
          const index = message.payload.move;
          setBoard((previousBoard) => {
            const newBoard = [...previousBoard];
            newBoard[index] = message.payload.symbol;
            return newBoard;
          });
        }
        if (message.type === GAME_OVER) {
          setGameOver(true);
          setWinner(message.payload.winner);
        }
        if (message.type === GAME_DRAW) {
          setGameOver(true);
          setWinner("draw");
        }
      });
    }
    // eslint-disable-next-line
  }, [socket]);

  const handleMove = (index) => {
    if (board[index] === "" && currentTurn === symbol && !gameOver) {
      socket.send(JSON.stringify({ type: MOVE, move: index }));
    }
  };

  return (
      <div className="tic-tac-toe-container">
        {account === null ? (
          <div className="login-message">
            Please log in to play Tic Tac Toe.
          </div>
        ) : (
          <div className="game-container">
            <div className="welcome-message">
              Welcome {account.nickName}, your symbol is {symbol}
            </div>
            <div className="turn-message">{currentTurn}'s turn</div>
            {gameOver ? (
              <div className="game-over-message">
                {winner === "draw" ? (
                  <div>It's a draw!</div>
                ) : (
                  <div>Game over! Winner is {winner}</div>
                )}
              </div>
            ) : (
              <div className="board-container">
                {board.map((cell, index) => (
                  <div
                    key={index}
                    className="cell"
                    onClick={() => handleMove(index)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
  );
};

export default TicTacToe;
