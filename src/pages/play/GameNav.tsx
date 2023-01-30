import { Button, ButtonGroup } from '@mui/material';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

import socket from '../../helpers/getSocket';
import Timer from './Timer';

export default function GameNav({
  lobbyName,
  setLobbyName,
  role,
  prompt,
  currentPlayerName,
  isPlaying,
}: {
  lobbyName: string;
  setLobbyName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  prompt: string;
  currentPlayerName: string;
  isPlaying: boolean;
}): JSX.Element {
  const navigate = useNavigate();

  const handleGetLink = () => {
    let inviteLink = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.hostname === 'localhost')
      inviteLink += `:${window.location.port}`;
    inviteLink += `/join/${lobbyName}`;
    console.log(inviteLink);
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <div className="game-nav">
      <Stack alignItems="flex-start">
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>In Lobby: {lobbyName}</h2>
        <Button onClick={handleGetLink}>
          <ContentCopyIcon /> Copy Invite Link
        </Button>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>
          {isPlaying ? 'Your Role: ' + role : ''}
        </h2>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>
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
          <Button
            onClick={() => {
              const name = nanoid(12);
              if (name) {
                socket.emit('createLobby', name, (res) => {
                  if (res === 'ok') {
                    setLobbyName(name);
                    console.log('Successfully created lobby!');
                  } else {
                    console.log('Failed to create lobby!');
                  }
                });
              }
            }}
          >
            Create New Lobby
          </Button>
          <Button
            onClick={() => {
              if (lobbyName !== '') {
                socket.emit('leaveLobby', (res) => {
                  if (res === 'ok') {
                    console.log('Successfully left lobby!');
                    setLobbyName('');
                    navigate('/');
                    return;
                  } else {
                    console.log('Failed to leave lobby!');
                  }
                });
              }
            }}
          >
            Leave Lobby
          </Button>
          <Button
            onClick={() => {
              if (lobbyName !== '') {
                socket.emit('startGame', lobbyName);
              }
            }}
          >
            Start
          </Button>
        </ButtonGroup>
        <Timer />
      </Stack>
    </div>
  );
}
