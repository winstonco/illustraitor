import { Stack } from '@mui/system';
import { Popover, Button, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useRef, useState } from 'react';

export default function PenColor(prop: {
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const setColor = (newColor: string): void => {
    setOpen(false);
    prop.setPenColor(newColor);
  };

  return (
    <>
      <Button
        variant="outlined"
        ref={button}
        onClick={() => {
          open ? setOpen(false) : setOpen(true);
        }}
      >
        Select Color
      </Button>
      <Popover
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        anchorEl={button.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack direction={'row'}>
          <IconButton onClick={() => setColor('black')}>
            <CircleIcon sx={{ color: 'black' }} />
          </IconButton>
          <IconButton onClick={() => setColor('red')}>
            <CircleIcon sx={{ color: 'red' }} />
          </IconButton>
          <IconButton onClick={() => setColor('blue')}>
            <CircleIcon sx={{ color: 'blue' }} />
          </IconButton>
          <IconButton onClick={() => setColor('green')}>
            <CircleIcon sx={{ color: 'green' }} />
          </IconButton>
        </Stack>
      </Popover>
    </>
  );
}
