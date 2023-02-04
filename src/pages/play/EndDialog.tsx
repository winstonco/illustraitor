import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';

import socket from '../../helpers/getSocket';

export default function EndDialog() {
  const [endDialogOpen, setEndDialogOpen] = useState<boolean>(false);
  const [majorityVote, setMajorityVote] = useState<{
    name: string;
    count: number;
  }>();
  const [imposterFound, setImposterFound] = useState<boolean>();

  useEffect(() => {
    socket.on('votingFinished', (majorityVote) => {
      setMajorityVote(majorityVote);
    });
    socket.on('endGame', (imposterWasFound) => {
      setEndDialogOpen(true);
      setImposterFound(imposterWasFound);
    });

    return () => {
      socket.removeAllListeners('votingFinished');
    };
  }, []);

  const handleClose = () => {
    setEndDialogOpen(false);
  };

  return (
    <Container>
      <Dialog open={endDialogOpen} onClose={handleClose}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          {majorityVote ? (
            <>
              <h3>Players Voted For:</h3>
              <p>{majorityVote?.name}</p>
              <p>With {majorityVote?.count} votes</p>
            </>
          ) : (
            <></>
          )}
          {imposterFound === undefined ? (
            <></>
          ) : imposterFound ? (
            <h3>Real Artists Win!</h3>
          ) : (
            <h3>Imposter Wins!</h3>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
