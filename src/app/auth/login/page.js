"use client";
import { postLogin, resetAuthRedux } from "@/redux/slice/authSlice";
import { alertMessage } from "@/utils/alertMessage";
import { schemaLogin } from "@/utils/ValidationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSuccess, isError, isLoading, messageError } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isError && messageError) {
      alertMessage(messageError.error, "error");
    }
    if (isSuccess) {
      router.push("/");
      alertMessage("Login is Successfully", "success");
    }
    dispatch(resetAuthRedux());
  }, [isError, messageError, isSuccess]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Grid>
        <Card
          sx={{
            maxWidth: { xs: 300, sm: 450, md: 550 },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Login
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={schemaLogin}
              onSubmit={(values, { setSubmitting }) => {
                const data = {
                  email: values.email,
                  password: values.password,
                };
                dispatch(postLogin(data));
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,

                /* and other goodies */
              }) => {
                return (
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email ? (
                        <Box sx={{ color: "error.main" }}>
                          <span>{errors.email}</span>
                        </Box>
                      ) : null}
                    </FormControl>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((show) => !show)}
                              onMouseDown={(e) => e.preventDefault()}
                              onMouseUp={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errors.password && touched.password ? (
                        <Box sx={{ color: "error.main" }}>
                          <span>{errors.password}</span>
                        </Box>
                      ) : null}
                    </FormControl>

                    <Button
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      variant="contained"
                      type="submit"
                      disabled={isLoading ? true : false}
                    >
                      {isLoading ? <CircularProgress size={20} /> : "Submit"}
                    </Button>
                  </form>
                );
              }}
            </Formik>
            <Typography fontSize={12}>
              Don't have an account?{" "}
              <Link style={{ color: "#7FA1C3" }} href={"/auth/register"}>
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
