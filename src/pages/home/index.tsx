import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useLobbyName } from '../../App';
import socket from '../../helpers/socket';

export default function Home() {
  const [lobbyName, setLobbyName] = useLobbyName();

  const navigate = useNavigate();

  // socket.on('connect', () => setLobbyName(''));

  return (
    <>
      <Button
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
    </>
  );
}
