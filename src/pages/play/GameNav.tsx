import { Alert, Button, ButtonGroup, Snackbar, Stack } from '@mui/material';
import { useState } from 'react';

import socket from '../../helpers/getSocket';
import Timer from './Timer';
import { usePlayerName } from '../../App';
import { useLobby } from '../../hooks/useLobby';
import GameSettings from '../../types/GameSettings';

export default function GameNav({
  role,
  prompt,
  currentPlayerName,
  isPlaying,
  playerNames,
  settings,
}: {
  role: string;
  prompt: string;
  currentPlayerName: string;
  isPlaying: boolean;
  playerNames: string[];
  settings: GameSettings;
}): JSX.Element {
  const [playerName, setPlayerName] = usePlayerName();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const { lobbyName, createLobby, leaveLobby } = useLobby();

  const handleCreateLobby = () => {
    createLobby(settings);
  };

  const handleLeaveLobby = () => {
    leaveLobby();
  };

  const handleStartGame = () => {
    if (lobbyName !== '') {
      socket.emit('startGame', lobbyName, (res) => {
        if (!res) {
          setSnackbarOpen(true);
        }
      });
    }
  };

  const handleCloseAlert = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="game-nav">
      <Stack alignItems="flex-start">
        <h2 className="game-nav-item">Name: {playerName}</h2>
        <h2 className="game-nav-item">
          {isPlaying ? 'Your Role: ' + role : ''}
        </h2>
        <h2 className="game-nav-item">
          {isPlaying ? 'Prompt: ' + prompt : ''}
        </h2>
        <h2 className="game-nav-item">
          {isPlaying ? 'Current Drawer: ' + currentPlayerName : ''}
        </h2>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        padding={1}
        alignItems="center"
        justifyContent="space-between"
        marginTop="10px"
      >
        <ButtonGroup
          variant="outlined"
          size="large"
          sx={{ borderColor: 'black' }}
        >
          <Button
            onClick={handleStartGame}
            variant="contained"
            aria-label="start button"
          >
            Start
          </Button>
          <Button
            onClick={handleCreateLobby}
            aria-label="create new lobby button"
          >
            Create New Lobby
          </Button>
          <Button onClick={handleLeaveLobby} aria-label="leave lobby button">
            Leave Lobby
          </Button>
        </ButtonGroup>
        <Timer />
      </Stack>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          Not enough players!
        </Alert>
      </Snackbar>
    </div>
  );
}
