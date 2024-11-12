import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CounterWidget from "./components/CounterWidget";
import NumbersIcon from "@mui/icons-material/Numbers";
import SpeedIcon from "@mui/icons-material/Speed";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import UserInput from "./components/UserInput"; // Changed from TaskInput to UserInput
import UserList from "./components/UserList";
import { Grid } from "@mui/material";
import "./App.css";
import { DisplayChart } from "./components/DisplayChart";
import { addUser, deleteUser, editUser } from "./redux/actions"; // Import Redux actions

const counterData1 = {
  intensity: {
    number: 12,
    title: "Intensity",
    backgroundcolor: "#009688",
    icon: <SpeedIcon sx={{ fontSize: 45 }} />,
  },
  likelihood: {
    number: 24,
    title: "Likelihood",
    backgroundcolor: "#ec407a",
    icon: <ThumbUpIcon sx={{ fontSize: 45 }} />,
  },
  relevance: {
    number: 92,
    title: "Relevance",
    backgroundcolor: "#9c27b0",
    icon: <BorderColorIcon sx={{ fontSize: 45 }} />,
  },
  counter: {
    number: 5,
    title: "Total",
    backgroundcolor: "#03a9f4",
    icon: <NumbersIcon sx={{ fontSize: 45 }} />,
  },
};

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    // Initial fetch of users could be added here if necessary
  }, [dispatch]);

  const handleAddUser = (user) => {
    dispatch(addUser(user));
  };

  const handleDeleteUser = (index) => {
    dispatch(deleteUser(index));
  };

  const handleEditUser = (index, user) => {
    dispatch(editUser(index, user));
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {/* User Management Section */}
      <Grid item xs={12} md={4} style={{ borderRight: "1px solid #ccc" }}>
        <h1>User Management</h1>
        <UserInput onAddUser={handleAddUser} /> {/* Pass function to UserInput */}
        <UserList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      </Grid>

      {/* Counter Widgets and Chart Section */}
      <Grid item xs={12} md={8} container spacing={2}>
        {/* Counter Widgets */}
        <Grid container item xs={12} spacing={2} justifyContent="space-around">
          {Object.keys(counterData1).map((key, index) => {
            const data = counterData1[key];
            return (
              <Grid item xs={6} sm={3} key={index}>
                <CounterWidget
                  number={data.number}
                  title={data.title}
                  backgroundcolor={data.backgroundcolor}
                >
                  {data.icon}
                </CounterWidget>
              </Grid>
            );
          })}
        </Grid>

        {/* Display Chart */}
        <Grid item xs={12} justifyContent="center" alignItems="center">
          <DisplayChart />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
