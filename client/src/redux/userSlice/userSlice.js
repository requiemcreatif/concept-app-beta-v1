import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const userLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const removeUserLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const createAuthAxios = (token) => {
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeUserLocalStorage();
        return Promise.reject(error);
      }
    }
  );

  return authAxios;
};

// Register User
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (currentUser, { dispatch }) => {
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { token, user } = response.data;
      userLocalStorage({ user, token });
      return { token, user };
    } catch (error) {
      throw error.response.data.msg;
    }
  }
);

// Login User

export const loginUser = (currentUser) => async (dispatch) => {
  dispatch(login());
  try {
    const { data } = await axios.post("/api/v1/auth/login", currentUser);
    const { token, user } = data;
    dispatch(loginSuccess({ token, user }));
    userLocalStorage({ user, token });
  } catch (error) {
    dispatch(loginFail(error.response.data.msg));
  }
  dispatch(hideAlert());
};

// Logout User

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (currentUser, { getState, dispatch }) => {
    const { token } = getState().user;
    const authAxios = createAuthAxios(token);
    try {
      const { data } = await authAxios.patch("/auth/updateUser", currentUser);
      const { token, user } = data;
      userLocalStorage({ user, token });
      return { token, user };
    } catch (error) {
      if (error.response.status !== 401) {
        throw error.response.data.msg;
      }
    }
  }
);

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEdit: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.showAlert = true;
      state.alertText = "User registered successfully! Redirecting..";
      state.alertType = "success";
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    login: (state, action) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.showAlert = true;
      state.alertText = " User logged in successfully! Redirecting..";
      state.alertType = "success";
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload;
      state.alertType = "error";
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    edit: (state, action) => {
      state.isEdit = true;
      state.isLoading = true;
    },
    editSuccess: (state, action) => {
      state.isEdit = false;
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.showAlert = true;
      state.alertText = "User edited successfully! Redirecting..";
      state.alertType = "success";
    },
    editFail: (state, action) => {
      state.isEdit = false;
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    showAlert: (state, action) => {
      state.showAlert = true;
      state.alertText = "Please provide all the values!";
      state.alertType = "danger";
    },
    hideAlert: (state, action) => {
      state.showAlert = false;
      state.alertText = "";
      state.alertType = "";
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    clearFormValues: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          userLocalStorage({ user: action.payload.user, token: action.payload.token });
          const authAxios = createAuthAxios(state.token);
          // You can now use `authAxios` instance for authenticated requests
          // ...
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.showAlert = true;
          state.alertText = action.error.message;
          state.alertType = "danger";
        });
    },
  },
});

export const {
  register,
  registerSuccess,
  registerFail,
  login,
  loginSuccess,
  loginFail,
  logout,
  edit,
  editSuccess,
  editFail,
  showAlert,
  hideAlert,
  handleChange,
} = userSlice.actions;

export default userSlice.reducer;
