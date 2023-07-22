import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface USER {
  username: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", username: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", username: "" };
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.username = action.payload.username;
    },
  },
});

export const { login, logout, updateUserProfile } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;