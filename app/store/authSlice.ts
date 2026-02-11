import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
};

const initialState: AuthState = {
  username: null,
};

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload.split("@")[0];
    },
  },
});

export const { login} = authSlice.actions;
export default authSlice.reducer;
