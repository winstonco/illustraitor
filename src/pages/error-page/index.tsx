import { useNavigate } from 'react-router-dom';
import { Tooltip, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function ErrorPage() {
  const [hoverDoor, setHoverDoor] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <Stack
      alignContent={'center'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'90vh'}
    >
      <h1>Hey! ✋</h1>
      <h2>You're not supposed to be here.</h2>
      <Tooltip title={'Leave Now'}>
        <FontAwesomeIcon
          style={{ fontSize: '4rem', cursor: 'pointer' }}
          icon={hoverDoor ? faDoorOpen : faDoorClosed}
          onMouseEnter={() => setHoverDoor(true)}
          onMouseLeave={() => setHoverDoor(false)}
          onClick={() => {
            navigate('/');
          }}
        />
      </Tooltip>
    </Stack>
  );
}
