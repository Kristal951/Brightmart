import React, { useCallback, useState, useRef, useEffect } from "react";
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
import { uploadImage } from "../../lib/appwrite";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  fetchAllProducts,
  updateProduct,
} from "../../store/Admin/Products/index";
import { categories } from "../";

const AddProductForm = ({
  isOpen,
  onClose,
  btnRef,
  isEditing,
  setIsEditing,
  setCurrentlyEditing,
  currentlyEditing,
}) => {
  const [formState, setFormState] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    productCateg: "",
    currentStock: "",
    imagePreview: null,
    imageFile: null,
    uploadedImageURI: "",
  });

  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    if (isEditing && currentlyEditing) {
      setFormState({
        productName: currentlyEditing.name || "",
        productPrice: currentlyEditing.price || "",
        productDesc: currentlyEditing.description || "",
        productCateg: currentlyEditing.category || "",
        currentStock: currentlyEditing.availableStock || "",
        imagePreview: currentlyEditing.imageURI || null,
        imageFile: null,
        uploadedImageURI: currentlyEditing.imageURI || null,
      });
    } else {
      setFormState({
        productName: "",
        productPrice: "",
        productDesc: "",
        productCateg: "",
        currentStock: "",
        imagePreview: null,
        imageFile: null,
        uploadedImageURI: "",
      });
    }
  }, [isEditing, currentlyEditing]);

  const handleInputChange = (field) => (e) => {
    setFormState({ ...formState, [field]: e.target.value });
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
        if (formState.imagePreview) {
          URL.revokeObjectURL(formState.imagePreview);
        }
        setFormState({
          ...formState,
          imageFile: file,
          imagePreview: URL.createObjectURL(file),
        });
      }
    },
    [formState, toast]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg"],
    },
  });

  const handleClose = () => {
    onClose();
    setFormState({
      productName: "",
      productPrice: "",
      productDesc: "",
      productCateg: "",
      currentStock: "",
      imagePreview: null,
      imageFile: null,
      uploadedImageURI: "",
    });
    setIsEditing(false);
    dispatch(fetchAllProducts()).catch((err) =>
      console.error("Error fetching products:", err)
    );
  };

  const handleSubmit = async () => {
    const {
      productName,
      productPrice,
      productDesc,
      productCateg,
      currentStock,
      imageFile,
    } = formState;

    if (
      !productName ||
      !productPrice ||
      !productDesc ||
      !productCateg ||
      !currentStock
    ) {
      toast({
        title: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      let uploadedFileURI = formState.uploadedImageURI;
      if (!isEditing && imageFile) {
        const uploadedFile = await uploadImage(imageFile);
        uploadedFileURI = uploadedFile;
      }

      const payload = {
        uploadedImageURI: uploadedFileURI,
        productName,
        productPrice,
        productDesc,
        productCateg,
        currentStock,
      };

      const response = isEditing
        ? await dispatch(updateProduct(currentlyEditing._id, payload)).unwrap()
        : await dispatch(addNewProduct(payload)).unwrap();

      if (response.status === "success") {
        toast({
          title: `Product ${isEditing ? "updated" : "added"} successfully!`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        handleClose();
      }
    } catch (error) {
      toast({
        title: "Error submitting product",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent style={{ zIndex: 20000, backgroundColor: "#dbebfc" }}>
        <DrawerCloseButton />
        <DrawerHeader>
          {isEditing ? "Edit Product" : "Add a New Product"}
        </DrawerHeader>
        <DrawerBody>
          <div {...getRootProps()} className="dropzone-container">
            <input {...getInputProps()} />
            <div className="w-full h-full rounded-md flex items-center flex-col justify-start border-[1px]">
              {formState.imagePreview ? (
                <div className="w-full flex-col justify-center items-center p-2 flex h-[260px] border-[1px] rounded-lg border-primary border-1 border-dashed">
                  <img
                    src={formState.imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full flex-col justify-center items-center flex h-full p-2 border-[1px] border-spacing-3 rounded-lg border-primary border-1 border-dashed">
                  <p className="font-bold text-xl p-2 text-primary">
                    Post File
                  </p>
                  <MdImage className="w-[100px] h-[100px] text-primary" />
                  <p className="text-primary">
                    Drag and drop an image, or click below to select one
                  </p>
                </div>
              )}
              <div className="flex w-full h-max justify-center items-center p-2">
                <Button
                  colorScheme="blue"
                  variant="solid"
                  // onClick={handleButtonClick}
                >
                  Select from computer
                </Button>
              </div>
            </div>
          </div>

          <FormControl padding="2">
            <FormLabel color="#0a6ea9">Product Name</FormLabel>
            <Input
              value={formState.productName}
              onChange={handleInputChange("productName")}
              placeholder="Enter product name"
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
            />
          </FormControl>

          <FormControl padding="2">
            <FormLabel color="#0a6ea9">Price</FormLabel>
            <Input
              type="number"
              value={formState.productPrice}
              onChange={handleInputChange("productPrice")}
              placeholder="Enter product price"
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
            />
          </FormControl>

          <FormControl padding="2">
            <FormLabel color="#0a6ea9">Description</FormLabel>
            <Textarea
              value={formState.productDesc}
              onChange={handleInputChange("productDesc")}
              placeholder="Enter product description"
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
              cols="10"
            />
          </FormControl>

          <FormControl padding="2">
            <FormLabel color="#0a6ea9">Category</FormLabel>
            <Select
              value={formState.productCateg}
              onChange={handleInputChange("productCateg")}
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
            >
              {categories.map((category, i) => (
                <option value="men" key={i}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl padding="2">
            <FormLabel color="#0a6ea9">Stock</FormLabel>
            <Input
              type="number"
              value={formState.currentStock}
              onChange={handleInputChange("currentStock")}
              placeholder="Enter stock quantity"
              size="md"
              variant="outlined"
              backgroundColor="#ffff"
              _focus={{
                borderColor: "#0a6ea9",
                boxShadow: "0 0 0 2px #4299e1",
              }}
              fontWeight="bold"
              color="#0a6ea9"
            />
          </FormControl>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEditing ? "Update" : "Add"}
            {isLoading && <Spinner />}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProductForm;
