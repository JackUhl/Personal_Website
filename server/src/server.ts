import express from 'express';
import path from 'path';
import { apiRoute, blogIdParam, blogRoute, resumeRoute } from './constants/RouteConstants';
import { port } from './constants/ConfigConstants';
import { GetAllBlogs, GetSpecificBlog } from './controllers/BlogController';
import { GetResume } from './controllers/ResumeController';
import 'dotenv/config'

const app = express();

const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html";

app.use(express.static(clientDistPath));

//Endpoint to get resume data
app.get(path.posix.join(apiRoute, resumeRoute), GetResume)

//Endpoint to get all blog data (does not include content data)
app.get(path.posix.join(apiRoute, blogRoute), GetAllBlogs);

//Endpoint to get a specific blog data (includes content)
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), GetSpecificBlog);

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port} \n Client dist: ${clientDistPath} \n Client file: ${clientDistFile}`);
});