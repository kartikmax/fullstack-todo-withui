import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Snackbar } from "@mui/material";
import { fetchUsers, deleteUser, updateUser } from "../redux/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers()); // Fetch users on component mount
    }
  }, [status, dispatch]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)); // Dispatch delete action
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setCurrentUserId(user._id); // Use the user’s ID for updating
    setOpen(true);
  };

  const handleSave = () => {
    dispatch(updateUser({ id: currentUserId, userData: currentUser })); // Dispatch update action
    setSnackbarOpen(true);
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li style={{ display: "flex", padding: "10px", borderBottom: "1px solid #ccc" }} key={user._id}>
            <div style={{ flex: 1 }}>
              <strong>Name:</strong> {user.name}
              <br />
              <strong>Email:</strong> {user.email}
              <br />
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </div>
            <Button onClick={() => handleEdit(user)}>Edit</Button>
            <Button color="error" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            type="text"
            fullWidth
            value={currentUser.name || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={currentUser.email || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            value={currentUser.dateOfBirth || ""}
            onChange={(e) => setCurrentUser({ ...currentUser, dateOfBirth: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="User updated"
      />
    </div>
  );
};

export default UserList;
