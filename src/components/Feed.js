// src/components/Feed.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "problems"));
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://e0.pxfuel.com/wallpapers/645/334/desktop-wallpaper-minimalist-design-%E2%9D%A4-for-ultra-tv.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Reported Problems</h2>
      <Link to="/report">
        <button
          style={{
            padding: "10px 20px",
            background: "#38bdf8",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Report a Problem
        </button>
      </Link>

      {posts.length === 0 && <p style={{ color: "#fff" }}>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            background: "rgba(0,0,0,0.5)",
            padding: "15px",
            borderRadius: "10px",
            width: "400px",
            marginBottom: "15px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {post.imageURL && (
            <img
              src={post.imageURL}
              alt="Problem"
              style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "10px" }}
            />
          )}
          <p>{post.description}</p>
          <small>{post.location}</small>
        </div>
      ))}
    </div>
  );
}

export default Feed;
