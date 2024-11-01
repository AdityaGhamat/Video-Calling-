import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SocketContextProvider from "./context/socketcontext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </BrowserRouter>
);
