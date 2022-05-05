import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as api from "../api";

const initialState = {
  user: {
    id: "",
    email: "",
    displayName: "",
  },
  isLoggedIn: false,
};

const getAutoLoginAndUpdate = createAsyncThunk(
  "user/autoLoginUpdate",
  async () => {
    try {
      const { data } = await api.getAutoLogin();

      if (data.isInvalidToken) {
        const { data: newTokenData } = await api.postNewAccessToken();

        if (newTokenData.accessToken) {
          const newToken = newTokenData.accessToken;

          localStorage.setItem("accessToken", newToken);

          const { data: userData } = await api.getAutoLogin();

          if (userData.user) {
            const { _id: id, email, displayName } = userData.user;
            const currentUser = {
              id,
              email,
              displayName,
            };

            return currentUser;
          }
        }
      }

      if (data.user) {
        const { _id: id, email, displayName } = data.user;
        const currentUser = {
          id,
          email,
          displayName,
        };

        return currentUser;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const putLogoutUser = createAsyncThunk("user/logoutUser", async userEmail => {
  try {
    const { data } = await api.putLogout(userEmail);

    if (data.result === "ok") {
      return initialState;
    }
  } catch (error) {
    console.log(error);
  }
});

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
    deleteUser: state => {
      state.user = initialState.user;
      state.isLoggedIn = initialState.isLoggedIn;

      return state;
    },
  },
  extraReducers: {
    [getAutoLoginAndUpdate.fulfilled]: (_, action) => {
      return {
        user: action.payload,
        isLoggedIn: true,
      };
    },
    [putLogoutUser.fulfilled]: (_, action) => {
      return {
        user: action.payload.user,
        isLoggedIn: false,
      };
    },
  },
});

export const userActions = userSlice.actions;
export const selectUser = state => state.user;

export { getAutoLoginAndUpdate, putLogoutUser };

export default userSlice.reducer;
