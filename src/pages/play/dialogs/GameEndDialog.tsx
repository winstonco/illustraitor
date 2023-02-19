import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';

import socket from '../../../helpers/getSocket';
import { GameRole } from '../../../types/GameRole';

export default function GameEndDialog() {
  const [gameEndDialogOpen, setGameEndDialogOpen] = useState<boolean>(false);
  const [winners, setWinners] = useState<GameRole>();
  const [impostersFound, setImpostersFound] = useState<string[]>([]);

  useEffect(() => {
    socket.on('endGame', (impostersFound, winners) => {
      setImpostersFound(impostersFound);
      setGameEndDialogOpen(true);
      setWinners(winners);
    });

    return () => {
      socket.removeAllListeners('endGame');
    };
  }, []);

  const handleCloseGameEndDialog = () => {
    setGameEndDialogOpen(false);
  };

  return (
    <Container className="dialog">
      <Dialog open={gameEndDialogOpen} onClose={handleCloseGameEndDialog}>
        <DialogContent>
          <h3>Imposter(s) Found:</h3>
          {impostersFound.length === 0 ? (
            <p key="none">None</p>
          ) : (
            impostersFound.map((imposter) => <p key={imposter}>{imposter}</p>)
          )}
          {winners === 'real' ? (
            <h3>Real Artists Win!</h3>
          ) : (
            <h3>Imposter Wins!</h3>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGameEndDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
