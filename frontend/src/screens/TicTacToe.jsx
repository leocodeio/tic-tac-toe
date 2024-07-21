import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useAccountContext } from "../context/AccountContext";
import { INIT_GAME, MOVE, GAME_DRAW, GAME_OVER } from "../context/messges.js";

const TicTacToe = () => {
  const { socket } = useSocketContext();
  const { account } = useAccountContext();
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameInfo, setGameInfo] = useState("");

  useEffect(() => {
    console.log(socket);
    if (socket) {
      socket.send(JSON.stringify({ type: INIT_GAME }));
    }
  }, [socket]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on(INIT_GAME, (data) => {
  //       if (data.symbol === "X") {
  //         setCurrentPlayer(account._id);
  //       }
  //       setGameInfo(`Game started. Your symbol: ${data.symbol}`);
  //     });

  //     socket.on(MOVE, (data) => {
  //       setBoard((prevBoard) => {
  //         const newBoard = [...prevBoard];
  //         newBoard[data.move] = data.symbol;
  //         return newBoard;
  //       });
  //       setCurrentPlayer((prevPlayer) => (prevPlayer === account._id ? null : account._id));
  //       setGameInfo(`Player ${data.symbol === "X" ? "O" : "X"}'s turn`);
  //     });

  //     socket.on(GAME_DRAW, () => {
  //       setGameInfo("Game is a draw.");
  //     });

  //     socket.on(GAME_OVER, (data) => {
  //       setGameInfo(`Game over. Winner: ${data.winner}`);
  //     });

  //     return () => {
  //       socket.off(INIT_GAME);
  //       socket.off(MOVE);
  //       socket.off(GAME_DRAW);
  //       socket.off(GAME_OVER);
  //     };
  //   }
  // }, [socket, account]);

  const handleMove = (index) => {
    if (board[index] === "" && currentPlayer === account._id) {
      socket.emit(MOVE, { move: index });
    }
  };

  return (
    <div>
      {account === null ? (
        <div>Please log in to play Tic Tac Toe.</div>
      ) : (
        <div>
          <div>Welcome {account.nickName}, your symbol is {currentPlayer === account._id ? "X" : "O"}</div>
          <div>{gameInfo}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
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
                  cursor: "pointer"
                }}
                onClick={() => handleMove(index)}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
