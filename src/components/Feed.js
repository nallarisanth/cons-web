// components/Feed.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase-config";
import { signOut } from "firebase/auth";

function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "problems"));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Reported Problems</h2>
        <button onClick={handleLogout} style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <Link to="/report">
        <button style={{ margin: "20px 0", padding: "8px 16px" }}>Report a Problem</button>
      </Link>

      {posts.map(post => (
        <div key={post.id} className="post-card" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", marginBottom: "15px" }}>
          {post.imageURL && <img src={post.imageURL} alt="Problem" style={{ maxWidth: "100%", borderRadius: "6px" }} />}
          <p>{post.description}</p>
          <small>{post.location}</small>
        </div>
      ))}
    </div>
  );
}

export default Feed;
