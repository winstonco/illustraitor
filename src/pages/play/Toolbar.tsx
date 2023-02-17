import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import socket from '../../helpers/getSocket';
import PenSize from './canvas/PenSize';
import PenColor from './canvas/PenColor';
import CanvasDrawer from '../../helpers/CanvasDrawer';

export default function Toolbar(props: {
  setPenSize: React.Dispatch<React.SetStateAction<number>>;
  color: string;
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <button
        aria-label="clear canvas button"
        onClick={() => {
          CanvasDrawer.clearCanvas();
          socket.emit('clearCanvas');
        }}
      >
        <img
          src="clear-canvas.svg"
          alt="clear canvas button"
          width="100px"
          draggable="false"
        />
      </button>
      <PenSize setPenSize={props.setPenSize}></PenSize>
      <PenColor color={props.color} setPenColor={props.setPenColor}></PenColor>
    </Stack>
  );
}
