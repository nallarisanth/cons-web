// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import ReportForm from "./components/ReportForm";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="App">
      <header style={{ padding: "15px", background: "#f5f5f5" }}>
        <h1>
          Welcome to <span style={{ color: "#38bdf8" }}>Cons.com</span>
        </h1>
        {user ? (
          <>
            <span style={{ marginRight: "20px" }}>
              Hello, {user.displayName || "User"}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </header>

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/feed" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/feed"
          element={user ? <Feed /> : <Navigate to="/login" />}
        />
        <Route
          path="/report"
          element={user ? <ReportForm /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
