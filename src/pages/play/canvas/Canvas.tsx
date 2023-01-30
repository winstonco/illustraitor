import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import CanvasDrawer from '../../../helpers/CanvasDrawer';

import socket from '../../../helpers/getSocket';
import { useCanvas } from './useCanvas';

export default function Canvas(props: { penSize: number; penColor: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  CanvasDrawer.setup(canvas);
  let drawing: boolean = false;

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (box.current) setCanvasWidth(box.current.offsetWidth);
  }, [canvasWidth]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    drawing = true;
    const { offsetX, offsetY } = event.nativeEvent;
    useCanvas(socket.id)?.beginDrawing(offsetX, offsetY);
    console.log('Mouse down');
    socket.emit('beginDrawing', socket.id, offsetX, offsetY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (drawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      useCanvas(socket.id)?.drawTo(
        offsetX,
        offsetY,
        props.penSize,
        props.penColor
      );
      socket.emit(
        'drawTo',
        socket.id,
        offsetX,
        offsetY,
        props.penSize,
        props.penColor
      );
    }
  };

  const handleMouseUp = (): void => {
    drawing = false;
    useCanvas(socket.id)?.endDrawing();
    socket.emit('endDrawing', socket.id);
  };

  return (
    <Box ref={box} sx={{ maxWidth: 'md', border: 3, height: 400 }}>
      <canvas
        style={{ touchAction: 'none', maxWidth: 'md' }}
        ref={canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        height={400}
        width={canvasWidth - 6}
      ></canvas>
    </Box>
  );
}
