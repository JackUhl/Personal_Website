import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};