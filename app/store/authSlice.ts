import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
};

const initialState: AuthState = {
  username:
    typeof window !== "undefined"
      ? localStorage.getItem("username")
      : null
};

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload.split("@")[0];
      localStorage.setItem("username", state.username)
    },
  },
});

export const { login} = authSlice.actions;
export default authSlice.reducer;
