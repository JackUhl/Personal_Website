import { useEffect, useState } from "react";

const mobileViewThreshold = 600;

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= mobileViewThreshold);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
}