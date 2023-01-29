import { Button, ButtonGroup } from '@mui/material';
import { Stack } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import socket from '../../helpers/socket';
import Timer from './Timer';

export default function GameNav({
  lobbyName,
  setLobbyName,
  role,
  prompt,
  currentPlayerName,
}: {
  lobbyName: string;
  setLobbyName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  prompt: string;
  currentPlayerName: string;
}): JSX.Element {
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
      <h2>In Lobby: {lobbyName}</h2>
      <h2>Role: {role}</h2>
      <h2>Prompt: {prompt}</h2>
      <h2>Current Player: {currentPlayerName}</h2>
      <h3>
        <Button onClick={handleGetLink}>
          <ContentCopyIcon /> Copy Invite Link
        </Button>
      </h3>
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
              const name = window.prompt('Lobby Name');
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
            Create Lobby
          </Button>
          <Button
            onClick={() => {
              const name = window.prompt('Lobby Name');
              if (name) {
                socket.emit('joinLobby', name, (res) => {
                  if (res === 'ok') {
                    console.log('Successfully joined lobby!');
                    setLobbyName(name);
                    return;
                  } else {
                    console.log('Failed to join lobby!');
                  }
                });
              }
            }}
          >
            Join Lobby
          </Button>
          <Button
            onClick={() => {
              if (lobbyName !== '') {
                socket.emit('leaveLobby', (res) => {
                  if (res === 'ok') {
                    console.log('Successfully left lobby!');
                    setLobbyName('');
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
