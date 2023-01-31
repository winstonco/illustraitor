import { useEffect, useState } from 'react';

import Game from './Game';
import GameNav from './GameNav';
import socket from '../../helpers/getSocket';
import { useLobbyName, usePrompt, useRole } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Play() {
  const [role, setRole] = useRole();
  const [prompt, setPrompt] = usePrompt();
  const [lobbyName, setLobbyName] = useLobbyName();
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const navigate = useNavigate();

  // console.log(lobbyName);

  useEffect(() => {
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

      socket.on('guessImposter', async (guessTime, callback) => {
        let responded = false;
        setTimeout(() => {
          if (!responded) callback(null, { guess: 'none' });
        }, guessTime * 1000);
        const myGuess = window.prompt('who?') ?? 'no one lmao';
        callback(null, { guess: myGuess });
        responded = true;
      });
    });

    socket.on('readyCheck', (callback) => {
      callback(new Error(), { response: 'ok' });
    });

    socket.on('endGame', () => {
      setIsPlaying(false);
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
      navigate('/');
    }
  }, []);

  return (
    <>
      <GameNav
        role={role}
        prompt={prompt}
        lobbyName={lobbyName}
        setLobbyName={setLobbyName}
        currentPlayerName={currentPlayerName}
        isPlaying={isPlaying}
      />
      <Game />
    </>
  );
}
