// "implements" IDraw but with static methods
export class CanvasDrawer {
  static isDrawing: boolean;
  static canvas: React.RefObject<HTMLCanvasElement>;

  static setUp(canvas: React.RefObject<HTMLCanvasElement>) {
    CanvasDrawer.isDrawing = false;
    CanvasDrawer.canvas = canvas;
  }

  static beginDrawing = (startX: number, startY: number): void => {
    CanvasDrawer.isDrawing = true;
    const ctx = CanvasDrawer.canvas.current!.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(startX, startY);
  };

  static drawTo = (
    toX: number,
    toY: number,
    width = 1,
    color = 'black'
  ): void => {
    if (CanvasDrawer.isDrawing) {
      const ctx = CanvasDrawer.canvas.current!.getContext('2d');
      ctx!.strokeStyle = color;
      ctx!.lineWidth = width;
      ctx?.lineTo(toX, toY);
      ctx?.stroke();
    }
  };

  static endDrawing = (): void => {
    CanvasDrawer.isDrawing = false;
  };

  static clearCanvas = (): void => {
    console.log('Cleared!');
    CanvasDrawer.canvas.current?.getContext('2d')?.clearRect(0, 0, 500, 400);
  };
}
