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

export const validateUserBodyForm = (errors, weight, height, age, gender) => {
  const newErrors = { ...errors };

  newErrors.weight =
    weight && weight <= 0 && "Weight cannot be empty or less than 0";
  newErrors.height =
    height && height <= 0 && "Height cannot be empty or less than 0";
  newErrors.age = age && age <= 0 && "Age cannot be empty or less than 0";
  newErrors.gender = !gender && "Gender cannot be empty";
  return newErrors;
};
