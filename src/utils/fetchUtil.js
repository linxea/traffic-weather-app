export const fetchApi = async (url, payload = {}) => {
  const response = await fetch(url, payload);
  const responseData = await response.json();
  return responseData;
};

export const get = async (url) => {
  return fetchApi(url);
};

export const post = async (url, payload = {}) => {
  const apiPayload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(payload),
  };
  return fetchApi(url, apiPayload);
};
