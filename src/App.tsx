import { useState } from 'react';
import { Stack, Container } from '@mui/system';

import Game from './Game';
import GameNav from './GameNav';
import socket from './helpers/socket';

function App() {
  const [role, setRole] = useState<string>('Real');
  const [prompt, setPrompt] = useState<string>('');
  const [lobbyName, setLobbyName] = useState<string>('');

  socket.on('connect', () => setLobbyName(''));

  socket.on('startGame', () => {
    console.log('Game starting now!');

    socket.on('role', (role) => {
      setRole(role === 'real' ? 'Real' : 'Imposter');
      console.log(role);
    });

    socket.on('prompt', (prompt) => {
      setPrompt(prompt);
      console.log(prompt);
    });

    socket.on('startTurn', () => {
      console.log("It's your turn!");
    });

    socket.on('endTurn', () => {
      console.log('Your turn ended!');
    });
  });

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack spacing={1}>
        <div className="App">
          <h1>Sham Illustrator</h1>
          <GameNav
            role={role}
            prompt={prompt}
            lobbyName={lobbyName}
            setLobbyName={setLobbyName}
          />
          <Game />
        </div>
      </Stack>
    </Container>
  );
}

export default App;
