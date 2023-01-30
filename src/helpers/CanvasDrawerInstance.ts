import CanvasDrawer from './CanvasDrawer';

export default class CanvasDrawerInstance {
  id: string;
  lastPos: [number, number];
  lastLastPos: [number, number] | undefined;
  isDrawing: boolean;

  constructor(id: string) {
    this.id = id;
    this.isDrawing = false;
    this.lastPos = [0, 0];
  }

  beginDrawing = (startX: number, startY: number): void => {
    this.isDrawing = true;
    this.lastPos = [startX, startY];
    this.lastLastPos = undefined;
    CanvasDrawer.dot(startX, startY);
  };

  drawTo = (toX: number, toY: number, width?: number, color?: string): void => {
    if (this.isDrawing) {
      this.drawLine(toX, toY, width, color);
    }
  };

  endDrawing = (): void => {
    this.isDrawing = false;
    CanvasDrawer.dot(this.lastPos[0], this.lastPos[1]);
  };

  // Redundancy with CanvasDrawer
  static clearCanvas = (): void => CanvasDrawer.clearCanvas();

  private drawLine(toX: number, toY: number, width?: number, color?: string) {
    if (this.lastLastPos !== undefined) {
      CanvasDrawer.beginDrawing(this.lastLastPos[0], this.lastLastPos[1]);
      CanvasDrawer.drawTo(toX, toY, width, color);
      CanvasDrawer.endDrawing();
    }
    this.lastLastPos = this.lastPos;
    this.lastPos = [toX, toY];
  }
}
