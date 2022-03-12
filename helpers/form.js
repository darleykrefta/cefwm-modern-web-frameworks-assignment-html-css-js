function formValues(formSelector) {
  const form = [...new FormData(document.querySelector(formSelector))].reduce(
    (prev, [key, value]) => {
      if (!prev.hasOwnProperty(key)) {
        return { ...prev, [key]: value };
      }
      return { [key]: value };
    },
    {}
  );
  return form;
}

function fieldValidation({ name }) {
  let isValid = false;
  const textField = document.querySelector(`#form-input-${name}`);
  const helperTextField = document.querySelector(
    `#form-input-helpertext-${name}`
  );
  helperTextField.innerHTML = "";
  if (!textField.value) {
    helperTextField.innerHTML = "Campo obrigatório";
    isValid = true;
  }
  return isValid;
}

function populateField(name, value) {
  const input = document.querySelector(`#form-input-${name}`);
  if (input) {
    input.value = value;
  }
}

export { formValues, fieldValidation, populateField };
