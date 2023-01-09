import CreateIcon from '@mui/icons-material/Create';
import Slider from '@mui/material/Slider';

export default function PenSize(prop: {
  setPenSize: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  return (
    <>
      <CreateIcon />
      <Slider
        defaultValue={5}
        valueLabelDisplay={'auto'}
        step={1}
        min={1}
        max={10}
        sx={{ mb: 1, width: 100 }}
        onChange={(ev, value) => {
          if (typeof value === 'number') prop.setPenSize(value);
        }}
      />
    </>
  );
}
