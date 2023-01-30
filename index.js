import express from 'express';
import cors from 'cors';
import path from 'path';
import * as dotenv from 'dotenv';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

const dotenvPath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV === 'production' ? '.env' : '.env.development.local'
);

console.log(process.env.NODE_ENV);

console.log(dotenvPath);

dotenv.config({
  path: dotenvPath,
});

const PORT = process.env.PORT;

const app = express();

app.use(express.static('dist'));

app.use(
  cors({
    origin: '*',
  })
);

// https://ui.dev/react-router-cannot-get-url-refresh
app.get('/changelog', (req, res) => {
  const changelog = yaml.load(fs.readFileSync('./changelog.yaml', 'utf-8'));
  res.status(200).send(changelog);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, '0.0.0.0', 10000, () => {
  console.log(`listening on port ${PORT}`);
});
