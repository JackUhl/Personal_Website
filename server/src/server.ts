import express from 'express';
import path from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { apiRoute, authStatusRoute, blogIdParam, blogRoute, googleAuthCallbackRoute, googleAuthRoute, resumeRoute } from './constants/RouteConstants';
import { port } from './constants/ConfigConstants';
import { GetAllBlogs, GetSpecificBlog } from './controllers/BlogController';
import { GetResume } from './controllers/ResumeController';
import 'dotenv/config'
import { SetUser } from './middleware/AuthenticationMiddleware';
import { AuthenticationCallback, GetAuthenticationStatus } from './controllers/AuthenticationController';
import { CacheMiddleware } from './middleware/CacheMiddleware';
import cookieParser from 'cookie-parser';

const app = express();

// Add middleware
app.use(passport.initialize());
app.use(cookieParser());

// Configure Google OAuth strategy to set Google profile ID for req.user
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: path.posix.join(apiRoute, googleAuthCallbackRoute),
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile.id);
}));

// Add client static files
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html";
app.use(express.static(clientDistPath));

// Authentication
app.use(SetUser)
app.get(path.posix.join(apiRoute, googleAuthRoute), passport.authenticate('google', { scope: ['email'], session: false }));
app.get(path.posix.join(apiRoute, googleAuthCallbackRoute), passport.authenticate('google', { session: false }), AuthenticationCallback);
app.get(path.posix.join(apiRoute, authStatusRoute), GetAuthenticationStatus);

//Endpoint to get resume data
app.get(path.posix.join(apiRoute, resumeRoute), CacheMiddleware, GetResume);

//Endpoint to get all blog data (does not include content data)
app.get(path.posix.join(apiRoute, blogRoute), CacheMiddleware,GetAllBlogs);

//Endpoint to get a specific blog data (includes content)
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), CacheMiddleware, GetSpecificBlog);

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});