import { useEffect, useState } from "react";
import { LoadingState } from "../models/enums/LoadingState";
import { AxiosResponse } from "axios";

export function useFetch<T>(serviceCall: Promise<AxiosResponse<T, any>>) {
    const [response, setResponse] = useState<T | undefined>(undefined);
    const [loadingState, setLoadingState] = useState(LoadingState.loading);

    useEffect(() => {
        serviceCall.then((response) => {
            setLoadingState(LoadingState.success);
            setResponse(response.data);
        }).catch(() => {
            setLoadingState(LoadingState.failed);
        })
    }, [serviceCall])

    return {response, loadingState};
}