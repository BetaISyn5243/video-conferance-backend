import React from "react";
import {Button, Grid, Typography} from "@mui/material";

const Main: React.FC = () => {
  return <Grid container sx={{height: "100vh"}}>
    <Grid item xs={12} md={6} sx={{
      
      backgroundImage: 'url(https://source.unsplash.com/random?wallpapers?collections=2)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      filter: "blur(3px)",
      ":hover": {filter: "blur(0px)"},
      
      backgroundPosition: 'center',
    }}>
      
      <Button href={"/login"} sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center", height: "100%"
      }}>
        <Typography component="h1" variant="h2" fontWeight={"bold"} color={"blue"}>
          
          Sign in
        </Typography>
      </Button>
    </Grid>
    <Grid item xs={12} md={6} sx={{
      
      backgroundImage: 'url(https://source.unsplash.com/random?wallpapers?collections=1)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      filter: "blur(3px)",
      ":hover": {filter: "blur(0px)"},
      backgroundPosition: 'center',
    }}>
      <Button href={"/register"} sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center", height: "100%"
      }}>
        <Typography component="h1" variant="h2" fontWeight={"bold"} color={"blue"}>
          
          Sign up
        </Typography>
      </Button>
    </Grid>
  </Grid>
}
export default Main