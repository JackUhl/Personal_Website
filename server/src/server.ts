import express from 'express';
import path from 'path';
import { apiRoute, blogIdParam, blogRoute } from './routes';
import { blogItems } from './constants/BlogItems';

const app = express();
const port = 5173;
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html"

app.use(express.static(clientDistPath));

app.get(apiRoute, (req, res) => {
  res.json("Test");
});

//Endpoint to get all blog listings (does not include content data)
app.get(path.posix.join(apiRoute, blogRoute), (req, res) => {
  const strippedBlogItems = blogItems.map((blogItem) => {
    const { content, ...rest } = blogItem;
    return rest;
  });

  res.json(strippedBlogItems);
});

//Endpoint to get a specific blog listing (includes content)
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), (req, res) => {
  const blogId = parseInt(req.params.blogId);
  const blogItem = blogItems.find(item => item.id === blogId);

  if (blogItem) {
    res.json(blogItem);
  } else {
    res.status(404);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port} \n Client dist: ${clientDistPath} \n Client file: ${clientDistFile}`);
});