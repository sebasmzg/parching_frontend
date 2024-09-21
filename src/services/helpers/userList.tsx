"use client";

import React, { useEffect, useState } from "react";
import { ApiService } from "../actions";
import { IUsers } from "../models";

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
  header: {
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  userSelected: {
    marginTop: "20px",
  },
  userInfo: {
    margin: "10px 0",
  },
  form: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#165252",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [updatedUser, setUpdatedUser] = useState<IUser | null>(null);
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

  useEffect(() => {
    const fetchUserById = async () => {
      if (userId) {
        try {
          const userData = await apiService.getUserById(userId);
          console.log("userData", userData);
          setUser(userData);
          setUpdatedUser(userData); // Initialize updatedUser with the fetched user data
        } catch (error) {
          console.error("Error fetching user by ID:", error);
        }
      }
    };

    fetchUserById();
  }, [userId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Crea una copia del estado de updatedUser
    if (updatedUser) {
      const newUser = {
        ...updatedUser,
        [name]: value, // Actualiza la propiedad directamente
        client: {
          ...updatedUser.client,
          [name.split(".")[1]]: value, // Actualiza solo el campo en 'client' si el nombre contiene 'client.'
        },
      };

      setUpdatedUser(newUser);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedUser && userId) {
      try {
        const { name, email, address, birthDate, gender, locationDescription } =
          updatedUser;

        const validUserUpdate = {
          name,
          email,
          address,
          birthDate,
          gender,
          locationDescription, // Agregar si es necesario
        };

        const updatedUserData = await apiService.updateUser(
          userId,
          validUserUpdate
        );
        console.log("User updated successfully", updatedUserData);

        setUser(updatedUserData);
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === updatedUserData.id ? updatedUserData : u
          )
        );
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>List of Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul style={styles.list}>
          {users.map((user) => (
            <li key={user.id} style={styles.listItem}>
              <div style={styles.userInfo}>
                <strong>Name:</strong> {user.name}
              </div>
              <div style={styles.userInfo}>
                <strong>Email:</strong> {user.email}
              </div>
              <div style={styles.userInfo}>
                <strong>Role:</strong> {user.role.name}
              </div>
              <div style={styles.userInfo}>
                <strong>Address:</strong> {user.client?.address}
              </div>
              <div style={styles.userInfo}>
                <strong>Gender:</strong> {user.client?.gender}
              </div>
              <div style={styles.userInfo}>
                <strong>Birthdate:</strong> {user.client?.birthDate}
              </div>
              <button style={styles.button} onClick={() => setUserId(user.id)}>
                Get User By ID
              </button>
            </li>
          ))}
        </ul>
      )}

      {user && (
        <div style={styles.userSelected}>
          <h3 style={styles.header}>Selected User</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role.name}
          </p>
          <p>
            <strong>Id:</strong> {user.id}
          </p>
          <p>
            <strong>Address:</strong> {user.client?.address}
          </p>
          <p>
            <strong>Birthdate:</strong> {user.client?.birthDate}
          </p>
          <p>
            <strong>Gender:</strong> {user.client?.gender}
          </p>
        </div>
      )}

      {updatedUser && (
        <div style={styles.form}>
          <h3 style={styles.header}>Update User Information</h3>
          <form onSubmit={handleSubmit}>

            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name" // Aquí se asegura que sea "name"
                value={updatedUser.name || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email" // Aquí se asegura que sea "email"
                value={updatedUser.email || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="address" style={styles.label}>
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="client.address"
                value={updatedUser.client?.address || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="birthDate" style={styles.label}>
                Birth Date:
              </label>
              <input
                type="date"
                id="birthDate"
                name="client.birthDate"
                value={updatedUser.client?.birthDate || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="gender" style={styles.label}>
                Gender:
              </label>
              <select
                id="gender"
                name="client.gender"
                value={updatedUser.client?.gender || ""}
                onChange={handleInputChange}
                style={styles.input}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="PreferNotToSay">Rather Not Say</option>
              </select>
            </div>
            <button type="submit" style={styles.button}>
              Update User
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
