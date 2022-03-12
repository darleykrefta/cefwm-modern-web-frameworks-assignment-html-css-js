import httpClient from "./http.js";

function auth({ username, password }) {
  const client = httpClient();
  return client.post(
    "oauth/token",
    new URLSearchParams({ username, password, grant_type: "password" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic ZGVsaXZlcnk6NDBiZDAwMTU2MzA4NWZjMzUxNjUzMjllYTFmZjVjNWVjYmRiYmVlZg==",
      },
    }
  );
}

function checkToken(token) {
  const client = httpClient();
  return client.post("oauth/check_token", new URLSearchParams({ token }), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export { auth, checkToken };
