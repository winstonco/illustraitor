import { useEffect, useState } from 'react';

import Game from './Game';
import GameNav from './GameNav';
import socket from '../../helpers/getSocket';
import { usePrompt, useRole } from '../../App';
import { useLobby } from '../../hooks/useLobby';

export default function Play() {
  const [role, setRole] = useRole();
  const [prompt, setPrompt] = usePrompt();
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const { lobbyName, setLobbyName, createLobby, leaveLobby } = useLobby();

  // console.log(lobbyName);

  useEffect(() => {
    socket.on('playersInLobby', (playerNames) => {
      setPlayerNames(playerNames);
    });

    socket.on('readyCheck', (callback) => {
      callback(new Error(), { response: 'ok' });
    });

    socket.on('startGame', () => {
      // console.log('Game starting now!');
      setIsPlaying(true);

      socket.on('role', (role) => {
        setRole(role === 'real' ? 'Real' : 'Imposter');
        // console.log(role);
      });

      socket.on('prompt', setPrompt);

      socket.on('startTurnAll', setCurrentPlayerName);

      socket.on('startTurn', () => {
        // console.log("It's your turn!");
      });

      socket.on('endTurn', () => {
        // console.log('Your turn ended!');
      });
    });

    socket.on('endGame', () => {
      setIsPlaying(false);
      // setPlayerNames([]);
      setCurrentPlayerName('');
      setRole('');
      setPrompt('');
    });

    return () => {
      socket.removeAllListeners('startGame');
      socket.removeAllListeners('role');
      socket.removeAllListeners('prompt');
      socket.removeAllListeners('startTurnAll');
      socket.removeAllListeners('startTurn');
      socket.removeAllListeners('endTurn');
      socket.removeAllListeners('guessImposter');
      socket.removeAllListeners('readyCheck');
      socket.removeAllListeners('endGame');
    };
  }, []);

  // redirect on mount if no code / bad code
  useEffect(() => {
    if (!lobbyName) {
      // window.alert('Invalid lobby');
      leaveLobby();
    }
  }, []);

  return (
    <>
      <GameNav
        role={role}
        prompt={prompt}
        currentPlayerName={currentPlayerName}
        isPlaying={isPlaying}
        playerNames={playerNames}
      />
      <Game />
    </>
  );
}
