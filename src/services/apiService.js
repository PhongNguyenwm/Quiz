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

export { postCreateNewUser, getListUsers };
