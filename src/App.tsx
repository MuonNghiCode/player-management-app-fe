import React from "react";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import router from "./routes";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-left" />
    </AuthProvider>
  );
};

export default App;
