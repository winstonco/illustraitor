import { Box } from '@mui/system';
import { useRef } from 'react';

import { CanvasDrawer } from './helpers/CanvasDrawer';
import socket from './helpers/socket';

export default function Canvas(props: { penSize: number; penColor: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  CanvasDrawer.setUp(canvas);
  let drawing: boolean = false;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    drawing = true;
    const { offsetX, offsetY } = event.nativeEvent;
    CanvasDrawer.beginDrawing(offsetX, offsetY);
    console.log('Mouse down');
    socket.emit('beginDrawing', offsetX, offsetY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (drawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      CanvasDrawer.drawTo(offsetX, offsetY, props.penSize, props.penColor);
      socket.emit('drawTo', offsetX, offsetY, props.penSize, props.penColor);
    }
  };

  const handleMouseUp = (): void => {
    drawing = false;
    CanvasDrawer.endDrawing();
    socket.emit('endDrawing');
  };

  return (
    <Box sx={{ border: 3, height: 400 }}>
      <canvas
        ref={canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width="594"
        height="400"
      ></canvas>
    </Box>
  );
}
