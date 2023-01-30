import { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/system';

import Canvas from './canvas/Canvas';
import Toolbar from './canvas/Toolbar';
import socket from '../../helpers/socket';
import { useCanvas } from './canvas/useCanvas';

export default function Game(): JSX.Element {
  const [penSize, setPenSize] = useState(5);
  const [penColor, setPenColor] = useState('black');
  const cd = useCanvas(socket.id);

  useEffect(() => {
    if (cd) {
      socket.on('beginDrawing', cd.beginDrawing);
      socket.on('drawTo', cd.drawTo);
      socket.on('endDrawing', cd.endDrawing);
      socket.on('clearCanvas', cd.clearCanvas);
    }

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
