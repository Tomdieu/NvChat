import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    username: Yup.string().min(6,"username must be atleast 6 characters").required("username required"),
    email: Yup.string().email().required("email required"),
    country: Yup.string().required("Country required"),
    phoneNumber:  Yup.string().required("Phone number required"),
    password:  Yup.string().required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'),null],"password don't match").required('Confirm password required'),
}) 

export default registerSchema