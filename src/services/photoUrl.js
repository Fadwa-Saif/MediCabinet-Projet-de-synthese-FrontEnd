const DEFAULT_API_BASE = "http://127.0.0.1:8000/api";

function getBackendBaseUrl() {
  const apiBase = process.env.REACT_APP_API_URL || DEFAULT_API_BASE;
  return apiBase.replace(/\/api\/?$/, "");
}

export function normalizePhotoUrl(photo) {
  if (!photo || typeof photo !== "string") return null;

  let value = photo.trim();
  if (!value) return null;

  const embeddedUrlMatch = value.match(/\/storage\/(https?:\/\/.+)$/i);
  if (embeddedUrlMatch?.[1]) {
    value = embeddedUrlMatch[1];
  }

  if (/^https?:\/\//i.test(value)) {
    return value.replace("/storage/storage/", "/storage/");
  }

  const backendBase = getBackendBaseUrl();
  const cleanedValue = value.replace(/^\/+/, "").replace(/^storage\/storage\//, "storage/");

  if (cleanedValue.startsWith("storage/")) {
    return `${backendBase}/${cleanedValue}`;
  }

  return `${backendBase}/storage/${cleanedValue}`;
}