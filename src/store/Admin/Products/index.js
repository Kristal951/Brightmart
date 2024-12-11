import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  success: true,
  error: null,
};

export const addNewProduct = createAsyncThunk(
  "/products/addProduct",
  async (payload) => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/products/addProduct",
      { payload },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(res);
    return res?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const posts = await axios.get(
      "http://localhost:5000/api/admin/products/fetchProducts",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(posts);
    return posts?.data?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null; 
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [...state.products, action.payload]; 
        state.success = true;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.error.message; // Capturing error message
      }).addCase(fetchAllProducts.pending, (state, action)=>{
        state.isLoading = true
        state.success = false;
        state.error = null; 
      }).addCase(fetchAllProducts.fulfilled, (state, action)=>{
        state.isLoading = false
        state.products = action.payload
        state.success = true;
      }).addCase(fetchAllProducts.rejected, (state, action)=>{
        state.isLoading = false
        state.products = []
        state.error = action.error.message; 
      })
  },
});

export default AdminProductsSlice.reducer;
