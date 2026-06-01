const BASE = "http://127.0.0.1:8000";

export const fetchIdeasApi = () =>
  fetch(`${BASE}/ideas?email=emp@test.com`);

export const fetchStatsApi = () =>
  fetch(`${BASE}/employeeStats?email=emp@test.com`);

export const fetchEmployeeStarsApi = () =>
  fetch(`${BASE}/employeeStars`);

export const addIdeaApi = (payload) =>
  fetch(`${BASE}/addIdea`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const updateIdeaApi = (id, payload) =>
  fetch(`${BASE}/updateIdea/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const forwardIdeaApi = (id) =>
  fetch(`${BASE}/forwardIdea/${id}`, { method: "PUT" });

export const submitKaizenApi = (id, formDataObj) =>
  fetch(`${BASE}/submitKaizen/${id}`, {
    method: "PUT",
    body: formDataObj,
  });

export const forwardKaizenApi = (id) =>
  fetch(`${BASE}/forwardKaizen/${id}`, { method: "PUT" });