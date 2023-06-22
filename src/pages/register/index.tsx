import React from "react";
import {Avatar, Box, Button, Container, Grid, Link, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useFormik} from "formik";
import FormikTextField from "../../components/FormikTextField";

const Register: React.FC = () => {
  const formik = useFormik({
    initialValues: {email: "", firstName: "", lastName: "", password: "", passwordAgain: ""},
    onSubmit: console.log
  })
  return (<Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
        <LockOutlined/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            
            <FormikTextField fieldName={"firstName"} formik={formik} type={"text"} label={"First Name"}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormikTextField fieldName={"lastName"} formik={formik} type={"text"} label={"Last Name"}/>
          </Grid>
          <Grid item xs={12}>
            <FormikTextField fieldName={"email"} formik={formik} type={"email"} label={"Email"}/>
          </Grid>
          <Grid item xs={12}>
            <FormikTextField fieldName={"password"} formik={formik} type={"password"} label={"Password"}/>
          </Grid>
          <Grid item xs={12}>
            <FormikTextField fieldName={"passwordAgain"} formik={formik} type={"password"} label={"Password Again"}/>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>)
}
export default Register