function getStorageValue(key) {
  try {
    const value = window.localStorage.getItem(key);
    return JSON.parse(value);
  } catch (err) {
    return null;
  }
}

function setStorageValue(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function removeStorageKey(key) {
  window.localStorage.removeItem(key);
}

export { getStorageValue, setStorageValue, removeStorageKey };
