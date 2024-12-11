import React, { useEffect, useRef } from "react";
import ProductCard from "../../components/AdminPanel/ProductCard";
import {
  Box,
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
  console.log(isLoading);

  useEffect(() => {
    dispatch(fetchAllProducts())
      .unwrap()
      .then((result) => console.log("Fetched products:", result))
      .catch((err) => console.error("Error fetching products:", err));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2 w-full justify-start">
      <div className="flex justify-end w-full h-max md:fixed top-2 right-4 z-[1300]">
        <Button
          backgroundColor="#0a6ea9"
          color="#ffff"
          colorScheme="blue"
          variant="solid"
          className="px-4 py-2 text-lg font-semibold text-center rounded-md hover:scale-105 shadow-md"
          ref={btnRef}
          onClick={onOpen}
        >
          Add Product
        </Button>
      </div>

      <AddProductForm onClose={onClose} isOpen={isOpen} btnRef={btnRef} />

      <div className="gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid overflow-y-scroll">
        {products?.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}

        {isLoading && (
          <div className="flex flex-col w-full h-full">
            <Skeleton height="150px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </div>
        )}

        {error && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-red-500 font-bold">
              Failed to load products. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
