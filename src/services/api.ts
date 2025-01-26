import axios from "axios";
import { UserDetails } from "src/redux/usersTypes";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getUsers = () => api.get("/users");
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const updateUser = (id: string, userData: Partial<UserDetails>) =>
  api.put(`${id}`, userData);
