let isDrawing = false;

const beginDrawing = (
  canvas: React.RefObject<HTMLCanvasElement>,
  startX: number,
  startY: number
): void => {
  isDrawing = true;
  const ctx = canvas.current!.getContext('2d');
  ctx?.beginPath();
  ctx?.moveTo(startX, startY);
};

const drawTo = (
  canvas: React.RefObject<HTMLCanvasElement>,
  toX: number,
  toY: number,
  width = 1
): void => {
  if (isDrawing) {
    const ctx = canvas.current!.getContext('2d');
    ctx!.lineWidth = width;
    ctx?.lineTo(toX, toY);
    ctx?.stroke();
  }
};

const endDrawing = (): void => {
  isDrawing = false;
};

const clearCanvas = (canvas: React.RefObject<HTMLCanvasElement>): void => {
  console.log('Cleared!');
  canvas.current?.getContext('2d')?.clearRect(0, 0, 500, 400);
};

export { beginDrawing, drawTo, endDrawing, clearCanvas };
