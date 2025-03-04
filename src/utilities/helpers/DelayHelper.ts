export default class DelayHelper {
    public static delay(timeoutMs: number) {
        return new Promise(resolve => setTimeout(resolve, timeoutMs))
    }
}