import { getStorageValue, setStorageValue } from "./helpers/local-storage.js";
import { LOCAL_STORAGE } from "./helpers/constants.js";
import { checkToken } from "./services/login.js";

function isUserLogged() {
  const authToken = getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY);
  checkToken(authToken)
    .then(() => {
      setStorageValue(LOCAL_STORAGE.FROM_AUTH_FLOW, true);
      window.location.assign("./pages/restaurant/restaurant.html");
    })
    .catch(() => window.location.assign("./pages/login/login.html"));
}

window.addEventListener("load", function () {
  isUserLogged();
});
