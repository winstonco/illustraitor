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

  return (
    <div className="game-nav">
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-around"
        paddingLeft={1}
        paddingRight={1}
      >
        <ButtonGroup
          variant="outlined"
          size="medium"
          fullWidth={true}
          sx={{ borderColor: 'black' }}
        >
          <Button
            onClick={() => {
              const name = window.prompt('Lobby Name');
              if (name) {
                setLobbyName(name);
                socket.emit('joinLobby', name, (res) => {
                  if (res === 'ok') {
                    console.log('Successfully joined lobby!');
                    props.setRoomy(true);
                  }
                });
              }
            }}
          >
            Join Lobby
          </Button>
          <Button
            onClick={() => {
              const name = window.prompt('Lobby Name');
              if (name) {
                setLobbyName(name);
                socket.emit('createLobby', name, (res) => {
                  if (res === 'ok') {
                    console.log('Successfully created lobby!');
                  }
                });
              }
            }}
          >
            Create Lobby
          </Button>
          <Button
            onClick={() =>
              socket.emit('leaveLobby', (res) => {
                if (res === 'ok') {
                  console.log('Successfully left lobby!');
                  props.setRoomy(false);
                }
              })
            }
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
