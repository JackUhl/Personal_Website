import { useEffect } from "react";
import { AuthenticationService } from "../../services/AuthenticationService";
import { HeartbeatIntervalInMs } from "../../models/constants/ConfigurationConstants";

export function useHeartbeat(enabled: boolean) {
    useEffect(() => {
        if (!enabled) {
            return;
        }

        const intervalId = setInterval(() => {
            AuthenticationService.GetAuthenticationStatus().catch(() => {});
        }, HeartbeatIntervalInMs);

        return () => {
            clearInterval(intervalId);
        };
    }, [enabled]);
}
