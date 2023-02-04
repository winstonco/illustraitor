import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

import socket from '../helpers/getSocket';

let lobbyName = '';

export const useLobby = () => {
  // const [lobbyName, setLobbyName] = useState('');
  const navigate = useNavigate();

  const setLobbyName = (name: string) => {
    lobbyName = name;
  };

  const createLobby = () => {
    // const name = window.prompt('Lobby Name');
    const name = nanoid(12);
    if (name) {
      socket.emit('createLobby', name, (res) => {
        if (res) {
          console.log(name);
          setLobbyName(name);
          // console.log('Successfully created lobby!');
          navigate(`/join/${name}`);
        } else {
          // console.log('Failed to create lobby!');
        }
      });
    }
  };

  const leaveLobby = () => {
    if (lobbyName !== '') {
      socket.emit('leaveLobby', (res) => {
        if (res) {
          console.log('Successfully left lobby!');
          // setLobbyName('');
          navigate('/');
          return;
        } else {
          console.log('Failed to leave lobby!');
        }
      });
    }
    navigate('/');
  };

  // const getUseState: () => [
  //   string,
  //   React.Dispatch<React.SetStateAction<string>>
  // ] = () => {
  //   console.log(lobbyName);
  //   return [lobbyName, setLobbyName];
  // };

  return { lobbyName, setLobbyName, createLobby, leaveLobby };
};
