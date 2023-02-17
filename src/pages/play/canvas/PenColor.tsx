import { Stack } from '@mui/system';
import { Popover, Button, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useRef, useState } from 'react';

import { PenColors } from '../../../types/PenColorType';

export default function PenColor(props: {
  color: string;
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const setColor = (newColor: string): void => {
    setOpen(false);
    props.setPenColor(newColor);
  };

  const makeColorButtons = () => {
    return PenColors.map((color: PenColors) => {
      return (
        <IconButton
          onClick={() => setColor(color)}
          sx={{ alignItems: 'flex-start' }}
          key={color}
        >
          <CircleIcon
            sx={
              color === props.color
                ? {
                    borderBottom: '2px solid black',
                    color: color,
                  }
                : { color: color }
            }
          />
        </IconButton>
      );
    });
  };

  return (
    <>
      <button
        ref={button}
        aria-label="colors button"
        onClick={() => {
          open ? setOpen(false) : setOpen(true);
        }}
      >
        <img
          src="colors.svg"
          alt="colors button"
          width="150px"
          draggable="false"
        />
      </button>
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
        <Stack direction={'row'}>{makeColorButtons()}</Stack>
      </Popover>
    </>
  );
}
