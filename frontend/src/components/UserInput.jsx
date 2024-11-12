import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice"; // Assuming you have the correct import path
import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

const UserInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && dateOfBirth) {
      const newUser = { name, email, dateOfBirth };
      dispatch(addUser(newUser)); // Dispatch the action to add a new user
      setName("");
      setEmail("");
      setDateOfBirth(""); // Clear the form
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      mb={2}
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        label="Date of Birth"
        variant="outlined"
        type="date"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </Box>
  );
};

export default UserInput;
