import express from 'express';
import path from 'path';
import { api, blog, resume } from './routes';

const app = express();
const port = 5173;
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html"

app.use(express.static(clientDistPath));

app.get(api, (req, res) => {
  res.json("Test");
});

app.get(path.posix.join(api, resume), (req, res) => {
  res.json("Resume");
});

app.get(path.posix.join(api, blog), (req, res) => {
  res.json("Blog");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port} \n Client dist: ${clientDistPath} \n Client file: ${clientDistFile}`);
});