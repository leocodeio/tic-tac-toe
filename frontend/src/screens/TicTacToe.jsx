import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useAccountContext } from "../context/AccountContext";
import { INIT_GAME, MOVE, GAME_DRAW, GAME_OVER } from "../context/messges";

const TicTacToe = () => {
  const { socket } = useSocketContext();
  const { account,setAccount } = useAccountContext();
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
          console.log(message.payload.symbol)
          setCurrentTurn(message.payload.symbol === "X"? "O" : "X");
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
          setAccount(null);
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
    <div>
      {account === null ? (
        <div>Please log in to play Tic Tac Toe.</div>
      ) : (
        <div>
          <div>
            Welcome {account.nickName}, your symbol is {symbol}
          </div>
          <div>{currentTurn}'s turn</div>
          {gameOver ? (
            <div>
              {winner === "draw" ? (
                <div>It's a draw!</div>
              ) : (
                <div>Game over! Winner is {winner}</div>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 100px)",
                gap: "10px",
              }}
            >
              {board.map((cell, index) => (
                <div
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid black",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
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
