// src/redux/actions.js
import axios from "axios";

export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/api/users", user);
    dispatch({
      type: ADD_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

export const deleteUser = (index) => ({
  type: DELETE_USER,
  payload: index,
});

export const editUser = (index, user) => ({
  type: EDIT_USER,
  payload: { index, user },
});
