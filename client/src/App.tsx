import { RouterProvider } from "react-router-dom";
import { Router } from "./utilities/router/Router";

export default function App() {
  return (
    <RouterProvider router={Router} />
  )
}