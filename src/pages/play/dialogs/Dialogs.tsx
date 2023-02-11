import GameEndDialog from './GameEndDialog.js';
import GuessDialog from './GuessDialog.js';
import VoteEndDialog from './VoteEndDialog.js';

export default function Dialogs({ playerNames }: { playerNames: string[] }) {
  return (
    <>
      <GameEndDialog />
      <GuessDialog playerNames={playerNames} />
      <VoteEndDialog />
    </>
  );
}
