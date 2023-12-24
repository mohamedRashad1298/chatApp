import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import { extendTheme } from "@chakra-ui/react";
import ChatProvider from "./Context/Context.jsx";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
    <ChatProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
    </ChatProvider>
      </BrowserRouter>
  </React.StrictMode>
);
