import { isUserLogged, logOut } from "../../helpers/auth.js";
import {
  fieldValidation,
  formValues,
  populateField,
} from "../../helpers/form.js";
import {
  deleteRestaurant,
  getRestaurantById,
  postRestaurant,
  putRestaurant,
} from "../../services/restaurant.js";

function setIsLoading(isLoading) {
  const button = document.querySelector('button[type="submit"]');

  if (isLoading) {
    button.innerHTML = "Saving...";
    button.setAttribute("disabled", isLoading);
  } else {
    button.innerHTML = "Save";
    button.removeAttribute("disabled");
  }
}

function getRestaurant(id) {
  getRestaurantById(id)
    .then((response) => {
      Object.entries(response).forEach(([key, value]) => {
        populateField(key, value);
      });
    })
    .catch((err) => console.log(err));
}

function hasInvalidFields() {
  let isValid = false;
  if (fieldValidation({ name: "name" })) {
    isValid = true;
  }
  if (fieldValidation({ name: "freight" })) {
    isValid = true;
  }
  return isValid;
}

function changeOrCreate(values) {
  setIsLoading(true);

  if (values.uuid) {
    putRestaurant(values)
      .then(() => {
        window.location.assign("./restaurant.html");
      })
      .catch(() => {
        const helperTextName = document.querySelector(
          `#form-input-helpertext-name`
        );
        helperTextName.innerHTML = "some error occurs, try again";
        helperTextName.focus();
        setIsLoading(false);
      });
    return false;
  }

  postRestaurant(values)
    .then(() => {
      window.location.assign("./restaurant.html");
    })
    .catch(() => {
      const helperTextName = document.querySelector(
        `#form-input-helpertext-name`
      );
      helperTextName.innerHTML = "some error occurs, try again";
      helperTextName.focus();
      setIsLoading(false);
    });
  return false;
}

function onSubmit(event) {
  event.preventDefault();
  if (hasInvalidFields()) {
    return false;
  }
  changeOrCreate(formValues("form"));
}

function onDeleteRestaurant(uuid) {
  deleteRestaurant({ uuid })
    .then(() => {
      window.location.assign("./restaurant.html");
    })
    .catch(() => {
      const helperTextName = document.querySelector(
        `#form-input-helpertext-name`
      );
      helperTextName.innerHTML = "some error occurs, try again";
      helperTextName.focus();
      setIsLoading(false);
    });
}

document.onreadystatechange = function (e) {
  if (document.readyState === "complete") {
    isUserLogged();
  }
};

function initialActions() {
  const cancelButton = document.getElementById("btn-cancel");
  cancelButton.addEventListener("click", () => {
    window.location.assign("./restaurant.html");
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", onSubmit);

  document.querySelector("#log-out").addEventListener("click", logOut);

  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get("id");
  const deleteButton = document.getElementById("btn-delete");
  if (restaurantId) {
    deleteButton.addEventListener("click", () =>
      onDeleteRestaurant(restaurantId)
    );
    getRestaurant(restaurantId);
  }

  if (!restaurantId) {
    const cardHeader = document.getElementById("card-header");
    cardHeader.innerText = "create restaurant";
    var inputUUID = document.getElementById("form-input-uuid");
    inputUUID.closest("div").remove();

    deleteButton.remove();
  }
}

window.addEventListener("load", function () {
  initialActions();
});
