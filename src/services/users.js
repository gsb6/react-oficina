import api from "../services";

export const getAllUsers = async (query) => {
  try {
    const { data } = await api.get(`/users${query || ""}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const { data } = await api.get(`/users/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const { data } = await api.put(`/users/${id}`, { ...user });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data } = await api.delete(`/users/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await api.post(`/users`, { ...user });
    return data;
  } catch (error) {
    throw error;
  }
};
