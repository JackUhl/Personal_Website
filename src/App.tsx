import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import { router } from "./utilities/router/webRouter";

export default function App() {
  const windowIsMobileSize = window.innerWidth <= 600;
  const [isMobile, setIsMobile] = useState<boolean>(windowIsMobileSize);

  const handleResize = () => {
    setIsMobile(windowIsMobileSize);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <IsMobileContext.Provider value={isMobile}>
        <RouterProvider router={router} />
      </IsMobileContext.Provider>
    </>
  )
}