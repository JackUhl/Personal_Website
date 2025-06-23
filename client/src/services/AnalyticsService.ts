declare global {
  interface Window {
    dataLayer: any[];
  }
}

export function PushEvent(eventName: string) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
    });
}