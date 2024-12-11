import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Select,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { MdImage } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { uploadImage } from "../../lib/appwrite"; // Ensure this function is correctly implemented
import { useDispatch } from "react-redux";
import {addNewProduct} from '../../store/Admin/Products/index'

const AddProductForm = ({ isOpen, onClose, btnRef }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageURI, setUploadedImageURI] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCateg, setProductCateg] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const inputRef = useRef(null);
  const dispatch = useDispatch()


  const handleClose = () => {
    onClose();
    setImagePreview(null);
    setImageFile(null);
    setProductName("");
    setProductPrice("");
    setProductDesc("");
    setProductCateg("");
    setCurrentStock("");
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const type = file.type.split("/")[0];
        if (!["image"].includes(type)) {
          toast({
            title: "Unsupported file type",
            description: "Only image files are supported",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          return;
        }
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    },
    [toast]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg"],
    },
  });

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async () => {
    if (!productName || !productPrice || !productDesc || !productCateg || !currentStock) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!imageFile) {
      toast({
        title: "Please upload an image",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      const uploadedFile = await uploadImage(imageFile);
      setUploadedImageURI(uploadedFile); 

      // Create the payload with the uploaded image URI
      const payload = {
        uploadedImageURI: uploadedFile,
        productName,
        productPrice,
        productDesc,
        productCateg,
        currentStock,
      };

      const response = await dispatch(addNewProduct(payload)).unwrap();
      console.log(response)

      // Handle success response
      // if (response.status === 200) {
      //   toast({
      //     title: "Product added successfully",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //     position: "top-right",
      //   });
      //   handleClose(); // Close the drawer after successful submission
      // }
    } catch (error) {
      toast({
        title: "Error adding product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent style={{ zIndex: 20000, backgroundColor: " #dbebfc" }} className="bg-secondary">
        <DrawerCloseButton />
        <DrawerHeader>
          <p className="text-primary font-bold text-xl">Add a New Product</p>
        </DrawerHeader>

        <DrawerBody className="space-y-8">
          <div {...getRootProps()} className="w-full h-[300px] flex flex-col items-center">
            <input {...getInputProps()} aria-label="Upload File" ref={inputRef} />
            <div className="w-full h-full rounded-md flex items-center flex-col justify-start border-[1px]">
              {imagePreview ? (
                <div className="w-full flex-col justify-center items-center p-2 flex h-[260px] border-[1px] rounded-lg border-primary border-1 border-dashed">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full flex-col justify-center items-center flex h-full p-2 border-[1px] border-spacing-3 rounded-lg border-primary border-1 border-dashed">
                  <p className="font-bold text-xl p-2 text-primary">Post File</p>
                  <MdImage className="w-[100px] h-[100px] text-primary" />
                  <p className="text-primary">
                    Drag and drop an image, or click below to select one
                  </p>
                </div>
              )}
              <div className="flex w-full h-max justify-center items-center p-2">
                <Button colorScheme="blue" variant="solid" onClick={handleButtonClick}>
                  Select from computer
                </Button>
              </div>
            </div>
          </div>

          <FormControl>
            <FormLabel htmlFor="productName">Product Name</FormLabel>
            <Input
              id="productName"
              placeholder="Product Name"
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              value={productName}
              onChange={handleChange(setProductName)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="productPrice">Price</FormLabel>
            <Input
              id="productPrice"
              placeholder="Price in Dollars"
              size="md"
              type="number"
              variant="outlined"
              backgroundColor="white"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              value={productPrice}
              onChange={handleChange(setProductPrice)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="productDesc">Product Description</FormLabel>
            <Textarea
              id="productDesc"
              placeholder="Product Description"
              size="md"
              rows="8"
              variant="outlined"
              backgroundColor="white"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              value={productDesc}
              onChange={handleChange(setProductDesc)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="productCateg">Category</FormLabel>
            <Select
              id="productCateg"
              placeholder="Category"
              variant="outlined"
              backgroundColor="white"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              value={productCateg}
              onChange={handleChange(setProductCateg)}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="unisex">Unisex</option>
              <option value="accessories">Accessories</option>
              <option value="gadgets">Gadgets</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="currentStock">Total stock available</FormLabel>
            <Input
              id="currentStock"
              placeholder="Total stock available"
              size="md"
              variant="outlined"
              type="number"
              backgroundColor="white"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              value={currentStock}
              onChange={handleChange(setCurrentStock)}
            />
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" colorScheme="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading} loadingText="Adding Product">
            {loading ? <Spinner size="sm" /> : "Add Product"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductForm;
