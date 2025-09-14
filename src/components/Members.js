// src/components/Members.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Members() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Total Members: {users.length}</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: "10px" }}>
            <img
              src={user.photoURL}
              alt={user.name}
              width="40"
              height="40"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
