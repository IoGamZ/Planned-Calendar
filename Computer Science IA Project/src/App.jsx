import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home.jsx";
import { Authentication } from "./pages/Authentication.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function WebsiteLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar/>
      <main className="relative z-20">
        <Outlet/>
      </main>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [isDriveConnected, setIsDriveConnected] = useState(false)

  const handleAuthenticated = (profile) => {
    setUser(profile)
    setIsDriveConnected(false)
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <Routes>  
          <Route element={<WebsiteLayout/>}>
            <Route
              path="/"
              element={
                !user ? (
                  <Authentication onAuthenticated={handleAuthenticated} />
                ) : isDriveConnected ? (
                  <Home user={user} />
                ) : (
                  <Authentication
                    user={user}
                    onComplete={() => setIsDriveConnected(true)}
                  />
                )
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}


export default App;
