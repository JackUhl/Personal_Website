export function encodeSvg (icon: string) {
    return 'data:image/svg+xml;base64,' + btoa(icon);
}

export function encodePdf (pdf:string) {
    const byteCharacters = atob(pdf);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
}