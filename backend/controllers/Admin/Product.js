const Product = require("../../models/Product");

// Add Product
const addProduct = async (req, res) => {
  try {
    const {
      uploadedImageURI,
      productName,
      productPrice,
      productDesc,
      productCateg,
      currentStock,
    } = req.body.payload;

    const newProduct = new Product({
      imageURI: uploadedImageURI,
      name: productName,
      price: productPrice,
      description: productDesc,
      category: productCateg,
      availableStock: currentStock,
    });

    await newProduct.save();

    res.json({
      status: "success",
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      status: "failed",
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// Fetch All Products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({
      status: "success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "failed",
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    uploadedImageURI,
    productName,
    productPrice,
    productDesc,
    productCateg,
    currentStock,
  } = req.body.payload;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }

    // Update fields only if provided
    if (uploadedImageURI) product.imageURI = uploadedImageURI;
    if (productName) product.name = productName;
    if (productPrice) product.price = productPrice;
    if (productDesc) product.description = productDesc;
    if (productCateg) product.category = productCateg;
    if (currentStock) product.availableStock = currentStock;

    await product.save();

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: "failed",
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: { id: product._id },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: "failed",
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
};
