import { io } from 'socket.io-client';
import { GameSocket } from '../types/socketio';
import { CanvasDrawer } from './CanvasDrawer';

const socket: GameSocket = io(
  import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5555'
);

socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});

socket.on('beginDrawing', CanvasDrawer.beginDrawing);
socket.on('drawTo', CanvasDrawer.drawTo);
socket.on('endDrawing', CanvasDrawer.endDrawing);
socket.on('clearCanvas', CanvasDrawer.clearCanvas);
socket.on('readyCheck', (callback) => {
  callback(null, 'ok');
});

export { socket };
