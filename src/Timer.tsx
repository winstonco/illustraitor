import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

import socket from './helpers/socket';

export default function Timer(): JSX.Element {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
        // time--;
      }, 1000);
    }
  }, [time]);

  socket.on('startTurn', (turnTime) => {
    setTime(turnTime);
  });

  return <Chip label={time} />;
}
