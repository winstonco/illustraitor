import { io } from 'socket.io-client';

import { GameSocket } from '../types/SocketIOEvents';

const socket: GameSocket = io(
  import.meta.env.VITE_SERVER_URL ?? 'http://localhost:5555'
);

export default socket;
