import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  success: true,
  error: null,
};

// Add a new product
export const addNewProduct = createAsyncThunk(
  "products/addProduct",
  async (payload) => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/products/addProduct",
      { payload },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/products/fetchProducts",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res?.data?.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (id, payload) => {
    console.log(payload, id)
    const res = await axios.put(
      `http://localhost:5000/api/admin/products/updateProduct/${id}`,
      {payload},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res)
    return res?.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const res = await axios.delete(
      `http://localhost:5000/api/admin/products/deleteProduct/${id}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res)
    return res?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add new product
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
        state.error = action.error.message;
      })

      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.success = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
        state.error = action.error.message;
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        state.success = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.payload._id;
        state.products = state.products.filter(
          (product) => product._id !== deletedId
        );
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default AdminProductsSlice.reducer;
