import { Stack, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import socket from './helpers/socket';

export default function App() {
  const [role, setRole] = useState<string>('Real');
  const [prompt, setPrompt] = useState<string>('');
  const [lobbyName, setLobbyName] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      console.log(socket.id); // undefined
    });

    return () => {
      socket.removeAllListeners('connect');
      socket.removeAllListeners('disconnect');
    };
  }, []);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1}>
        <div className="App">
          <h1>Sham Illustrator</h1>
          <Outlet
            context={{
              roleContext: [role, setRole],
              promptContext: [prompt, setPrompt],
              lobbyNameContext: [lobbyName, setLobbyName],
            }}
          />
        </div>
      </Stack>
    </Container>
  );
}

type ContextType = {
  roleContext: [string, React.Dispatch<React.SetStateAction<string>>];
  promptContext: [string, React.Dispatch<React.SetStateAction<string>>];
  lobbyNameContext: [string, React.Dispatch<React.SetStateAction<string>>];
};

export const useRole = () => {
  const { roleContext } = useOutletContext<ContextType>();
  return roleContext;
};

export const usePrompt = () => {
  const { promptContext } = useOutletContext<ContextType>();
  return promptContext;
};

export const useLobbyName = () => {
  const { lobbyNameContext } = useOutletContext<ContextType>();
  return lobbyNameContext;
};
