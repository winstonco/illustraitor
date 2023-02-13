import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Stack } from '@mui/material';

import './join.css';

export default function JoinWithCode() {
  const textField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    navigate(`/join/${textField.current?.value}`);
  };

  return (
    <form className="join-form" onSubmit={handleSubmit}>
      <input
        ref={textField}
        type="text"
        alt="lobby code input field"
        placeholder="Enter lobby code"
        required
      />
      <button type="submit" aria-label="submit button">
        <img width="200px" src="/submit-button.svg" alt="submit button" />
      </button>
    </form>
  );
}
