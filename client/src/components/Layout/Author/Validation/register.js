const register = (values) => {
  const error = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern =
    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

  if (values.email === "") {
    error.email = "Email is Required!";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  }

  if (values.password === "") {
    error.password = "Password is Required!";
  } else if (!password_pattern.test(values.password)) {
    error.password =
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!";
  }

  if (values.confirmPassword === "") {
    error.confirmPassword = "Confirm Password is Required!";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "No duplicate password!";
  }

  return error;
};

const registerRest = (values) => {
  const error = {
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    username: "",
    gender: "",
  };

  if (values.fullName === "") {
    error.fullName = "Full Name is Required!";
  }

  if (values.dateOfBirth === "") {
    error.dateOfBirth = "Date of Birth  is Required!";
  }

  if (values.phoneNumber === "") {
    error.phoneNumber = "Phone Number is Required!";
  }

  if (values.username === "") {
    error.username = "Username is Required!";
  }

  if (values.gender === "") {
    error.gender = "Gender is Required!";
  }

  return error;
};

export { register, registerRest };
