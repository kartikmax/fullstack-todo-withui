import React from "react";
import { Grid, Paper, styled, Typography } from "@mui/material";
// import { textAlign } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme, backgroundcolor }) => ({
  backgroundColor:backgroundcolor,
  padding: theme.spacing(3.3),
  textAlign: "center",
  color: "white",
  width: "inherit",
}));

// colors - #009688 ,#9c27b0 , #ec407a #03a9f4

function CounterWidget({ children, number, title, backgroundcolor }) {
  return (
    <StyledPaper backgroundcolor={backgroundcolor}>
      <Grid container justifyContent="space-between">
        <Grid item xs={8}>
          <Typography textAlign="start" variant="h4">
            {number}
          </Typography>
          <Typography textAlign="start" variant="subtitle1">
            {title}
          </Typography>
        </Grid>
        <Grid container item xs={3} alignItems="center" justifyContent="center">
          {children}
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default CounterWidget;
