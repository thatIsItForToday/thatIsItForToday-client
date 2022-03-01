import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    email: "",
    nickname: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const currentUser = action.payload;

      state.user = currentUser;
      state.isLoggedIn = true;

      return state;
    },
    deleteUser: (state, action) => {
      state.user = initialState.user;
      state.isLoggedIn = initialState.isLoggedIn;

      return state;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
