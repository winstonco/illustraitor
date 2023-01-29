import { useEffect, useState } from 'react';

import socket from '../../helpers/socket';

export default function Timer(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [targetTime, setTargetTime] = useState<number>(Date.now());

  useEffect(() => {
    socket.on('startTurn', (turnTime) => {
      setTargetTime(Date.now() + turnTime * 1000);
      setTime(turnTime);
    });

    return () => {
      socket.removeAllListeners('startTurn');
    };
  }, []);

  useEffect(() => {
    if (targetTime - Date.now() > 0) {
      setTimeout(() => {
        setTime(Math.ceil((targetTime - Date.now()) / 1000));
        // time--;
      }, 1000);
    }
  }, [time]);

  return <p style={{ fontSize: '30px' }}>{time}</p>;
}
