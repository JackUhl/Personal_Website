import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsMobileContext } from "./contexts/IsMobileContext";
import { Router } from "./utilities/router/Router";

const mobileViewThreshold = 600;

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileViewThreshold);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= mobileViewThreshold);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <IsMobileContext.Provider value={isMobile}>
        <RouterProvider router={Router} />
      </IsMobileContext.Provider>
    </>
  )
}