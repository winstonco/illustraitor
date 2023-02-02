import { Button, TextField, Stack } from '@mui/material';
import { useRef } from 'react';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator';

export default function EnterName({
  onNameSubmit,
}: {
  onNameSubmit: (name: string) => void;
}) {
  const textField = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    if (textField.current) {
      onNameSubmit(textField.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row">
        <TextField
          inputRef={textField}
          id="outlined-basic"
          label="Enter your name"
          variant="outlined"
          defaultValue={uniqueNamesGenerator({
            dictionaries: [adjectives, animals],
          })}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
