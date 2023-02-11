import { Alert, Button, ButtonGroup, Snackbar, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

import socket from '../../helpers/getSocket';
import Timer from './Timer';
import { usePlayerName } from '../../App';
import { useLobby } from '../../hooks/useLobby';
import GameSettings from '../../types/GameSettings';
import Dialogs from './dialogs/Dialogs';

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

  const handleGetLink = () => {
    let inviteLink = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.hostname === 'localhost')
      inviteLink += `:${window.location.port}`;
    inviteLink += `/join/${lobbyName}`;
    console.log(inviteLink);
    navigator.clipboard.writeText(inviteLink);
  };

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
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
          Name: {playerName}
        </h2>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
          In Lobby: {lobbyName}
        </h2>
        <Button onClick={handleGetLink}>
          <ContentCopyIcon /> Copy Invite Link
        </Button>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>
          {isPlaying ? 'Your Role: ' + role : ''}
        </h2>
        <h2 style={{ marginTop: 0, marginBottom: 0, wordWrap: 'normal' }}>
          {isPlaying ? 'Prompt: ' + prompt : ''}
        </h2>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>
          {isPlaying ? 'Current Drawer: ' + currentPlayerName : ''}
        </h2>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        padding={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <ButtonGroup
          variant="outlined"
          size="large"
          sx={{ borderColor: 'black' }}
        >
          <Button onClick={handleStartGame} variant="contained">
            Start
          </Button>
          <Button onClick={handleCreateLobby}>Create New Lobby</Button>
          <Button onClick={handleLeaveLobby}>Leave Lobby</Button>
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
