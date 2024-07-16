import React from 'react'
import { useSocketContext } from '../context/SocketContext'
import { useAccountContext } from '../context/AccountContext';

const TicTacToe = () => {
  const { onlineUsers } = useSocketContext();
  const { account } = useAccountContext();

  console.log(onlineUsers)
  return (
    <>
      {account === null ? (
        <div>Please log in to play Tic Tac Toe.</div>
      ) : (
        <div>Welcome {account.user.nickName}, you are now in the game!</div>
      )}
    </>
  );
}

export default TicTacToe
