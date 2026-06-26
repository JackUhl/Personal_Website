import path from "path";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { apiRoute, authCallbackRoute } from "../../../models/constants/RouteConstants";

export function CreateGoogleStrategy(): GoogleStrategy {
    return new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${process.env.GOOGLE_REDIRECT_URL}${path.posix.join(apiRoute, authCallbackRoute)}`,
    }, (accessToken, refreshToken, profile, done) => {
        if (profile.id !== process.env.GOOGLE_ADMIN_ID) {
            return done(null, false);
        }

        return done(null, profile.id);
    });
}