import { useEffect, useRef } from 'react';

export function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);

  const strokeWidth = 5;
  let mouseDown = false;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    mouseDown = true;
    console.log('clicked');
    if (canvas.current != null) {
      const ctx = canvas.current.getContext('2d');
      ctx?.fillRect(
        event.nativeEvent.offsetX - strokeWidth / 2,
        event.nativeEvent.offsetY - strokeWidth / 2,
        strokeWidth,
        strokeWidth
      );
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (canvas.current != null && mouseDown) {
      const ctx = canvas.current.getContext('2d');
      console.log([event.nativeEvent.offsetX, event.nativeEvent.offsetY]);
      ctx?.fillRect(
        event.nativeEvent.offsetX - strokeWidth / 2,
        event.nativeEvent.offsetY - strokeWidth / 2,
        strokeWidth,
        strokeWidth
      );
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    mouseDown = false;
  };

  return (
    <canvas
      ref={canvas}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      width="1000"
      height="1000"
    ></canvas>
  );
}
