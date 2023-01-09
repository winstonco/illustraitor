import { useState } from 'react';
import { Stack } from '@mui/system';

import Game from './Game';
import GameNav from './GameNav';

function App() {
  const [roomy, setRoomy] = useState<boolean>(false);

  return (
    <Stack maxWidth="sm" spacing={1}>
      <div className="App">
        <h1>Sham Illustrator</h1>
        <GameNav setRoomy={setRoomy}></GameNav>
        <Game></Game>
      </div>
    </Stack>
  );
}

export default App;
