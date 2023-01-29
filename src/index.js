import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';

const dotenvPath = path.resolve(
  process.cwd(),
  process.env.NODE_ENV ? '.env' : '.env.development'
);

dotenv.config({
  path: dotenvPath,
});

const PORT = process.env.PORT;

const app = express();

app.use(express.static('dist'));

// https://ui.dev/react-router-cannot-get-url-refresh
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(process.cwd(), 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, '0.0.0.0', 10000, () => {
  console.log(`listening on port ${PORT}`);
});
