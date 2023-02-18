import { useEffect, useState } from 'react';

import Game from './Game';
import GameNav from './GameNav';
import socket from '../../helpers/getSocket';
import { usePrompt, useRole, useSettings } from '../../App';
import { useLobby } from '../../hooks/useLobby';
import Dialogs from './dialogs/Dialogs';
import './play.css';
import SidePanel from './SidePanel';
import { Alert, Snackbar } from '@mui/material';

export const canvasWidth = 600;

export default function Play() {
  const [role, setRole] = useRole();
  const [prompt, setPrompt] = usePrompt();
  const [settings, setSettings] = useSettings();
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [imposterNames, setImposterNames] = useState<string[]>([]);
  const { lobbyName, createLobby, leaveLobby } = useLobby();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on('playersInLobby', (newPlayerNames) => {
      setPlayerNames(newPlayerNames);
    });

    socket.on('readyCheck', (callback) => {
      callback(new Error(), { response: 'ok' });
    });

    socket.on('startGame', () => {
      console.log('Game starting now!');
      setIsPlaying(true);

      socket.on('role', (role) => {
        setRole(role === 'real' ? 'Real' : 'Imposter');
      });

      socket.on('imposterList', (imposterList) => {
        setImposterNames(imposterList);
      });

      socket.on('prompt', setPrompt);

      socket.on('startTurnAll', setCurrentPlayerName);

      socket.on('startTurn', () => {
        console.log("It's your turn!");
      });

      socket.on('endTurn', () => {
        console.log('Your turn ended!');
      });
    });

    socket.on('endGame', () => {
      console.log('Game ending!');
      setIsPlaying(false);
      // setPlayerNames([]);
      setCurrentPlayerName('');
      setRole('');
      setPrompt('');
    });

    return () => {
      socket.removeAllListeners('startGame');
      socket.removeAllListeners('role');
      socket.removeAllListeners('prompt');
      socket.removeAllListeners('startTurnAll');
      socket.removeAllListeners('startTurn');
      socket.removeAllListeners('endTurn');
      socket.removeAllListeners('readyCheck');
      socket.removeAllListeners('endGame');
    };
  }, []);

  // redirect on mount if no code / bad code
  useEffect(() => {
    if (!lobbyName) {
      // window.alert('Invalid lobby');
      leaveLobby();
    } else {
      socket.emit('loaded', lobbyName);
    }
  }, []);

  const handleStartGame = () => {
    if (lobbyName !== '') {
      socket.emit('startGame', lobbyName, (res) => {
        if (!res) {
          setSnackbarOpen(true);
        }
      });
    }
  };

  const handleCreateLobby = () => {
    createLobby(settings);
  };

  const handleLeaveLobby = () => {
    leaveLobby();
  };

  const handleCloseAlert = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ width: canvasWidth }}>
      <GameNav
        role={role}
        prompt={prompt}
        currentPlayerName={currentPlayerName}
        isPlaying={isPlaying}
        playerNames={playerNames}
        settings={settings}
      />
      <Game />
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleCloseAlert}>
          Not enough players!
        </Alert>
      </Snackbar>
      <Dialogs playerNames={playerNames} />
      <SidePanel
        playerNames={playerNames}
        imposterNames={imposterNames}
        currentPlayerName={currentPlayerName}
        handleStartGame={handleStartGame}
        handleCreateLobby={handleCreateLobby}
        handleLeaveLobby={handleLeaveLobby}
      />
    </div>
  );
}
