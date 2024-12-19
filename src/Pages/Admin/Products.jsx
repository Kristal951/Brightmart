import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/AdminPanel/ProductCard";
import { PiEmptyBold } from "react-icons/pi";
import {
  Button,
  Skeleton,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import AddProductForm from "../../components/AdminPanel/AddProductForm";
import { fetchAllProducts } from "../../store/Admin/Products/index";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.adminProducts
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProducts())
      .unwrap()
      .then((result) => console.log("Fetched products:", result))
      .catch((err) => console.error("Error fetching products:", err));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 w-full justify-start relative">
      {/* Add Product Button */}
      <div className="flex justify-end w-full h-max md:fixed top-2 right-4 z-[1300]">
        <Button
          backgroundColor="#0a6ea9"
          color="#ffffff"
          colorScheme="blue"
          variant="solid"
          className="px-4 py-2 text-lg font-semibold text-center rounded-md hover:scale-105 shadow-md"
          ref={btnRef}
          onClick={onOpen}
        >
          Add Product
        </Button>
      </div>

      {/* Add/Edit Product Form */}
      <AddProductForm
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
      />

      {/* Product List */}
      <div className={isLoading ? "hidden" : "gap-8 mt-4 mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid overflow-y-scroll h-max overflow-x-hidden"}>
        {products?.map((product, index) => (
          <ProductCard
            product={product}
            key={product._id || index}
            onOpen={onOpen}
            setIsEditing={setIsEditing}
            setCurrentlyEditing={setCurrentlyEditing}
          />
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="w-full h-screen gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton height="150px" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-red-500 font-bold">
            Failed to load products. Please try again.
          </p>
        </div>
      )}

      {/* No Products */}
      {!isLoading && products.length === 0 && (
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col w-max h-max items-center justify-center">
            <PiEmptyBold className="w-[100px] h-[100px] text-primary" />
            <p className="text-primary text-xl font-bold">
              No products yet, add a product!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
