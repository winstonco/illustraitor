import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

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
  const [log, setLog] = useState<JSX.Element[]>([<p key={0}>Loading</p>]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const changePropToJSX = (prop: UpdateType): JSX.Element => {
      return prop ? (
        <div style={{ marginLeft: '1rem' }}>
          <br />
          {prop.list.reduce(
            (p, c) => (
              <>
                {p}
                <br />
                {`- ${c}`}
              </>
            ),
            <>{`${prop.type}:`}</>
          )}
        </div>
      ) : (
        <></>
      );
    };

    const fetchChangelog = () => {
      return new Promise<ChangelogType>(async (res, rej) => {
        try {
          console.log('Fetching changelog');
          const changelog = await (
            await fetch(import.meta.env.VITE_CHANGELOG_URL)
          ).json();
          setLoading(false);
          res(changelog);
        } catch (error) {
          setTimeout(async () => {
            fetchChangelog();
          }, 5000);
        }
      });
    };

    const parseChangelog = async () => {
      const changelog = await fetchChangelog();
      setAbout(changelog!.meta.about);

      let vToString: JSX.Element[] = [];
      let keys = 0;
      changelog!.versions.forEach((v) => {
        vToString.push(<div key={keys++}>Version: {v.version}</div>);
        v.note ? vToString.push(<i key={keys++}>{v.note}</i>) : '';
        v.updates.forEach((update) =>
          vToString.push(<div key={keys++}>{changePropToJSX(update)}</div>)
        );
        vToString.push(
          <div key={keys++}>
            <br />
            <br />
          </div>
        );
      });

      setLog(vToString);
    };
    parseChangelog();
  }, [loading]);

  return (
    <>
      <Typography variant="body1" my={'1rem'}>
        {about}
      </Typography>
      <Typography variant="h5" marginTop={'1rem'} marginBottom={'0.5rem'}>
        Changelog:
      </Typography>
      <div style={{ fontFamily: 'sans-serif' }}>{log}</div>
    </>
  );
}
