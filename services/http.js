const BASE_URL = "http://localhost:8080";

async function request(url, options, body = {}) {
  let fetchOptions = options;

  if (options.method !== "GET" && options.method !== "DELETE") {
    fetchOptions = {
      ...fetchOptions,
      body,
    };
  }

  return fetch(url, fetchOptions)
    .then((response) => {
      if (response.status !== 204) {
        return response.json();
      }
      return {};
    })
    .then((response) => {
      if (response.ok || !response.error) {
        return response;
      }
      const error = new Error(response.statusText);
      error.data = response;
      throw error;
    });
}

function httpClient(baseUrl = BASE_URL) {
  return {
    get: (path, options = {}) =>
      request(`${baseUrl}/${path}`, {
        method: "GET",
        ...options,
      }),
    post: (path, body, options = {}) =>
      request(
        `${baseUrl}/${path}`,
        {
          method: "POST",
          ...options,
        },
        body
      ),
    put: (path, body, options = {}) =>
      request(
        `${baseUrl}/${path}`,
        {
          method: "PUT",
          ...options,
        },
        body
      ),
    delete: (path, options = {}) =>
      request(`${baseUrl}/${path}`, {
        method: "DELETE",
        ...options,
      }),
  };
}

export default httpClient;
