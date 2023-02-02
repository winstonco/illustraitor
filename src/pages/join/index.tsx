import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Stack } from '@mui/material';

export default function JoinWithCode() {
  const textField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    navigate(`/join/${textField.current?.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row">
        <TextField
          inputRef={textField}
          id="outlined-basic"
          label="Enter lobby code"
          variant="outlined"
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
