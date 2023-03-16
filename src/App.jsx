import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/home";
import ErrorPage from "./errorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
