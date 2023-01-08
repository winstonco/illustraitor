import { useRef } from 'react';
import { CanvasDrawer } from './helpers/CanvasDrawer';
import { socket } from './helpers/socketio';

export default function Canvas() {
  const strokeWidth = 5;
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
      CanvasDrawer.drawTo(offsetX, offsetY, strokeWidth);
      socket.emit('drawTo', offsetX, offsetY, strokeWidth);
    }
  };

  const handleMouseUp = (): void => {
    drawing = false;
    CanvasDrawer.endDrawing();
    socket.emit('endDrawing');
  };

  const clearCanvas = (): void => {
    CanvasDrawer.clearCanvas();
    socket.emit('clearCanvas');
  };

  return (
    <>
      <canvas
        ref={canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        width="500"
        height="400"
      ></canvas>
      <button onClick={clearCanvas}>Clear Canvas</button>
    </>
  );
}
