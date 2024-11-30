export const validateForm = (data) => {
  const errors = {};

  if (!data.username.trim()) {
    errors.username = "Username is required";
  } else if (data.username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
