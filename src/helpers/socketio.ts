import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socketio';
import { CanvasDrawer } from './CanvasDrawer';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:5555'
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
