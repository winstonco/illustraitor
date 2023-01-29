import { useEffect } from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';

import { useLobbyName } from '../../App';

import socket from '../../helpers/socket';

export async function loader({ params }: any) {
  console.log(params);
  let code = '-1';
  return new Promise<string>((resolve) => {
    if (params.code) {
      socket.emit('joinLobby', params.code, (res) => {
        if (res === 'ok') {
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
  const navigate = useNavigate();
  const code = useLoaderData();

  // redirect on render
  useEffect(() => {
    if (typeof code === 'string' && code !== '-1') {
      setLobbyName(code);
      navigate('/play');
    } else {
      navigate('/');
    }
  }, []);

  return <h2>Joining Lobby</h2>;
}
