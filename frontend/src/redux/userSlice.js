// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  users: [],
  status: 'idle', // 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Fetch users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get("http://localhost:3001/api/users");
  return response.data; // Return users
});

// Add a new user
export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post("http://localhost:3001/api/users", userData);
  return response.data; // Return the newly created user
});

// Delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:3001/api/users/${id}`);
  return id;  // Return id of the deleted user
});

// Update a user
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
  const response = await axios.put(`http://localhost:3001/api/users/${id}`, userData);
  return response.data; // Return updated user data
});

// Create user slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Immediately add new user to the state
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload; // Update user in state
        }
      });
  },
});

export default userSlice.reducer;
