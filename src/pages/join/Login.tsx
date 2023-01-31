import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState, useRef } from 'react';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator';

export default function Login({
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
    </form>
  );
}
