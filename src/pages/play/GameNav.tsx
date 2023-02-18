import { Stack } from '@mui/material';

import Timer from './Timer';
import { usePlayerName } from '../../App';
import GameSettings from '../../types/GameSettings';

export default function GameNav({
  role,
  prompt,
  currentPlayerName,
  isPlaying,
  playerNames,
  settings,
}: {
  role: string;
  prompt: string;
  currentPlayerName: string;
  isPlaying: boolean;
  playerNames: string[];
  settings: GameSettings;
}): JSX.Element {
  return (
    <div className="game-nav">
      <Stack alignItems="flex-start">
        {isPlaying ? (
          <h2 className="game-nav-item">Prompt: {prompt}</h2>
        ) : (
          <></>
        )}
        {isPlaying ? (
          <h2 className="game-nav-item">
            Now Drawing: {currentPlayerName}
            <Timer />
          </h2>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
}
