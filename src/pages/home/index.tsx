import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useLobbyName } from '../../App';
import socket from '../../helpers/socket';
import Changelog from './Changelog';
import { Stack } from '@mui/system';

export default function Home() {
  const [lobbyName, setLobbyName] = useLobbyName();

  const navigate = useNavigate();

  return (
    <Stack>
      <Stack direction="row">
        <Button
          variant="contained"
          onClick={() => {
            // const name = window.prompt('Lobby Name');
            const name = nanoid(12);
            if (name) {
              socket.emit('createLobby', name, (res) => {
                if (res === 'ok') {
                  setLobbyName(name);
                  console.log('Successfully created lobby!');
                  navigate('/play');
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
          variant="contained"
          disabled
          onClick={() => {
            // Nothing yet
          }}
        >
          <SettingsIcon />
          Settings
        </Button>
      </Stack>
      <Changelog />
    </Stack>
  );
}
