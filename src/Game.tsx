import { useState } from 'react';
import { Stack } from '@mui/system';

import Canvas from './Canvas';
import CanvasNav from './CanvasNav';
import socket from './helpers/socket';
import { GameRole } from './types/GameRole';

export default function Game(): JSX.Element {
  // Whether client is in a room/lobby
  const [role, setRole] = useState<GameRole>('real');
  const [prompt, setPrompt] = useState<string>('');

  const [penSize, setPenSize] = useState(5);
  const [penColor, setPenColor] = useState('black');

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
    <div className="game">
      <Stack spacing={1}>
        <Canvas penSize={penSize} penColor={penColor}></Canvas>
        <CanvasNav
          setPenSize={setPenSize}
          setPenColor={setPenColor}
        ></CanvasNav>
      </Stack>
    </div>
  );
}
