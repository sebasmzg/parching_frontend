"use client";

import React, { useEffect, useState } from "react";
import { ApiService } from "../actions";
import { IUsers } from "../models";

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const apiService = new ApiService();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await apiService.getAllUsers();
        console.log("usersData", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>List of Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role.name}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;