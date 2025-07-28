import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        const res = await axios.post(
            'http://localhost:5000/api/auth/register',
            formData,
            {
                withCredentials: true,
            }
    )
        return res.data;
    }
)

export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        const res = await axios.post(
            'http://localhost:5000/api/auth/login',
            formData,
            {
                withCredentials: true,
            }
    )
        return res.data;
    }
)

export const checkAuth = createAsyncThunk('/auth/check-auth',
    async () => {
        const res = await axios.get(
            'http://localhost:5000/api/auth/check-auth',
            {
                withCredentials: true,
                headers:{
                    'cache-control': 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0',
                    Expires: '0',

                }
            })
        return res.data;
    }
)

export const logoutUser  = createAsyncThunk('/auth/logout',
    async () => {
        const res = await axios.post(
            'http://localhost:5000/api/auth/logout',
            {},
            {
                withCredentials: true,
            }
    )
        return res.data;
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(loginUser.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ?action.payload.user: null ;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(checkAuth.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ?action.payload.user: null ;
            state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        });
    }
})
export const { setUser } = authSlice.actions;
export default authSlice.reducer;