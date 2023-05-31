import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userobj: null,
  loading: false,
  registered: false,
  submited: false,
  verified: false,
  rejected: false,
  response: null,
  verifydone: false,
};

export const login = createAsyncThunk(
  "token",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({ email, password });

    try {
      const res = await fetch("/auth/token/", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/auth/users/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk(
  "users/register",
  async ({ username, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      username,
      email,
      password,
    });

    try {
      const res = await fetch("/auth/users/register", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      const { dispatch } = thunkAPI;

      if (res.status === 201) {
        dispatch(login({ email, password }));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const forgot = createAsyncThunk(
  "forgot",
  async ({ email }, thunkAPI) => {
    const body = JSON.stringify({ email });

    try {
      const res = await fetch("/auth/users/forgot", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const authorizereset = createAsyncThunk(
  "authorizereset",
  async ({ uid }, thunkAPI) => {
    const body = JSON.stringify({ uid });

    try {
      const res = await fetch("/auth/users/authorizereset", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetpassword = createAsyncThunk(
  "resetpassword",
  async ({ newpassword }, thunkAPI) => {
    const body = JSON.stringify({ newpassword });

    try {
      const res = await fetch("/auth/users/resetpassword", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const refresh = createAsyncThunk("refresh", async (_, thunkAPI) => {
  try {
    const res = await fetch("/auth/token/refresh", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    const { dispatch } = thunkAPI;

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const res = await fetch("/auth/users/me", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const checkAuth = createAsyncThunk(
  "users/verify",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/auth/users/verify", {
        method: "get",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();
      const { dispatch } = thunkAPI;
      if (res.status === 200) {
        dispatch(getUser());
      } else if (res.status === 400) {
        dispatch(refresh());
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builer) => {
    builer
      .addCase(register.fulfilled, (state) => {
        state.registered = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.response = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.response = action.payload;
      })
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.verifydone = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userobj = action.payload;
        state.isAuthenticated = true;
        state.verifydone = true;
      })
      .addCase(getUser.pending, (state) => {
        state.verifydone = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.response = action.payload.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.userobj = null;
      })
      .addCase(logout.pending, (state) => {})
      .addCase(refresh.rejected, (state) => {
        state.verifydone = true;
        state.loading = false;
      })
      .addCase(refresh.fulfilled, (state) => {
        state.verifydone = true;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(refresh.pending, (state) => {
        state.verifydone = false;
        state.loading = true;
      })
      .addCase(forgot.rejected, (state, action) => {
        state.submited = false;
        // state.response = action.payload.error;
      })
      .addCase(forgot.fulfilled, (state) => {
        state.submited = true;
      })
      .addCase(forgot.pending, (state) => {
        state.submited = false;
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.submited = false;
        state.response = action.payload.error;
      })
      .addCase(resetpassword.fulfilled, (state) => {
        state.submited = true;
        state.verified = false;
        state.error = null;
      })
      .addCase(resetpassword.pending, (state) => {
        state.submited = false;

        state.error = null;
      })
      .addCase(authorizereset.rejected, (state, action) => {
        // state.response = action.payload.error;
        state.verified = false;
        state.rejected = true;
      })
      .addCase(authorizereset.fulfilled, (state) => {
        state.verified = true;
        state.error = null;
      })
      .addCase(authorizereset.pending, (state) => {
        state.verified = false;
      });
  },
});

export const { resetRegistered, resetAuth } = userSlice.actions;
export default userSlice.reducer;
