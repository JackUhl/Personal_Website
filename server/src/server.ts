import express from 'express';
import path from 'path';
import NodeCache from 'node-cache';
import { apiRoute, blogIdParam, blogRoute, resumeRoute } from './routes';
import { blogItems } from './constants/BlogItems';
import { resumeItems } from './constants/ResumeItems';

const app = express();
const port = 5000;
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html"
const cacheTimeout = 600;
const cache = new NodeCache({stdTTL: cacheTimeout});

app.use(express.static(clientDistPath));

app.get(apiRoute, (req, res) => {
  res.json("Api");
});

app.get(path.posix.join(apiRoute, resumeRoute), (req, res) => {
  let cacheKey = req.originalUrl;
  let cachedValue = cache.get(cacheKey);

  if(cachedValue) {
    res.json(cachedValue);
    return;
  }

  cache.set(cacheKey, resumeItems);
  res.json(resumeItems);
})

//Endpoint to get all blog listings (does not include content data)
app.get(path.posix.join(apiRoute, blogRoute), (req, res) => {
  let cacheKey = req.originalUrl;
  let cachedValue = cache.get(cacheKey);

  if(cachedValue) {
    res.json(cachedValue);
    return;
  }

  const strippedBlogItems = blogItems.map((blogItem) => {
    const { content, ...rest } = blogItem;
    return rest;
  });

  cache.set(cacheKey, cachedValue);
  res.json(strippedBlogItems);
});

//Endpoint to get a specific blog listing (includes content)
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), (req, res) => {
  let cacheKey = req.originalUrl;
  let cachedValue = cache.get(cacheKey);

  if(cachedValue) {
    res.json(cachedValue);
    return;
  }
  
  const blogId = parseInt(req.params.blogId);
  const blogItem = blogItems.find(item => item.id === blogId);

  if (blogItem) {
    cache.set(cacheKey, blogItem)
    res.json(blogItem);
  } else {
    res.status(404).send();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port} \n Client dist: ${clientDistPath} \n Client file: ${clientDistFile}`);
});