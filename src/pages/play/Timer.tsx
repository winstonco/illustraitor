import { useEffect, useState } from 'react';

import socket from '../../helpers/getSocket';

export default function Timer(): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [targetTime, setTargetTime] = useState<number>(Date.now());

  const startTimer = (duration: number) => {
    setTargetTime(Date.now() + duration * 1000);
    setTime(duration);
  };

  useEffect(() => {
    socket.on('startTurnAll', (currentPlayerName, turnTime) => {
      startTimer(turnTime);
    });

    socket.on('guessImposter', (guessTime, callback) => {
      startTimer(guessTime);
    });

    socket.on('votingFinished', () => {
      setTime(0);
    });

    socket.on('endRound', () => {
      setTime(0);
    });
  }, [startTimer]);

  useEffect(() => {
    if (targetTime - Date.now() > 0) {
      setTimeout(() => {
        setTime(Math.ceil((targetTime - Date.now()) / 1000));
        // time--;
      }, 1000);
    }
  }, [time]);

  return <span className="timer">{time}</span>;
}
