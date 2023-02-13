import { Tooltip } from '@mui/material';
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

  const randomizeName: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (textField.current)
      textField.current.value = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
      });
  };

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <div>
        <input
          ref={textField}
          type="text"
          alt="name input field"
          placeholder="Enter a name"
          required
        />
        <Tooltip title="Randomize">
          <button
            type="button"
            onClick={randomizeName}
            aria-label="randomize name"
          >
            <img width="75px" src="/dice.svg" alt="randomize name" />
          </button>
        </Tooltip>
      </div>
      <button type="submit" aria-label="play button">
        <img width="200px" src="/play-button.svg" alt="play button" />
      </button>
    </form>
  );
}
