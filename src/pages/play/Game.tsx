import { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/system';

import Canvas from './canvas/Canvas';
import Toolbar from './canvas/Toolbar';
import socket from '../../helpers/getSocket';
import { useCanvas } from '../../hooks/useCanvas';
import CanvasDrawer from '../../helpers/CanvasDrawer';

export default function Game(): JSX.Element {
  const [penSize, setPenSize] = useState(5);
  const [penColor, setPenColor] = useState('black');

  useEffect(() => {
    socket.on('beginDrawing', (id, ...args) => {
      useCanvas(id)[0].beginDrawing(...args);
    });
    socket.on('drawTo', (id, ...args) => {
      useCanvas(id)[0].drawTo(...args);
    });
    socket.on('endDrawing', (id, ...args) => {
      useCanvas(id)[0].endDrawing(...args);
    });
    socket.on('clearCanvas', CanvasDrawer.clearCanvas);

    return () => {
      socket.removeAllListeners('beginDrawing');
      socket.removeAllListeners('drawTo');
      socket.removeAllListeners('endDrawing');
      socket.removeAllListeners('clearCanvas');
    };
  }, []);

  return (
    <Stack spacing={1} maxWidth={606}>
      <Canvas penSize={penSize} penColor={penColor}></Canvas>
      <Toolbar setPenSize={setPenSize} setPenColor={setPenColor}></Toolbar>
    </Stack>
  );
}
