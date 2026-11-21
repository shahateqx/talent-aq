import { useUser } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import SessionPage from "./pages/SessionPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // this will get rid of the flickering effect
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(17, 21, 29, 0.96)",
            color: "#e9e6df",
            border: "1px solid rgba(226, 205, 168, 0.18)",
            borderRadius: "14px",
            boxShadow: "0 24px 60px -24px rgba(0,0,0,0.9)",
            backdropFilter: "blur(14px)",
            fontFamily: "DM Sans, sans-serif",
          },
          success: { iconTheme: { primary: "#d8b98a", secondary: "#11151d" } },
          error: { iconTheme: { primary: "#d98e88", secondary: "#11151d" } },
        }}
      />
    </>
  );
}

export default App;