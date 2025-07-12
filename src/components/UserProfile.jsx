import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/user/profile/${id}`).then(res => {
      setUser(res.data);
    });
  }, [id]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserProfile;
