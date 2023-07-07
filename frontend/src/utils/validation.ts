export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePasswordConfirmation = (password: string, passwordConfirmation: string): boolean => {
  return password === passwordConfirmation;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
