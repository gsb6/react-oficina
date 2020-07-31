import api from "../services";

export const getAllUsers = async () => {
  try {
    const { data } = await api.get(`/users`);
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

export const updateUser = async (user) => {
  try {
    const { data } = await api.put(`/users`, { user });
    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await api.post(`/users`, { user });
    return data;
  } catch (error) {
    throw error;
  }
};
