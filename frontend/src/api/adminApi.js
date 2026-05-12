const BASE = "http://127.0.0.1:8000";

export const approveIdea = (id, rating, feedback) =>
  fetch(`${BASE}/approveIdea/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating: Number(rating), feedback }),
  }).then((r) => r.json());

export const rejectIdea = (id, rating, feedback) =>
  fetch(`${BASE}/rejectIdea/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating: Number(rating), feedback }),
  }).then((r) => r.json());

export const approveKaizen = (id) =>
  fetch(`${BASE}/approveKaizen/${id}`, { method: "PUT" }).then((r) => r.json());

export const rejectKaizen = (id) =>
  fetch(`${BASE}/rejectKaizen/${id}`, { method: "PUT" }).then((r) => r.json());