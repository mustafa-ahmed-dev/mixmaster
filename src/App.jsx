import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import router from "./router";

const staleTime = 1000 * 60 * 5;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router(queryClient)} />

      <ToastContainer />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
