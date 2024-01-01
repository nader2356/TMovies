
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";


const App = lazy(() => import("./App"));
import theme from "./theme";
import FullPageSpinner from "./components/FullPageSpinner";

const queryClient = new QueryClient();

axios.defaults.baseURL = "/api";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
          <Suspense fallback={<FullPageSpinner />}>
            <App />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);