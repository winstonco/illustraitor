import { Button, Divider, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Changelog from './Changelog';
import { useLobby } from '../../hooks/useLobby';
import SettingsDialog from './SettingsDialog';
import { useSettings } from '../../App';
import Typography from '@mui/material/Typography/Typography';
import { GameSettingsKeys } from '../../types/GameSettings';

export default function Home() {
  const [hoverCreateLobby, setHoverCreateLobby] = useState<boolean>(false);
  const [hoverJoinLobby, setHoverJoinLobby] = useState<boolean>(false);
  const [hoverSettings, setHoverSettings] = useState<boolean>(false);
  const [settings, setSettings] = useSettings();

  const { createLobby } = useLobby();
  const [settingsDialogIsOpen, setSettingsDialogIsOpen] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleCreateLobby = () => {
    createLobby(settings);
  };

  const handleJoinLobby = () => {
    navigate(`/join`);
  };

  const handleClickSettings = () => {
    setSettingsDialogIsOpen(true);
  };

  return (
    <Stack gap={'1rem'}>
      <Stack direction="row" gap={'1rem'} justifyContent="center">
        <button
          aria-label="create lobby button"
          onClick={handleCreateLobby}
          onMouseOver={() => setHoverCreateLobby(true)}
          onMouseOut={() => setHoverCreateLobby(false)}
          style={{
            border: 'none',
            cursor: 'pointer',
            transform: `scale(${hoverCreateLobby ? '1.02' : '1.0'})`,
          }}
        >
          <img
            width="200px"
            src="/create-lobby.svg"
            alt="create lobby button"
          />
        </button>
        <button
          aria-label="join lobby button"
          onClick={handleJoinLobby}
          onMouseOver={() => setHoverJoinLobby(true)}
          onMouseOut={() => setHoverJoinLobby(false)}
          style={{
            border: 'none',
            cursor: 'pointer',
            transform: `scale(${hoverJoinLobby ? '1.02' : '1.0'})`,
          }}
        >
          <img width="200px" src="/join-lobby.svg" alt="join lobby button" />
        </button>
        <button
          aria-label="settings button"
          onClick={handleClickSettings}
          onMouseOver={() => setHoverSettings(true)}
          onMouseOut={() => setHoverSettings(false)}
          style={{
            border: 'none',
            cursor: 'pointer',
            transform: `scale(${hoverSettings ? '1.02' : '1.0'})`,
          }}
        >
          <img width="200px" src="/settings.svg" alt="settings button" />
        </button>
        <SettingsDialog
          settingsIsOpen={settingsDialogIsOpen}
          setSettingsIsOpen={setSettingsDialogIsOpen}
          settings={settings}
          setSettings={setSettings}
        />
      </Stack>
      <Stack>
        <Typography variant="h5">Current lobby settings</Typography>
        <Typography variant="subtitle1">
          {GameSettingsKeys.map((key) => {
            let value: any = settings[key];
            switch (key) {
              case 'Number of Rounds':
                value = 'Default';
                break;
              case 'Custom Prompts':
                if (settings[key]?.length === 0) value = 'None';
                break;
            }
            return (
              <p key={key}>
                {key}: {value}
              </p>
            );
          })}
        </Typography>
        <Divider></Divider>
        <Changelog />
      </Stack>
    </Stack>
  );
}
