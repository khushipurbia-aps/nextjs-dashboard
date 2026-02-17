import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AuthState = {
  username: string | null;
};

const initialState: AuthState = {
  username: null
};

export const userCookie = createAsyncThunk<{ username: string } | null>(
  "auth/userCookie",
  async () => {
    const cookie = document.cookie
    console.log(cookie)
    const email = cookie.split(";").map((c)=>c.trim()).find((c) => c.startsWith("user="))?.split("=")[1] || null;

    if (!email) return null;
    const username = email.split("@")[0];
    return { username };
  }
)

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    // login: (state, action: PayloadAction<string>) => {
    //   state.username = action.payload.split("@")[0];
    //   localStorage.setItem("username", state.username)
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(userCookie.fulfilled, (state, action) => {
      if (action.payload) {
        state.username = action.payload.username;
      } else {
        state.username = null;
      }
    });
  },
});

// export const { login} = authSlice.actions;
export default authSlice.reducer;
