import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AuthenticationService } from "../services/AuthenticationService";

export const AuthenticationContext = createContext<boolean>(false);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const serviceCall = useMemo(() => AuthenticationService.GetAuthenticationStatus(), []);
    const fetch = useFetch(serviceCall);
    
    useEffect(() => {
        if(fetch.response?.admin) {
            setIsAdmin(true);
        }
    }, [fetch.response])

    return (
        <AuthenticationContext.Provider value={isAdmin}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};