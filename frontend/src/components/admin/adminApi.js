const BASE_URL = "http://127.0.0.1:8000";

export const getIdeas = async () => {
  const res = await fetch(`${BASE_URL}/adminIdeas`);
  return res.json();
};

export const getStats = async () => {
  const res = await fetch(`${BASE_URL}/dashboardStats`);
  return res.json();
};

export const approveIdea = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/approveIdea/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const rejectIdea = async (id, payload) => {
  const res = await fetch(`${BASE_URL}/rejectIdea/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const approveKaizen = async (id) => {
  const res = await fetch(`${BASE_URL}/approveKaizen/${id}`, {
    method: "PUT",
  });

  return res.json();
};

export const rejectKaizen = async (id) => {
  const res = await fetch(`${BASE_URL}/rejectKaizen/${id}`, {
    method: "PUT",
  });

  return res.json();
};