import { useState } from 'react';
import { Stack } from '@mui/system';

import './css/app.css';
import Game from './Game';
import GameNav from './GameNav';

function App() {
  const [roomy, setRoomy] = useState<boolean>(false);

  return (
    <div className="App">
      <h1>Sham Illustrator</h1>
      <Stack maxWidth="md" spacing={1}>
        <GameNav setRoomy={setRoomy}></GameNav>
        <Game></Game>
      </Stack>
    </div>
  );
}

export default App;
