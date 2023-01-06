// https://socket.io/docs/v4/typescript/

import { IDraw } from './IDraw';

export interface ServerToClientEvents extends IDraw {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents extends IDraw {
  hello: () => void; // temp
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
