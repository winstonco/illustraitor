import { Stack, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import socket from './helpers/getSocket';
import { useLobby } from './hooks/useLobby';
import { useCanvas } from './hooks/useCanvas';
import GameSettings from './types/GameSettings';

export default function App() {
  const [role, setRole] = useState<string>('Real');
  const [prompt, setPrompt] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [settings, setSettings] = useState<GameSettings>({
    ['Turn Length']: 15,
    ['Guess Time']: 10,
    ['Imposter Count']: 1,
    ['Number of Rounds']: 1,
    ['Difficulty']: 'Medium',
    ['Custom Prompts']: [],
  });
  const { leaveLobby } = useLobby();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
      useCanvas(socket.id)[1]();
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
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <img
              width="600px"
              onClick={() => leaveLobby()}
              style={{ cursor: 'pointer' }}
              src="/logo-final.svg"
              alt="illustraitor logo"
            />
          </div>
          <Outlet
            context={{
              roleContext: [role, setRole],
              promptContext: [prompt, setPrompt],
              playerNameContext: [playerName, setPlayerName],
              settingsContext: [settings, setSettings],
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
  playerNameContext: [string, React.Dispatch<React.SetStateAction<string>>];
  settingsContext: [
    GameSettings,
    React.Dispatch<React.SetStateAction<GameSettings>>
  ];
};

export const useRole = () => {
  const { roleContext } = useOutletContext<ContextType>();
  return roleContext;
};

export const usePrompt = () => {
  const { promptContext } = useOutletContext<ContextType>();
  return promptContext;
};

export const usePlayerName = () => {
  const { playerNameContext } = useOutletContext<ContextType>();
  return playerNameContext;
};

export const useSettings = () => {
  const { settingsContext } = useOutletContext<ContextType>();
  return settingsContext;
};
