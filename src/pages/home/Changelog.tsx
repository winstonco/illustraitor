import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import useFetchAndRevalidate from '../../hooks/useFetchAndRevalidate';

type UpdateType = {
  type: 'Added' | 'Changed' | 'Deprecated' | 'Removed' | 'Fixed' | 'Security';
  list: string[];
};

// https://keepachangelog.com/en/1.0.0/
type ChangeType = {
  version: string;
  note?: string;
  updates: UpdateType[];
};

type ChangelogType = {
  meta: {
    about: string;
    tags?: string[];
  };
  versions: ChangeType[];
};

export default function Changelog() {
  const [about, setAbout] = useState<string>('Loading:');
  const [log, setLog] = useState<JSX.Element[]>([
    <div key={0}>
      {/* Loading Changelog */}
      <CircularProgress />
    </div>,
  ]);

  useEffect(() => {
    const changePropToJSX = (prop: UpdateType): JSX.Element => {
      return prop ? (
        <>
          <div
            style={{ margin: '0', marginLeft: '0.5rem' }}
          >{`${prop.type}:`}</div>
          {prop.list.map((listItem) => (
            <Stack direction={'row'} ml="1rem" key={listItem.toString()}>
              <span style={{ marginRight: '0.5rem' }}>-</span>
              <span>{listItem}</span>
            </Stack>
          ))}
        </>
      ) : (
        <></>
      );
    };

    const parseChangelog = async () => {
      useFetchAndRevalidate<ChangelogType>(
        [import.meta.env.VITE_CHANGELOG_URL],
        (changelog) => {
          setAbout(changelog!.meta.about);

          let vToString: JSX.Element[] = [];
          let keys = 0;
          changelog!.versions.forEach((v) => {
            vToString.push(
              <Typography variant="h6" my={0} key={keys++}>
                v {v.version}
              </Typography>
            );
            v.note ? vToString.push(<i key={keys++}>{v.note}</i>) : '';
            v.updates.forEach((update) =>
              vToString.push(<div key={keys++}>{changePropToJSX(update)}</div>)
            );
            vToString.push(<br key={keys++} />);
          });
          setLog(vToString);
        },
        () => {
          console.log('Revalidating changelog...');
        }
      );
    };
    parseChangelog();
  }, []);

  return (
    <>
      <Typography variant="body1" my={'1rem'}>
        {about}
      </Typography>
      <Divider />
      <div
        style={{
          background: '#f2f2f2',
          marginTop: '1rem',
          paddingLeft: '1rem',
        }}
      >
        <Typography variant="h5" marginTop={'1rem'} marginBottom={'0.5rem'}>
          Changelog:
        </Typography>
        <div style={{ fontFamily: 'sans-serif' }}>{log}</div>
      </div>
    </>
  );
}
