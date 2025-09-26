import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
