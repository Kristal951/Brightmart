import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AUTH'
import AdminProductsSlice from './Admin/Products'

const store = configureStore({
    reducer:{
        auth: authReducer, 
        adminProducts: AdminProductsSlice
    }
})

export default store