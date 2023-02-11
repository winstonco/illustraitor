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
          variant={hoverSettings ? 'contained' : 'outlined'}
          onMouseEnter={() => setHoverSettings(true)}
          onMouseLeave={() => setHoverSettings(false)}
          onClick={handleClickSettings}
        >
          <SettingsIcon />
          Settings
        </Button>
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
