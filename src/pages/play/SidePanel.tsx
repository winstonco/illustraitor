import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLobby } from '../../hooks/useLobby';
import { usePlayerName } from '../../App';

export default function SidePanel({
  playerNames,
  imposterNames,
  currentPlayerName,
  handleStartGame,
  handleCreateLobby,
  handleLeaveLobby,
}: {
  playerNames: string[];
  imposterNames: string[];
  currentPlayerName: string;
  handleStartGame: React.MouseEventHandler<HTMLButtonElement>;
  handleCreateLobby: React.MouseEventHandler<HTMLButtonElement>;
  handleLeaveLobby: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { lobbyName } = useLobby();
  const [playerName, setPlayerName] = usePlayerName();

  const handleCopyLink = () => {
    let inviteLink = `${window.location.protocol}//${window.location.hostname}`;
    if (window.location.hostname === 'localhost')
      inviteLink += `:${window.location.port}`;
    inviteLink += `/join/${lobbyName}`;
    console.log(inviteLink);
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <div className="side-panel">
      <div className="side-panel-content">
        <p>Lobby Code:</p>
        <p id="lobby-code">{lobbyName}</p>
        <Button onClick={handleCopyLink}>
          <ContentCopyIcon /> Copy Invite Link
        </Button>
        <hr />
        <p>Players in Lobby:</p>
        <ul>
          {playerNames?.map((name) => {
            return (
              <li
                id={name === playerName ? 'your-name' : ''}
                className={imposterNames.includes(name) ? 'imposter' : ''}
                key={name}
              >
                {name} {name === playerName ? '(you)' : ''}
                {currentPlayerName === name ? (
                  <img src="/paintbrush-20.svg" alt="current player icon" />
                ) : (
                  ''
                )}
              </li>
            );
          })}
        </ul>
        <br />
        <button
          className="lobby-button top-button"
          onClick={handleStartGame}
          aria-label="start button"
        >
          Start
        </button>
        <button
          className="lobby-button"
          onClick={handleCreateLobby}
          aria-label="create lobby button"
        >
          Create New Lobby
        </button>
        <button
          className="lobby-button bottom-button"
          onClick={handleLeaveLobby}
          aria-label="leave lobby button"
        >
          Leave Lobby
        </button>
      </div>
    </div>
  );
}
