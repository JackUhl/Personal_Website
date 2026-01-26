import express from 'express';
import path from 'path';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { apiRoute, authStatusRoute, blogIdParam, blogRoute, googleAuthCallbackRoute, googleAuthRoute, resumeRoute } from './models/constants/RouteConstants';
import { port } from './models/constants/ConfigConstants';
import { GetAllBlogs, GetSpecificBlog } from './controllers/BlogController';
import { GetResume, PutResume } from './controllers/ResumeController';
import 'dotenv/config'
import { AuthenticationCallback, GetAuthenticationStatus } from './controllers/AuthenticationController';
import { CacheMiddleware } from './middleware/CacheMiddleware';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { GetMongoUrl } from './helpers/MongoHelper';
import { AuthenticationDatabase, SessionsCollection } from './models/constants/MongoConstants';
import { EnsureAuthenticated } from './middleware/AuthenticationMiddleware';

const app = express();

// Add middleware
app.use(express.json({ limit: "500kb" }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production" ? true : false,
        sameSite: "strict",
        maxAge: 3600000
    },
    store: MongoStore.create({
        mongoUrl: GetMongoUrl(AuthenticationDatabase),
        collectionName: SessionsCollection,
        ttl: 3600
    })
}))

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
app.get(path.posix.join(apiRoute, googleAuthRoute), passport.authenticate('google', { scope: ['email'], session: false }));
app.get(path.posix.join(apiRoute, googleAuthCallbackRoute), passport.authenticate('google', { session: false }), AuthenticationCallback);
app.get(path.posix.join(apiRoute, authStatusRoute), GetAuthenticationStatus);

// Resume
app.get(path.posix.join(apiRoute, resumeRoute), CacheMiddleware, GetResume);
app.put(path.posix.join(apiRoute, resumeRoute), EnsureAuthenticated, PutResume)

// Blog
app.get(path.posix.join(apiRoute, blogRoute), CacheMiddleware, GetAllBlogs);
app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), CacheMiddleware, GetSpecificBlog);

app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, clientDistFile));
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});