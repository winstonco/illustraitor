// https://socket.io/docs/v4/typescript/

import { Socket } from 'socket.io-client';
import IDraw from './IDraw';
import { GameRole } from './roles';

interface ServerToClientEvents extends IDraw {
  readyCheck: (callback: (err: Error, responses: 'ok') => void) => void;
  startGame: () => void;
  role: (role: GameRole) => void;
  prompt: (prompt: string) => void;
  startTurn: () => void;
  endTurn: () => void;
}

interface ClientToServerEvents extends IDraw {
  hello: () => void;
  createLobby: (lobbyName: string, lobbySize?: number) => void;
  joinLobby: (lobbyName: string) => void;
  leaveLobby: (lobbyName: string) => void;
}

export type { ServerToClientEvents, ClientToServerEvents };

export interface GameSocket
  extends Socket<ServerToClientEvents, ClientToServerEvents> {}
