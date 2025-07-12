import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8080/api/user/show');
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/user/delete/${id}`);
    fetchUsers(); // Refresh list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user._id}>
          {user.firstName} {user.lastName} ({user.email})
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;
