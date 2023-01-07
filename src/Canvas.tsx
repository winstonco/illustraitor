import { useRef } from 'react';
import { CanvasDrawer } from './helpers/CanvasDrawer';
import { socket } from './helpers/socketio';

export function Canvas() {
  const strokeWidth = 5;
  const canvas = useRef<HTMLCanvasElement>(null);
  CanvasDrawer.setUp(canvas);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { offsetX, offsetY } = event.nativeEvent;
    CanvasDrawer.beginDrawing(offsetX, offsetY);
    socket.emit('beginDrawing', offsetX, offsetY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { offsetX, offsetY } = event.nativeEvent;
    CanvasDrawer.drawTo(offsetX, offsetY, strokeWidth);
    socket.emit('drawTo', offsetX, offsetY, strokeWidth);
  };

  const handleMouseUp = (): void => {
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
      <button onClick={() => socket.emit('hello')}>Hello</button>
      <button
        onClick={() => socket.emit('joinLobby', prompt('name') ?? 'temp')}
      >
        Join Lobby
      </button>
      <button
        onClick={() => socket.emit('createLobby', prompt('name') ?? 'temp')}
      >
        Create Lobby
      </button>
      <button
        onClick={() => socket.emit('leaveLobby', prompt('name') ?? 'temp')}
      >
        Leave Lobby
      </button>
    </>
  );
}
