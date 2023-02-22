import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function LoginScreen() {
  const initialValues = { username: "", password: "" };

  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values, actions) => {
    // handle login logic here
    actions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NvChat</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          isValid,
          isSubmitting,
        }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                errors.username && touched.username && styles.inputError,
              ]}
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
            />
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                errors.password && touched.password && styles.inputError,
              ]}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              secureTextEntry={true}
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                isValid && !isSubmitting && styles.buttonEnabled,
              ]}
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 20,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    opacity: 0.5,
  },
  buttonEnabled: {
    opacity: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
