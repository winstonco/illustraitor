import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useRef } from 'react';

import GameSettings from '../../types/GameSettings';

export default function SettingsDialog({
  settingsIsOpen,
  setSettingsIsOpen,
  settings,
  setSettings,
}: {
  settingsIsOpen: boolean;
  setSettingsIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
}) {
  const numRoundsInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setSettingsIsOpen(false);
  };

  const handleChangeDifficulty = (
    e: SelectChangeEvent<'Easy' | 'Medium' | 'Hard'>
  ) => {
    if (
      e.target.value === 'Easy' ||
      e.target.value === 'Medium' ||
      e.target.value === 'Hard'
    ) {
      setSettings({
        ...settings,
        Difficulty: e.target.value,
      });
    }
  };

  return (
    <>
      <Dialog open={settingsIsOpen} onClose={handleClose} maxWidth={'md'}>
        <DialogTitle>Game Settings</DialogTitle>
        <DialogContent>
          <Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Turn Length'}
              alignItems={'center'}
            >
              <p>{'Turn Length'}</p>
              <input
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Turn Length': parseInt(e.target.value),
                  });
                }}
                min={5}
                max={30}
                defaultValue={settings['Turn Length']}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Guess Time'}
              alignItems={'center'}
            >
              <p>{'Guess Time'}</p>
              <input
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Guess Time': parseInt(e.target.value),
                  });
                }}
                min={5}
                max={30}
                defaultValue={settings['Guess Time']}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Imposter Count'}
              alignItems={'center'}
            >
              <p>{'Imposter Count'}</p>
              <input
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Imposter Count': parseInt(e.target.value),
                    'Number of Rounds': numRoundsInputRef.current
                      ? numRoundsInputRef.current.value
                        ? parseInt(numRoundsInputRef.current.value)
                        : parseInt(e.target.value)
                      : parseInt(e.target.value),
                  });
                }}
                min={1}
                max={5}
                defaultValue={settings['Imposter Count']}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Number of Rounds'}
              alignItems={'center'}
            >
              <p>{'Number of Rounds'}</p>
              <input
                ref={numRoundsInputRef}
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Number of Rounds': parseInt(e.target.value),
                  });
                }}
                min={1}
                max={10}
                placeholder={`${settings['Imposter Count']}`}
                defaultValue={settings['Number of Rounds']}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Difficulty'}
              alignItems={'center'}
            >
              <p>{'Difficulty'}</p>
              <Select
                disabled
                value={settings['Difficulty']}
                onChange={handleChangeDifficulty}
              >
                <MenuItem value={'Easy'}>Easy</MenuItem>
                <MenuItem value={'Medium'}>Medium</MenuItem>
                <MenuItem value={'Hard'}>Hard</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <button type="submit" aria-label="save button" onClick={handleClose}>
            <img width="100px" src="/save-button.svg" alt="save button" />
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
