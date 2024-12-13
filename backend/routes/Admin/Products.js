const express = require("express");

const {
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
} = require("../../controllers/Admin/Product");

const router = express.Router();

router.get("/fetchProducts", fetchAllProducts);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
module.exports = router;
