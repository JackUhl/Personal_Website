import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { apiRoute, blogIdParam, blogRoute, googleAuthCallbackRoute, googleAuthRoute, resumeRoute } from './constants/RouteConstants';
import { port } from './constants/ConfigConstants';
import { GetAllBlogs, GetSpecificBlog } from './controllers/BlogController';
import { GetResume } from './controllers/ResumeController';
import 'dotenv/config'
import { ensureAuthenticated } from './middleware/AuthenticationMiddleware';
import { GetGoogleAuth, GetGoogleAuthCallback } from './controllers/AuthenticationController';

const app = express();

// Add session and passport middleware
app.use(session({
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: path.posix.join(apiRoute, googleAuthCallbackRoute),
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile.id);
}));

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  if(id == process.env.GOOGLE_AUTHORIZED_ID) {
    done(null, { id });
  } else {
    done(new Error('Unauthorized'), null);
  }
});

// Add client static files
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html";
app.use(express.static(clientDistPath));

// Google OAuth routes
app.get(path.posix.join(apiRoute, googleAuthRoute), GetGoogleAuth);

app.get(path.posix.join(apiRoute, googleAuthCallbackRoute), GetGoogleAuthCallback);

//Endpoint to get resume data
app.get(path.posix.join(apiRoute, resumeRoute), GetResume)

//Endpoint to get all blog data (does not include content data)
app.get(path.posix.join(apiRoute, blogRoute), GetAllBlogs);

//Endpoint to get a specific blog data (includes content)
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), GetSpecificBlog);

//Test endpoint to verify authentication is working
app.get(path.posix.join(apiRoute, "test"), ensureAuthenticated, (req, res) => {
  res.json({ message: "test" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});