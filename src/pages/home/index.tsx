import { Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Changelog from './Changelog';
import { useLobby } from '../../hooks/useLobby';
import SettingsDialog from './SettingsDialog';
import { useSettings } from '../../App';
import { GameSettingsKeys } from '../../types/GameSettings';
import './home.css';

export default function Home() {
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
          className="home-page-button hover-scale wobble"
          aria-label="create lobby button"
          onClick={handleCreateLobby}
        >
          <img
            width="200px"
            src="/create-lobby.svg"
            alt="create lobby button"
            draggable="false"
          />
        </button>
        <button
          className="home-page-button hover-scale wobble-reverse"
          aria-label="join lobby button"
          onClick={handleJoinLobby}
        >
          <img
            width="200px"
            src="/join-lobby.svg"
            alt="join lobby button"
            draggable="false"
          />
        </button>
        <button
          className="home-page-button hover-scale wobble"
          aria-label="settings button"
          onClick={handleClickSettings}
        >
          <img
            width="200px"
            src="/settings.svg"
            alt="settings button"
            draggable="false"
          />
        </button>
        <SettingsDialog
          settingsIsOpen={settingsDialogIsOpen}
          setSettingsIsOpen={setSettingsDialogIsOpen}
          settings={settings}
          setSettings={setSettings}
        />
      </Stack>
      <div>
        <h1>Current lobby settings:</h1>
        <h2>
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
        </h2>
        <Divider />
        <Changelog />
      </div>
    </Stack>
  );
}
