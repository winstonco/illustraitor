import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import socket from '../../helpers/socket';

export default function Timer(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [targetTime, setTargetTime] = useState<number>(Date.now());

  const startTimer = (duration: number) => {
    setTargetTime(Date.now() + duration * 1000);
    setTime(duration);
  };

  useEffect(() => {
    socket.on('startTurn', (turnTime) => {
      startTimer(turnTime);
    });

    socket.on('guessImposter', (guessTime, callback) => {
      startTimer(guessTime);
    });

    return () => {
      socket.removeAllListeners('startTurn');
    };
  }, [startTimer]);

  useEffect(() => {
    if (targetTime - Date.now() > 0) {
      setTimeout(() => {
        setTime(Math.ceil((targetTime - Date.now()) / 1000));
        // time--;
      }, 1000);
    }
  }, [time]);

  return (
    <Typography my={0} sx={{ fontSize: '1.3rem' }} variant="button">
      Time Left: {time}
    </Typography>
  );
}
