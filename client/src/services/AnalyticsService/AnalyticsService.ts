declare global {
  interface Window {
    dataLayer: object[];
  }
}

export function PushEvent(eventName: string) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
    });
}