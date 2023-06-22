import React from "react";
import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Link, Paper, Typography} from "@mui/material";
import {LockOutlined as LockOutlinedIcon} from "@mui/icons-material";
import FormikTextField from "../../components/FormikTextField";
import {useFormik} from "formik";

const Login: React.FC = () => {
  const formik = useFormik({
    initialValues: {email: "", password: "", rememberMe: ""}, onSubmit: (e) => console.log(e)
  })
  return (<Grid container component="main" sx={{height: '100vh'}}> <Grid
    item
    xs={false}
    sm={4}
    md={7}
    sx={{
      backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 1}}>
          <FormikTextField
            formik={formik}
            label={"Email"}
            type={"email"}
            fieldName={"email"}
          />
          <FormikTextField
            formik={formik}
            label={"Password"}
            type={"password"}
            fieldName={"password"}
          />
          <FormControlLabel
            control={<Checkbox value="remember" name={"rememberMe"} onChange={formik.handleChange}
                               onBlur={formik.handleBlur} color="primary"/>}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid> </Grid>)
}
export default Login