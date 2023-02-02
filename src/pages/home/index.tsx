import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Stack } from '@mui/system';

import { useLobbyName } from '../../App';
import socket from '../../helpers/getSocket';
import Changelog from './Changelog';
import { useState } from 'react';

export default function Home() {
  const [lobbyName, setLobbyName] = useLobbyName();
  const [hoverCreateLobby, setHoverCreateLobby] = useState<boolean>(false);
  const [hoverJoinLobby, setHoverJoinLobby] = useState<boolean>(false);
  const [hoverSettings, setHoverSettings] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreateLobby = () => {
    // const name = window.prompt('Lobby Name');
    const name = nanoid(12);
    if (name) {
      socket.emit('createLobby', name, (res) => {
        if (res) {
          setLobbyName(name);
          // console.log('Successfully created lobby!');
          navigate(`/join/${name}`);
        } else {
          // console.log('Failed to create lobby!');
        }
      });
    }
  };

  const handleJoinLobby = () => {
    navigate(`/join/${name}`);
  };

  const handleClickSettings = () => {};

  return (
    <Stack>
      <Stack direction="row" gap={'1rem'}>
        <Button
          variant={hoverCreateLobby ? 'contained' : 'outlined'}
          onMouseEnter={() => setHoverCreateLobby(true)}
          onMouseLeave={() => setHoverCreateLobby(false)}
          onClick={handleCreateLobby}
        >
          Create Lobby
        </Button>
        <Button
          variant={hoverJoinLobby ? 'contained' : 'outlined'}
          onMouseEnter={() => setHoverJoinLobby(true)}
          onMouseLeave={() => setHoverJoinLobby(false)}
          onClick={handleJoinLobby}
        >
          I Have A Code
        </Button>
        <Button
          variant="contained" //{hoverSettings ? 'contained' : 'outlined'}
          disabled
          onMouseEnter={() => setHoverSettings(true)}
          onMouseLeave={() => setHoverSettings(false)}
          onClick={handleClickSettings}
        >
          <SettingsIcon />
          Settings
        </Button>
      </Stack>
      <Changelog />
    </Stack>
  );
}
