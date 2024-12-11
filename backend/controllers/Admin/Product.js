const Product = require("../../models/Product");

const addProduct = async (req, res) => {
  try {
    console.log(req.body);
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

    console.log(newProduct);
    res.json({
      status: "success",
      message: "add product, successful",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      message: "add Product failed",
    });
  }
};

const fetchAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({
        status: "success",
        message: "Products fetched successfully",
        data: products
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Failed to fetch products",
        error: error.message
      });
    }
  };
  
module.exports = {
  addProduct,
  fetchAllProducts
};
