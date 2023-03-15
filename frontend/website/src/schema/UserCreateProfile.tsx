import * as Yup from "yup";

export const UserCreateSchema = Yup.object().shape({
  username: Yup.string()
    .required("username required!")
    .test((username) => {
      return true;
    }),
  phoneNumber: Yup.string().required("Phone Number required!"),
  password: Yup.string().required("Password Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password Required!")
    .oneOf([Yup.ref("password"), null], "Password doesn't match"),
});
