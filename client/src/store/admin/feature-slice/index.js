
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

const initialState = {
    isLoading: false,
    featureImageList: []
};

export const getFeatureImage = createAsyncThunk(
    '/order/getFeatureImage',
    async () => {
        const response = await axios.get(`http://localhost:5000/api/common/feature/get`);
        return response.data;
    }
);

export const addFeatureImage = createAsyncThunk(
    '/order/addFeatureImage',
    async (image) => {
        const response = await axios.post(`http://localhost:5000/api/common/feature/add`, 
            {image});
        return response.data;
    }
);

export const deleteFeatureImage = createAsyncThunk(
    '/order/deleteFeatureImage',
    async (id) => {
        const response = await axios.delete(`http://localhost:5000/api/common/feature/delete/${id}`);
        return response.data;
    }
)

const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload;
            })
            .addCase(getFeatureImage.rejected, (state) => {
                state.isLoading = false;
                state.featureImageList = [];
            })
            .addCase(deleteFeatureImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteFeatureImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(deleteFeatureImage.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export default commonSlice.reducer;