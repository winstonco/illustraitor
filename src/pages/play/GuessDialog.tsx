import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import socket from '../../helpers/getSocket';

export default function GuessDialog({
  playerNames,
}: {
  playerNames: string[];
}) {
  const [guessDialogOpen, setGuessDialogOpen] = useState<boolean>(false);
  const [radioValue, setRadioValue] = useState<string>('');
  const resolver = useRef((value: string) => {});

  useEffect(() => {
    socket.on('guessImposter', async (guessTime, callback) => {
      setGuessDialogOpen(true);
      const guess = await new Promise<string>((res) => {
        setTimeout(() => {
          setGuessDialogOpen(false);
          res('none');
        }, guessTime * 1000);

        resolver.current = (value: string) => {
          res(value);
        };
      });
      callback(null, { guess: guess });
    });

    return () => {
      socket.removeAllListeners('guessImposter');
    };
  }, [resolver]);

  const handleSubmitGuess = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      setGuessDialogOpen(false);
      resolver.current(radioValue);
    },
    [resolver, radioValue]
  );

  const handleChangeGuess = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(ev.target.value);
  };

  return (
    <Container>
      <Dialog open={guessDialogOpen}>
        <DialogTitle>Who is the imposter?</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitGuess}>
            <FormControl>
              <RadioGroup
                row={true}
                value={radioValue}
                onChange={handleChangeGuess}
              >
                {/* <DialogContentText>Title</DialogContentText> */}
                {playerNames.map((name) => (
                  <FormControlLabel
                    control={<Radio />}
                    value={name}
                    label={name}
                    labelPlacement="top"
                    key={name}
                  />
                ))}
              </RadioGroup>
              <Button type="submit">Submit Guess</Button>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
