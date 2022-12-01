import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { TeeRexProvider } from "./context/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <TeeRexProvider>
        <App />
      </TeeRexProvider>
    </BrowserRouter>
  </StrictMode>
);
