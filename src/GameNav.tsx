import { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Stack } from '@mui/system';

import socket from './helpers/socket';
import Timer from './Timer';

export default function GameNav(props: {
  setRoomy: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  // replace with cookies?
  const [lobbyName, setLobbyName] = useState<string>('');
  socket.on('connect', () => setLobbyName(''));

  return (
    <div className="game-nav">
      <h2>In Lobby: {lobbyName}</h2>
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
                    props.setRoomy(true);
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
                    props.setRoomy(false);
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
