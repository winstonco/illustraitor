import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export default function Login({
  onNameSubmit,
}: {
  onNameSubmit: (name: string) => void;
}) {
  const [name, setName] = useState<string>('');

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.value);
    setName(ev.target.value);
  };

  const handleSubmit = () => {
    onNameSubmit(name);
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Enter your name"
        variant="outlined"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
}
