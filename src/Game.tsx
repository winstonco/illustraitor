import { useState } from 'react';
import Canvas from './Canvas';
import { socket } from './helpers/socketio';
import { GameRole } from './types/roles';

export default function Game(): JSX.Element {
  // Whether client is in a room/lobby
  const [roomy, setRoomy] = useState<boolean>(false);
  const [role, setRole] = useState<GameRole>('real');
  const [prompt, setPrompt] = useState<string>('');

  socket.on('startGame', () => {
    console.log('Game starting now!');

    socket.on('role', (role) => {
      setRole(role);
      console.log(role);
    });

    socket.on('prompt', (prompt) => {
      setPrompt(prompt);
      console.log(prompt);
    });

    socket.on('startTurn', () => {
      console.log("It's your turn!");
    });

    socket.on('endTurn', () => {
      console.log('Your turn ended!');
    });
  });

  return (
    <>
      <div className="game">
        <Canvas></Canvas>
      </div>
      <button onClick={() => socket.emit('hello')}>Hello</button>
      <button
        onClick={() =>
          socket.emit('joinLobby', window.prompt('name') ?? 'temp')
        }
      >
        Join Lobby
      </button>
      <button
        onClick={() =>
          socket.emit('createLobby', window.prompt('name') ?? 'temp')
        }
      >
        Create Lobby
      </button>
      <button
        onClick={() =>
          socket.emit('leaveLobby', window.prompt('name') ?? 'temp')
        }
      >
        Leave Lobby
      </button>
      <button
        onClick={() =>
          socket.emit('startGame', window.prompt('name') ?? 'temp')
        }
      >
        Start
      </button>
    </>
  );
}
