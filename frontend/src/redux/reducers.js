// src/redux/reducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    editUser: (state, action) => {
      const { index, user } = action.payload;
      state.users[index] = user;
    },
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
