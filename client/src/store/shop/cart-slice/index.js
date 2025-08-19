import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cartItems: [],
    cartId: null,
    isLoading: false,
};
export const addToCart = createAsyncThunk('cart/addToCart', async ({userId, productId, quantity}) => {

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/cart/add`, 
    {
        userId,
        productId,
        quantity
    }
  ) 
  return response.data;

});

export const fetchCartItem = createAsyncThunk(
    'cart/fetchCartItem', 
    async (userId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`);
        return response.data;
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem', 
    async ({userId, productId}) => {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/cart/delete/${userId}/${productId}`);
        return response.data;
    }
)

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/cart/update`, 
            {
                userId,
                productId,
                quantity
            });
        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers : {
        clearCart: (state) => {
            state.cartItems = [];
            state.cartId = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload?.data?.items || [];
            state.cartId = action.payload?.data?._id || null;
        })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.success = false;
            state.cartItems = [];
        })
        .addCase(fetchCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload?.data?.items || [];
            state.cartId = action.payload?.data?._id || null;
        })
        .addCase(fetchCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload?.data?.items || [];
            state.cartId = action.payload?.data?._id || null;
        })
        .addCase(updateCartItemQuantity.rejected, (state) => {
            state.isLoading = false;
            state.cartItems  = [];
        })
        .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload?.data?.items || [];
            state.cartId = action.payload?.data?._id || null;
        })
        .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
    }
});


export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;