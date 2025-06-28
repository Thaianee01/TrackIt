import axios from 'axios';

const api = axios.create({
  baseURL: "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit",
});

//-------------------------------------------------------------------------------- Configuração do token
let token = null;

export function setAuthToken(userToken) {
  token = userToken;
  api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
}

//-------------------------------------------------------------------------------- Auth
export function login({ email, password }) {
  return api.post("/auth/login", { email, password });
}

export function cadastro({ name, email, image, password }) {
  return api.post("/auth/sign-up", { name, email, image, password });
}

//-------------------------------------------------------------------------------- Hábitos

// Criar hábito
export function newHabit({ name, days }) {
  return api.post("/habits", { name, days });
}

// Listar hábitos
export function listHabit() {
  return api.get("/habits");
}

// Deletar hábito
export function deleteHabit(id) {
  return api.delete(`/habits/${id}`);
}

//-------------------------------------------------------------------------------- Hábitos do dia
export function listTodayHabits() {
  return api.get("/habits/today");
}

export function markAsDone(id) {
  return api.post(`/habits/${id}/check`);
}

export function unmarkAsDone(id) {
  return api.post(`/habits/${id}/uncheck`);
}

export default api;