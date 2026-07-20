import axios from "axios";

const API_BASE_URL = "http://localhost:8080/farmverse/farms";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const addFarm = async (farmData) => {
  const response = await axios.post(
    `${API_BASE_URL}/addFarm`,
    farmData,
    getAuthHeader()
  );
  return response.data;
};

export const getAllFarms = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/viewAllFarms`,
    getAuthHeader()
  );
  return response.data;
};

export const getFarmById = async (id) => {
  const response = await axios.get(
    `${API_BASE_URL}/viewFarm/${id}`,
    getAuthHeader()
  );
  return response.data;
};

export const updateFarm = async (id, farmData) => {
  const response = await axios.put(
    `${API_BASE_URL}/editFarm/${id}`,
    farmData,
    getAuthHeader()
  );
  return response.data;
};

export const deleteFarm = async (id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/deleteFarm/${id}`,
    getAuthHeader()
  );
  return response.data;
};