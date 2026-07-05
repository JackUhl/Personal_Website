import { useEffect } from "react";

import { HeartbeatIntervalInMs } from "../../models/constants/ConfigurationConstants";
import { AuthenticationService } from "../../services/AuthenticationService/AuthenticationService";

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
