import { createContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { AuthenticationService } from "../services/AuthenticationService";

export const AuthenticationContext = createContext<boolean>(false);

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const serviceCall = useMemo(() => AuthenticationService.GetAuthenticationStatus(), []);
    const { response } = useFetch(serviceCall);

    useEffect(() => {
        if (response?.admin) {
            setIsAdmin(true);
        }
    }, [response])

    return (
        <AuthenticationContext.Provider value={isAdmin}>
            {children}
        </AuthenticationContext.Provider>
    );
};