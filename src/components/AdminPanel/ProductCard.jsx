import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col p-4 bg-secondary shadow-md rounded-lg text-primary">
      <div className="h-[140px] bg-white rounded mb-4">
        <img
          src={product.imageURI}
          alt={product.name}
          className="h-full w-full object-cover rounded"
        />
      </div>

      <h2 className="text-lg font-semibold text-primary mb-2">
        {product.name}
      </h2>
      <p className="text-sm text-primary mb-2">{product.description}</p>
      <p className="text-md font-bold text-primary mb-4">Price: ${product.price}</p>

      {/* Add Stock and Category */}
      <div className="text-sm text-primary mb-2">Stock: {product.availableStock}</div>
      <div className="text-sm text-primary">Category: {product.category}</div>
    </div>
  );
};

export default ProductCard;
