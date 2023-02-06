import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/system';
import { useState } from 'react';

import Changelog from './Changelog';
import { useLobby } from '../../hooks/useLobby';

export default function Home() {
  const [hoverCreateLobby, setHoverCreateLobby] = useState<boolean>(false);
  const [hoverJoinLobby, setHoverJoinLobby] = useState<boolean>(false);
  const [hoverSettings, setHoverSettings] = useState<boolean>(false);
  const { lobbyName, setLobbyName, createLobby, leaveLobby } = useLobby();

  const navigate = useNavigate();

  const handleCreateLobby = () => {
    createLobby();
  };

  const handleJoinLobby = () => {
    navigate(`/join`);
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
      {/* <Changelog /> */}
    </Stack>
  );
}
