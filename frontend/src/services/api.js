import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getProperties = () => axios.get(`${API_URL}/properties`);
export const createProperty = (data) =>
  axios.post(`${API_URL}/properties`, data);
export const sendMessage = (data) => axios.post(`${API_URL}/messages`, data);
export const getMessages = (propertyId) =>
  axios.get(`${API_URL}/messages/${propertyId}`);
