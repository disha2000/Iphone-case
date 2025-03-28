export const checkValidate = (formData) => {
  const errorField = {};
  let isFormValid = true;
  formData.forEach((field) => {
    const { name, value } = field;
    switch (name) {
      case "name":
        if (!isNameValid(value)) {
          errorField.name = `Invalid Name!`;
          isFormValid = false;
        }
        break;
      case "email":
        if (!isEmailValid(value)) {
          errorField.email = "Invalid Email!";
          isFormValid = false;
        }
        break;
      case "password":
        if (!isPasswordValid(value)) {
          errorField.password =
            "Password must be 8+ chars, include 1 uppercase, 1 lowercase, 1 digit & 1 special character.";
          isFormValid = false;
        }

        break;
    }
  });
  return { errorField, isFormValid };
};

const isEmailValid = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const isPasswordValid = (password) =>
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
    password
  );

const isNameValid = (name) => /^[A-Za-z' -]+$/.test(name);
const isTextValid = (name) => /^[A-Za-z0-9' -]+$/.test(name);

const isNumberValid = (number) => /^-?\d+$/.test(number);

export const checkProductInfoValidate = (formData) => {
  let isFormValid = true;
  const errorField = {};
  const keys = Object.keys(formData);
  keys.forEach((key) => {
    const value = formData[key];
    switch (true) {
      case key === "keywords" || key === "name":
        if (!isTextValid(value)) {
          errorField[key] = `Invalid ${key}!`;
          isFormValid = false;
        }
        break;
      case key === "qunatity" || key === "price":
        if (!isNumberValid(value)) {
          errorField[key] = `Invalid ${key}!`;
          isFormValid = false;
        }
        break;

      case key === "image":
        if (!value?.length) {
          errorField[key] = `Add ${key}!`;
          isFormValid = false;
        }
        break;
    }
  });
  return { errorField, isFormValid };
};
