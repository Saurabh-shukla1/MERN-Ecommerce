import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    products: [],
}

export const addNewProduct = createAsyncThunk(
    '/products/addNewProduct',
    async (FormData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, FormData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return result?.data;
    }
);

export const fetchAllProducts = createAsyncThunk(
    '/products/fetchAllProducts',
    async () => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/products/get`,
        )
        return result?.data;
    }
);
export const editProduct = createAsyncThunk(
    '/products/editProduct',
    async ({id, formData}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return result?.data;
    }
);

//delete product
export const deleteProduct = createAsyncThunk(
    '/products/deleteProduct',
    async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return result?.data;
    }
);

const AdminProductSlice = createSlice({
    name: 'adminProducts',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.products = action.payload.data || [];
        }).addCase(fetchAllProducts.rejected, (state, action) =>{
            state.isLoading = false;
            state.products = [];
        })
    }
})

export default AdminProductSlice.reducer;