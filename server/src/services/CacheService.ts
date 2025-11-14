import NodeCache from "node-cache";
import { useCaching } from "../models/constants/ConfigConstants";

const cache = new NodeCache({stdTTL: 600});

export function GetCacheKey(key: string) {
    if(useCaching) {
        return cache.get(key);
    }
}

export function SetCacheKey(key: string, value: any) {
    if(useCaching) {
        cache.set(key, value);
    }
}