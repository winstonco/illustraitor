import { useState } from 'react';
import { Stack } from '@mui/system';

import Canvas from './Canvas';
import Toolbar from './Toolbar';

export default function Game(): JSX.Element {
  const [penSize, setPenSize] = useState(5);
  const [penColor, setPenColor] = useState('black');

  return (
    <div className="game">
      <Stack spacing={1} maxWidth={606}>
        <Canvas penSize={penSize} penColor={penColor}></Canvas>
        <Toolbar setPenSize={setPenSize} setPenColor={setPenColor}></Toolbar>
      </Stack>
    </div>
  );
}
