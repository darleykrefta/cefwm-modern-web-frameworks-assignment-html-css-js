import { LOCAL_STORAGE } from "../../helpers/constants.js";
import { fieldValidation, formValues } from "../../helpers/form.js";
import { setStorageValue } from "../../helpers/local-storage.js";
import { auth } from "../../services/login.js";

function setIsLoading(isLoading) {
  const button = document.querySelector('button[type="submit"]');

  if (isLoading) {
    button.innerHTML = "Entering...";
    button.setAttribute("disabled", isLoading);
  } else {
    button.innerHTML = "Login";
    button.removeAttribute("disabled");
  }
}

function hasInvalidFields() {
  let isValid = false;
  if (fieldValidation({ name: "email" })) {
    isValid = true;
  }
  if (fieldValidation({ name: "password" })) {
    isValid = true;
  }
  return isValid;
}

function onSubmit(event) {
  event.preventDefault();
  if (hasInvalidFields()) {
    return false;
  }
  login(formValues("form"));
}

function login(values) {
  setIsLoading(true);
  auth({
    username: values.email,
    // password: sha1(values.password), TODO: change in API to accept sha1 password
    password: values.password,
  })
    .then((data) => {
      setStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY, data.access_token);
      window.location.assign("../../index.html");
    })
    .catch(() => {
      const helperTextEmail = document.querySelector(
        `#form-input-helpertext-email`
      );
      helperTextEmail.innerHTML = "incorrect e-mail or password";
      helperTextEmail.focus();
    })
    .finally(() => {
      setIsLoading(false);
    });
  return false;
}

window.addEventListener("load", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", onSubmit);
});
