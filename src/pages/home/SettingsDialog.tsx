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
              <TextField
                margin={'normal'}
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Turn Length': parseInt(e.target.value),
                  });
                }}
                inputProps={{
                  min: 5,
                  max: 30,
                  defaultValue: settings['Turn Length'],
                }}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Guess Time'}
              alignItems={'center'}
            >
              <p>{'Guess Time'}</p>
              <TextField
                margin={'normal'}
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Guess Time': parseInt(e.target.value),
                  });
                }}
                inputProps={{
                  min: 5,
                  max: 30,
                  defaultValue: settings['Guess Time'],
                }}
              />
            </Stack>
            <Stack
              direction={'row'}
              gap={'1rem'}
              key={'Imposter Count'}
              alignItems={'center'}
            >
              <p>{'Imposter Count'}</p>
              <TextField
                margin={'normal'}
                type={'number'}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    'Number of Rounds': parseInt(e.target.value),
                    'Imposter Count': parseInt(e.target.value),
                  });
                }}
                inputProps={{
                  min: 1,
                  max: 5,
                  defaultValue: settings['Imposter Count'],
                }}
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
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
