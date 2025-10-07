import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextLayout from "./pages/AuthContextLayout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthContextLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
