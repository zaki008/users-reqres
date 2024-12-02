import * as Yup from "yup";

export const schemaRegister = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "password is must match")
    .required("confirm password Is a required"),
}).required();

export const schemaLogin = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
}).required();
