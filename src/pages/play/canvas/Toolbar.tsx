import { Button } from '@mui/material';
import { Stack } from '@mui/system';

import socket from '../../../helpers/socket';
import PenSize from './PenSize';
import PenColor from './PenColor';
import { useCanvas } from './useCanvas';

export default function Toolbar(props: {
  setPenSize: React.Dispatch<React.SetStateAction<number>>;
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const cd = useCanvas(socket.id);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="outlined"
        onClick={() => {
          cd?.clearCanvas();
          socket.emit('clearCanvas');
        }}
      >
        Clear Canvas
      </Button>
      <PenSize setPenSize={props.setPenSize}></PenSize>
      <PenColor setPenColor={props.setPenColor}></PenColor>
    </Stack>
  );
}
