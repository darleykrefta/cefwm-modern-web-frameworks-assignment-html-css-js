import { isUserLogged, logOut } from "../../helpers/auth.js";
import { getAllRestaurants } from "../../services/restaurant.js";

function getRestaurants() {
  getAllRestaurants().then((response) => {
    const tableRestaurants = document.querySelector(".custom-table");
    response.forEach((restaurant) => {
      const emptyRow = tableRestaurants.insertRow(-1);

      const emptyCellName = emptyRow.insertCell(0);
      const nameText = document.createTextNode(restaurant.name);
      emptyCellName.appendChild(nameText);

      const emptyCellFreight = emptyRow.insertCell(1);
      const freightText = document.createTextNode(restaurant.freight);
      emptyCellFreight.appendChild(freightText);

      const emptyCellAction = emptyRow.insertCell(2);
      const actionText = document.createElement("button");
      actionText.style.border = "none";
      actionText.style.backgroundColor = "transparent";
      actionText.style.cursor = "pointer";
      actionText.onclick = () =>
        window.location.assign(`./restaurant-form.html?id=${restaurant.uuid}`);
      actionText.innerHTML =
        '<img src="https://img.icons8.com/material-sharp/16/000000/edit--v1.png"/>';

      emptyCellAction.appendChild(actionText);
    });
  });
}

document.onreadystatechange = function (e) {
  if (document.readyState === "complete") {
    isUserLogged();
  }
};

function initialActions() {
  document.querySelector("#log-out").addEventListener("click", logOut);

  const cancelButton = document.getElementById("btn-create");
  cancelButton.addEventListener("click", () => {
    window.location.assign("./restaurant-form.html");
  });

  getRestaurants();
}

window.addEventListener("load", function () {
  initialActions();
});
