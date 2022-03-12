import { checkToken } from "../services/login.js";
import { LOCAL_STORAGE } from "./constants.js";
import { getStorageValue, removeStorageKey } from "./local-storage.js";

function logOut() {
  removeStorageKey(LOCAL_STORAGE.FROM_AUTH_FLOW);
  removeStorageKey(LOCAL_STORAGE.AUTH_TOKEN_KEY);
  window.location.assign("../../index.html");
}

function isUserLogged() {
  const authFlow = getStorageValue(LOCAL_STORAGE.FROM_AUTH_FLOW);
  const authToken = getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY);
  if (!authFlow || !authToken) {
    window.location.assign("../../index.html");
  }
  checkToken(authToken).catch(() =>
    window.location.assign("../login/login.html")
  );
}

export { logOut, isUserLogged };
