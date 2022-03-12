import { LOCAL_STORAGE } from "../helpers/constants.js";
import { getStorageValue } from "../helpers/local-storage.js";
import httpClient from "./http.js";

function getAllRestaurants() {
  const client = httpClient();
  return client.get("restaurants", {
    headers: {
      Authorization: `Bearer ${getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY)}`,
    },
  });
}

function getRestaurantById(id) {
  const client = httpClient();
  return client.get(`restaurants/${id}`, {
    headers: {
      Authorization: `Bearer ${getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY)}`,
    },
  });
}

function postRestaurant({ name, freight }) {
  const client = httpClient();
  return client.post(`restaurants`, JSON.stringify({ name, freight }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY)}`,
    },
  });
}

function putRestaurant({ uuid, name, freight }) {
  const client = httpClient();
  return client.put(`restaurants/${uuid}`, JSON.stringify({ name, freight }), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY)}`,
    },
  });
}

function deleteRestaurant({ uuid }) {
  const client = httpClient();
  return client.delete(`restaurants/${uuid}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStorageValue(LOCAL_STORAGE.AUTH_TOKEN_KEY)}`,
    },
  });
}

export {
  getAllRestaurants,
  getRestaurantById,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
};
