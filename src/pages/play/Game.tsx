import { useEffect, useState } from 'react';
import { Stack } from '@mui/system';

import Canvas from '../../Canvas';
import Toolbar from '../../Toolbar';
import socket from '../../helpers/socket';
import { CanvasDrawer } from '../../helpers/CanvasDrawer';

export default function Game(): JSX.Element {
  const [penSize, setPenSize] = useState(5);
  const [penColor, setPenColor] = useState('black');

  useEffect(() => {
    socket.on('beginDrawing', CanvasDrawer.beginDrawing);
    socket.on('drawTo', CanvasDrawer.drawTo);
    socket.on('endDrawing', CanvasDrawer.endDrawing);
    socket.on('clearCanvas', CanvasDrawer.clearCanvas);

    return () => {
      socket.removeAllListeners('beginDrawing');
      socket.removeAllListeners('drawTo');
      socket.removeAllListeners('endDrawing');
      socket.removeAllListeners('clearCanvas');
    };
  }, []);

  return (
    <div className="game">
      <Stack spacing={1} maxWidth={606}>
        <Canvas penSize={penSize} penColor={penColor}></Canvas>
        <Toolbar setPenSize={setPenSize} setPenColor={setPenColor}></Toolbar>
      </Stack>
    </div>
  );
}
