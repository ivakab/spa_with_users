import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserDetails, UsersState } from "./usersTypes";
import { getUserById, getUsers, updateUser } from "src/services/api";

const initialState: UsersState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: string) => {
    const response = await getUserById(id);
    return response.data;
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async ({ id, userData }: { id: number; userData: Partial<UserDetails> }) => {
    const response = await updateUser(`/users/${id}`, userData);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users.";
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load user details.";
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(updateUserById.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to update user details.";
      });
  },
});

export default usersSlice.reducer;
