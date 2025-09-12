import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);
      navigate("/feed"); // redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
