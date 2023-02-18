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

export default function VoteEndDialog() {
  const [voteEndDialogOpen, setVoteEndDialogOpen] = useState<boolean>(false);
  const [majorityVote, setMajorityVote] = useState<{
    name: string;
    count: number;
  }>();

  useEffect(() => {
    socket.on('votingFinished', (majorityVote) => {
      setMajorityVote(majorityVote);
      setVoteEndDialogOpen(true);
    });
    socket.on('endRound', () => {
      setVoteEndDialogOpen(false);
    });

    return () => {
      socket.removeAllListeners('votingFinished');
      socket.removeAllListeners('endRound');
    };
  }, []);

  const handleCloseVoteEndDialog = () => {
    setVoteEndDialogOpen(false);
  };

  return (
    <Container className="dialog">
      <Dialog open={voteEndDialogOpen} onClose={handleCloseVoteEndDialog}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVoteEndDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
