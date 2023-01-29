import { useEffect, useState } from 'react';

import Game from './Game';
import GameNav from './GameNav';
import socket from '../../helpers/socket';
import { useLobbyName, usePrompt, useRole } from '../../App';
import Login from './Login';

export default function Play() {
  const [role, setRole] = useRole();
  const [prompt, setPrompt] = usePrompt();
  const [lobbyName, setLobbyName] = useLobbyName();
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [isNamed, setIsNamed] = useState<boolean>(false);

  console.log(lobbyName);

  useEffect(() => {
    socket.on('startGame', () => {
      console.log('Game starting now!');

      socket.on('role', (role) => {
        setRole(role === 'real' ? 'Real' : 'Imposter');
        console.log(role);
      });

      socket.on('prompt', (prompt) => {
        setPrompt(prompt);
        console.log(prompt);
      });

      socket.on('startTurnAll', (name) => {
        setCurrentPlayerName(name);
      });

      socket.on('startTurn', () => {
        console.log("It's your turn!");
      });

      socket.on('endTurn', () => {
        console.log('Your turn ended!');
      });

      socket.on('guessImposter', (callback) => {
        const myGuess = window.prompt('who?') ?? 'no one lmao';
        callback(null, { prop: myGuess });
      });
    });

    socket.on('readyCheck', (callback) => {
      if (isNamed) callback(null, 'ok');
      else callback(new Error(), 'ok');
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
    };
  }, []);

  const handleNameSubmit = (name: string) => {
    // check name?
    socket.emit('namePlayer', lobbyName, name, (res) => {
      if (res === 'ok') {
        console.log('Player is named');
        setIsNamed(true);
      } else {
        console.log('Failed to name player');
      }
    });
  };

  return isNamed ? (
    <>
      <GameNav
        role={role}
        prompt={prompt}
        lobbyName={lobbyName}
        setLobbyName={setLobbyName}
        currentPlayerName={currentPlayerName}
      />
      <Game />
    </>
  ) : (
    <Login onNameSubmit={handleNameSubmit} />
  );
}
