import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLobby } from '../../hooks/useLobby';

export default function SidePanel({ playerNames }: { playerNames: string[] }) {
  const { lobbyName } = useLobby();

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
            return <li key={name}>{name}</li>;
          })}
          {/* <li>Bob</li>
          <li>Joe</li>
          <li>Steve</li> */}
        </ul>
      </div>
    </div>
  );
}
