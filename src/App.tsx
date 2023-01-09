import { useState } from 'react';
import { Stack, Container } from '@mui/system';

import Game from './Game';
import GameNav from './GameNav';

function App() {
  const [roomy, setRoomy] = useState<boolean>(false);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1}>
        <div className="App">
          <h1>Sham Illustrator</h1>
          <GameNav setRoomy={setRoomy}></GameNav>
          <Game></Game>
        </div>
      </Stack>
    </Container>
  );
}

export default App;
