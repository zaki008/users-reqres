"use client";
import { postRegister, resetAuthRedux } from "@/redux/slice/authSlice";
import { alertMessage } from "@/utils/alertMessage";
import { schemaRegister } from "@/utils/ValidationSchema";
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

const Signup = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, isLoading, messageError } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (isError && messageError) {
      alertMessage(messageError.error, "error");
    }
    if (isSuccess) {
      alertMessage("Regsiter is Successfully", "success");
      router.push("/auth/login");
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
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Register
            </Typography>
            <Formik
              initialValues={{ email: "", password: "", confirmPassword: "" }}
              validationSchema={schemaRegister}
              onSubmit={(values, { setSubmitting }) => {
                const data = {
                  email: values.email,
                  password: values.password,
                };
                dispatch(postRegister(data));
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
                  <form onSubmit={handleSubmit}>
                    <TextField
                      id="outlined-basic"
                      label="email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <Box sx={{ color: "error.main" }}>
                        <span>{errors.email}</span>
                      </Box>
                    )}
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
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Cofirm Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showConfirmPass ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowConfirmPass((show) => !show)
                              }
                              onMouseDown={(e) => e.preventDefault()}
                              onMouseUp={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showConfirmPass ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <Box sx={{ color: "error.main" }}>
                          <span>{errors.confirmPassword}</span>
                        </Box>
                      ) : null}
                    </FormControl>
                    <Button
                      sx={{ marginTop: 2, marginBottom: 2 }}
                      variant="contained"
                      type="submit"
                      disabled={isLoading ? true : false}
                      // disabled={isSubmitting}
                      //   disabled={loadSubmit ? true : false}
                    >
                      {isLoading ? <CircularProgress size={20} /> : "Submit"}
                    </Button>
                  </form>
                );
              }}
            </Formik>

            <Typography fontSize={12}>
              Have an account?{" "}
              <Link style={{ color: "#7FA1C3" }} href={"/auth/login"}>
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
