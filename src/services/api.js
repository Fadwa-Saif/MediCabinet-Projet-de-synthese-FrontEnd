const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://medicabinet-projet-de-synthese-backend-test-backend-zjf36q.free.laravel.cloud/api";
function getAuthHeaders() {
  const tokenFromStorage = localStorage.getItem("token");
  const medicabinetUser = JSON.parse(
    localStorage.getItem("medicabinet_user") || "{}",
  );
  const legacyUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = tokenFromStorage || medicabinetUser.token || legacyUser.token;

  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const headers = {
    // Skip Content-Type for FormData — browser sets it automatically
    // with the correct multipart boundary
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...getAuthHeaders(),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      data?.message || `Request failed with status ${response.status}`,
    );
    error.response = { status: response.status, data };
    throw error;
  }

  return { data, status: response.status };
}

const api = {
  get: (path, options = {}) => request(path, { method: "GET", ...options }),

  post: (path, body, options = {}) =>
    request(path, {
      method: "POST",
      // Don't stringify FormData — pass it as-is
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),

  patch: (path, body, options = {}) =>
    request(path, {
      method: "PATCH",
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
      ...options,
    }),

  put: (path, body, options = {}) =>
    request(path, {
      method: "PUT",
      body:
        body === undefined
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
      ...options,
    }),

  delete: (path, options = {}) =>
    request(path, { method: "DELETE", ...options }),
};

export default api;
