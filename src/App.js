import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

import Login from "./components/Login";
import Feed from "./components/Feed";
import ReportForm from "./components/ReportForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This listener persists user login
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/feed");
      } else {
        setUser(null);
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                color: "white",
                textAlign: "center",
              }}
            >
              <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
                Welcome to <span style={{ color: "#38bdf8" }}>Cons.com</span>
              </h1>
              <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                Report issues. Get them solved. Build a better India 🇮🇳
              </p>
              <Login />
            </div>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <ReportForm />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div>
              <h2>404 - Page Not Found</h2>
              <a href="/" style={{ color: "#38bdf8" }}>
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
