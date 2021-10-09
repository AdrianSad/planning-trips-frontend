export const validateRegisterForm = (
  errors,
  username,
  email,
  password,
  acceptRules
) => {
  const newErrors = { ...errors };

  newErrors.username = username.length < 5 && "Too short username.";
  newErrors.password = password.length < 5 && "Too short password.";
  newErrors.email = !/^\S+@\S+$/.test(email) && "Invalid email";
  newErrors.acceptRules = acceptRules === null && "Rules not accepted";
  return newErrors;
};
