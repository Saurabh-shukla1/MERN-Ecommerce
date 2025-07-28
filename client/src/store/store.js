import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/products-slice"
import adminOrderSlice from "./admin/orders-slice"
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import shoppingAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./admin/feature-slice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductSlice,
        adminOrder: adminOrderSlice,
        shoppingProducts: shoppingProductSlice,
        shopCart : shoppingCartSlice,
        shopAddress: shoppingAddressSlice,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeatureSlice
    }
})

export default store;