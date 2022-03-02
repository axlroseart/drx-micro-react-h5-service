export const apiClient = async () => {
  const response = await fetch('/test.json');
  const json = await response.json();
  if (response.ok) {
    return json;
  }

  return Promise.reject(json);
};
