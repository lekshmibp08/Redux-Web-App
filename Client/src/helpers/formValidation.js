// src/utils/formValidation.js

const usernameRegex = /^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z])[A-Za-z0-9]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email format
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // To detect special characters

// Validation function for all fields
export const validateFormData = (formData) => {
  const errors = {};

  // Validate username
  if (!formData.username) {
    errors.username = 'Username is required';
  } else if (!usernameRegex.test(formData.username)) {
    errors.username = 'Username must contain at least 3 letters and can include numbers.';
  }

  // Validate email
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Validate password
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  } else if (formData.password.split('').every((char) => char === formData.password[0])) {
    errors.password = 'Password should not have all characters the same';
  } else if (specialCharRegex.test(formData.password) && !/[A-Za-z0-9]/.test(formData.password)) {
    errors.password = 'Password should not contain only special characters';
  }

  return errors; // Return the errors object
};
