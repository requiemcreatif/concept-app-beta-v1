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

// Create Code
export const createCode = createAsyncThunk(
  "user/createCode",
  async (payload, { getState, dispatch }) => {
    const { title, description, code, language, codeStatus } = payload;
    const { token } = getState().user;
    const authAxios = createAuthAxios(token);
    try {
      await authAxios.post("/codes", { title, description, code, language, codeStatus });
      dispatch(createCodeSuccess());
      dispatch(clearFormValues());
      dispatch(hideAlert());
    } catch (error) {
      if (error.response.status === 401) return;
      throw error.response.data.msg;
    }
  }
);

// Get Codes

export const getCodes = createAsyncThunk("user/getCodes", async (_, { getState, dispatch }) => {
  const { page } = getState().user;
  let url = `/codes/?page=${page}`;
  try {
    const { data } = await authAxios(url);
    const { codes, totalCodes, numOfPages } = data;
    return { codes, totalCodes, numOfPages };
  } catch (error) {
    console.log(error.response);
  }
});

// All Get Codes
export const getAllCodes = createAsyncThunk(
  "user/getAllCodes",
  async (_, { getState, dispatch }) => {
    const { page } = getState().user;
    const authAxios = createAuthAxios(getState().user.token);
    const url = `/codes/all?page=${page}`;
    try {
      const { data } = await authAxios.get(url);
      const { codes, totalCodes, numOfPages } = data;
      return { codes, totalCodes, numOfPages };
    } catch (error) {
      console.log(error.response);
      throw error;
    }
    dispatch(hideAlert());
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
  editCodeId: "",
  title: "",
  description: "",
  code: "",
  languageOptions: ["JavaScript", "HTML", "CSS", "React", "Node", "Express", "MongoDB"],
  language: "JavaScript",
  codeStatusOptions: ["rejected", "approved", "pending"],
  codeStatus: "pending",
  codes: [],
  totalCodes: 0,
  numOfPages: 1,
  page: 1,
  search: "",
  searchQuery: "",
  sortBy: "createdAt:desc",
  sortQuery: "",
  codeStatusQuery: "",
  languageQuery: "",
  message: "",
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
    createCode: (state, action) => {
      state.isLoading = true;
    },
    createCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "Code created successfully! Redirecting..";
      state.alertType = "success";
    },
    createCodeFail: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    getCode: (state, action) => {
      state.isLoading = true;
      state.showAlert = false;
    },
    getCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.code = action.payload.code;
      state.language = action.payload.language;
      state.codeStatus = action.payload.codeStatus;
      state.editCodeId = action.payload._id;
      state.totalCodes = action.payload.totalCodes;
      state.numOfPages = action.payload.numOfPages;
      state.codes = action.payload.codes;
    },
    editcode: (state, action) => {
      const codes = state.codes.find((code) => code._id === action.payload);
      const { _id, title, description, code, language, codeStatus } = codes;
      state.isEdit = true;
      state.editCodeId = _id;
      state.title = title;
      state.description = description;
      state.code = code;
      state.language = language;
      state.codeStatus = codeStatus;
    },
    deleteCode: (state, action) => {
      state.isLoading = true;
    },
    deleteCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = "Code deleted successfully!";
      state.alertType = "success";
    },
    editCodeSuccess: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = `Code updated successfully! Thank you ${state.user.name}! `;
      state.alertType = "success";
    },
    editCodeFail: (state, action) => {
      state.isLoading = false;
      state.showAlert = true;
      state.alertText = action.payload.msg;
      state.alertType = "danger";
    },
    changePage: (state, action) => {
      state.page = action.payload;
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
      state.title = "";
      state.description = "";
      state.code = "";
      state.language = "JavaScript";
      state.codeStatus = "pending";
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
        })
        .addCase(getCodes.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCodes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.codes = action.payload.codes;
          state.totalCodes = action.payload.totalCodes;
          state.numOfPages = action.payload.numOfPages;
        })
        .addCase(getCodes.rejected, (state, action) => {
          console.log(action.error.message);
        })
        .addCase(getAllCodes.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllCodes.fulfilled, (state, action) => {
          state.isLoading = false;
          state.codes = action.payload.codes;
          state.totalCodes = action.payload.totalCodes;
          state.numOfPages = action.payload.numOfPages;
        })
        .addCase(getAllCodes.rejected, (state, action) => {
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
