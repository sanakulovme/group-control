import axios from 'axios';

const API_URL = 'https://197f-84-54-71-79.ngrok-free.app/api/group';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getGroups = () => axios.get(`${API_URL}`, getAuthHeaders());
export const createGroup = (data) => axios.post(`${API_URL}`, data, getAuthHeaders());
export const updateGroup = (id, data) => axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
export const deleteGroup = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());
