import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { MdEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "../../store/Admin/Products/index";

const ProductCard = ({
  product,
  onOpen,
  setIsEditing,
  setCurrentlyEditing,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleEdit = (product) => {
    onOpen();
    setIsEditing(true);
    setCurrentlyEditing(product);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(product._id)).then(()=>{
        dispatch(fetchAllProducts())
      })
      return toast({
        title: "Product Deleted",
        description: "You have successfully deleted a product",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      return toast({
        title: "Product Deletion Failed",
        description:
          "Your request for the delete of a product was unsuccessful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Card _hover={{ boxShadow: "lg" }} cursor="pointer" border="1px" borderColor="#e5e7eb">
      <CardBody>
        <Image
          src={product.imageURI || "https://via.placeholder.com/300"}
          alt={product.name || "No Image Available"}
          height="240px"
          width="300px"
          borderTopRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Text color="#0a6ea9" fontWeight="bold">
            {product.name}
          </Text>
          <Text color="#0a6ea9">${product.price}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="52">
          <Button
            variant="solid"
            colorScheme="blue"
            width="40px"
            height="40px"
            padding="1"
            onClick={() => handleEdit(product)}
          >
            <MdEdit className="w-full h-full" />
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            width="40px"
            height="40px"
            padding="1"
            onClick={handleDelete}
          >
            <CiTrash className="w-full h-full text-red-500" />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
