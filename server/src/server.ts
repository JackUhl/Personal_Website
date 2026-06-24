import express from 'express';
import path from 'path';
import passport from 'passport';
import {
    apiRoute,
    authStatusRoute,
    blogIdParam,
    blogRoute,
    authCallbackRoute,
    authLoginRoute,
    resumeRoute,
    authLogoutRoute,
    uploadRoute,
} from './models/constants/RouteConstants';
import 'dotenv/config'
import { AuthenticationCallback, AuthenticationLogout, GetAuthenticationStatus } from './controllers/AuthenticationController';
import session from 'express-session';
import { AuthenticationDatabase, BlogDatabase, ResumeDatabase, SessionsCollection } from './models/constants/MongoConstants';
import { EnsureAuthenticated } from './middleware/AuthenticationMiddleware/AuthenticationMiddleware';
import multer from 'multer';
import { CreateGoogleStrategy } from './utilities/factories/GoogleStrategyFactory/GoogleStrategyFactory';
import { CreateMongoSessionStore } from './utilities/factories/MongoSessionStoreFactory/MongoSessionStoreFactory';
import { CreateS3Client } from './utilities/factories/S3ClientFactory/S3ClientFactory';
import { CreateMongooseClient } from './utilities/factories/MongooseClientFactory/MongooseClientFactory';
import { CreateS3Service } from './services/S3Service';
import { CreateUploadHandler } from './handlers/UploadHandler';
import { CreateUploadController } from './controllers/UploadController';
import { CreateBlogRepository } from './repositories/BlogRepository';
import { CreateResumeRepository } from './repositories/ResumeRepository';
import { CreateBlogHandler } from './handlers/BlogHandler';
import { CreateResumeHandler } from './handlers/ResumeHandler';
import { CreateBlogController } from './controllers/BlogController';
import { CreateResumeController } from './controllers/ResumeController';

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

// Enable trust proxy for secure cookies
app.set('trust proxy', 1);

// Add middleware
app.use(express.json({ limit: "500kb" }));
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: "lax",
        maxAge: 3600000
    },
    store: CreateMongoSessionStore(AuthenticationDatabase, SessionsCollection)
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((id, done) => {
    done(null, id);
});
passport.deserializeUser((id, done) => {
    done(null, id as string);
});

passport.use(CreateGoogleStrategy());

// Add client static files
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
const clientDistFile = "index.html";
app.use(express.static(clientDistPath));

const InitializeServer = async () => {
    // Declared services for manual dependency injection
    // Clients
    const s3Client = CreateS3Client();
    const resumeClient = await CreateMongooseClient(ResumeDatabase);
    const blogClient = await CreateMongooseClient(BlogDatabase);

    // Repositories (internal data)
    const resumeRepository = CreateResumeRepository(resumeClient);
    const blogRepository = CreateBlogRepository(blogClient);

    // Services (external data)
    const s3Service = CreateS3Service(s3Client);

    // Handlers
    const resumeHandler = CreateResumeHandler(resumeRepository);
    const blogHandler = CreateBlogHandler(blogRepository);
    const uploadHandler = CreateUploadHandler({
        RetrieveFile: s3Service.RetrieveFile,
        UploadFile: s3Service.UploadFile,
    });

    // Controllers
    const resumeController = CreateResumeController(resumeHandler);
    const blogController = CreateBlogController(blogHandler);
    const uploadController = CreateUploadController(uploadHandler);

    // API paths
    // Authentication
    app.get(path.posix.join(apiRoute, authLoginRoute), passport.authenticate('google', { scope: ['openid'] }));
    app.get(path.posix.join(apiRoute, authCallbackRoute), passport.authenticate('google', { failureRedirect: '/' }), AuthenticationCallback);
    app.get(path.posix.join(apiRoute, authStatusRoute), GetAuthenticationStatus);
    app.get(path.posix.join(apiRoute, authLogoutRoute), AuthenticationLogout);

    // Resume
    app.get(path.posix.join(apiRoute, resumeRoute), resumeController.GetResume);
    app.put(path.posix.join(apiRoute, resumeRoute), EnsureAuthenticated, resumeController.PutResume)

    // Blog
    app.get(path.posix.join(apiRoute, blogRoute), blogController.GetAllBlogs);
    app.get(path.posix.join(apiRoute, blogRoute, blogIdParam), blogController.GetSpecificBlog);
    app.post(path.posix.join(apiRoute, blogRoute), EnsureAuthenticated, blogController.PostBlog);
    app.put(path.posix.join(apiRoute, blogRoute, blogIdParam), EnsureAuthenticated, blogController.PutBlog);
    app.delete(path.posix.join(apiRoute, blogRoute, blogIdParam), EnsureAuthenticated, blogController.DeleteBlog);

    // Upload
    app.get(path.posix.join(apiRoute, uploadRoute, '*'), uploadController.GetFile);
    app.post(path.posix.join(apiRoute, uploadRoute), EnsureAuthenticated, upload.single('file'), uploadController.PostFile);

    // Serve static client
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDistPath, clientDistFile));
    });

    // Start app
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
};

void InitializeServer().catch((error) => {
    console.error("Failed to initialize server", error);
    process.exit(1);
});