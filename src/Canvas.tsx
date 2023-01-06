import { useRef } from 'react';
import { beginDrawing, drawTo, endDrawing, clearCanvas } from './helpers/draw';

export function Canvas() {
  const strokeWidth = 5;
  const canvas = useRef<HTMLCanvasElement>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { offsetX, offsetY } = event.nativeEvent;
    beginDrawing(canvas, offsetX, offsetY);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    const { offsetX, offsetY } = event.nativeEvent;
    drawTo(canvas, offsetX, offsetY, strokeWidth);
  };

  const handleMouseUp = (): void => {
    endDrawing();
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
      <button onClick={() => clearCanvas(canvas)}>Clear Canvas</button>
    </>
  );
}
