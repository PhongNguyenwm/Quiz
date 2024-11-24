import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, img) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return axios.post("participant", data);
};

const getListUsers = () => {
  return axios.get("participant/all");
};

const putUpdateUser = (id, username, role, img) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", img);
  return axios.put("participant", data);
};

const deleteUser = (id) => {
  return axios.delete("participant", { data: { id } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post(`login`, { email, password });
};

const postRegister = (email, password, username) => {
  return axios.post(`register`, { email, password, username });
};

export {
  postCreateNewUser,
  getListUsers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
