import { useEffect, useState } from "react";
import { LoadingState } from "../models/enums/LoadingState";

export function useFetch<T>(serviceCall: Promise<T>) {
    const [response, setResponse] = useState<T | undefined>(undefined);
    const [loadingState, setLoadingState] = useState(LoadingState.loading);

    useEffect(() => {
        serviceCall.then((response) => {
            setLoadingState(LoadingState.success);
            setResponse(response);
        }).catch(() => {
            setLoadingState(LoadingState.failed);
        })
    }, [serviceCall])

    return {response, loadingState};
}