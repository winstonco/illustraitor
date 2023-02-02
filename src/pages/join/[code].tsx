import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { useLobbyName, usePlayerName } from '../../App';
import socket from '../../helpers/getSocket';
import Login from './Login';

export async function loader({ params }: any) {
  let code = '-1';
  return new Promise<string>((resolve) => {
    if (params.code) {
      socket.emit('joinLobby', params.code, (res) => {
        if (res) {
          console.log('Successfully joined lobby!');
          code = params.code;
        } else {
          console.log('Failed to join lobby!');
        }
        resolve(code);
      });
    }
  });
}

export default function Join() {
  const [lobbyName, setLobbyName] = useLobbyName();
  const [playerName, setPlayerName] = usePlayerName();
  const navigate = useNavigate();
  const code = useLoaderData();

  const handleNameSubmit = (name: string) => {
    // check name?
    socket.emit('namePlayer', lobbyName, name, (res) => {
      if (res) {
        // console.log('Player was named');
        if (typeof code === 'string' && code !== '-1') {
          console.log(name);
          setPlayerName(name);
          setLobbyName(code);
          navigate('/play');
        }
      } else {
        // console.log('Failed to name player');
      }
    });
  };

  // redirect on mount if no code / bad code
  useEffect(() => {
    const codeIsGood = typeof code === 'string' && code !== '-1';
    if (codeIsGood) {
      setLobbyName(code);
    } else {
      // window.alert('Failed to join lobby!');
      navigate('/');
    }
  }, []);

  return <Login onNameSubmit={handleNameSubmit} />;
}
