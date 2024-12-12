import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdEdit } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

const ProductCard = ({ product }) => {
  return (
    // <div className="flex flex-col p-4 bg-secondary shadow-md rounded-lg text-primary">
    //   <div className="h-[140px] bg-white rounded mb-4">
    //     <img
    //       src={product.imageURI}
    //       alt={product.name}
    //       className="h-[300px] w-full object-cover rounded"
    //     />
    //   </div>

    //   <h2 className="text-lg font-semibold text-primary mb-2">
    //     {product.name}
    //   </h2>
    //   <p className="text-sm text-primary mb-2">{product.description}</p>
    //   <p className="text-md font-bold text-primary mb-4">Price: ${product.price}</p>

    //   {/* Add Stock and Category */}
    //   <div className="text-sm text-primary mb-2">Stock: {product.availableStock}</div>
    //   <div className="text-sm text-primary">Category: {product.category}</div>
    // </div>
    <Card>
      <CardBody>
        <Image
          src={product.imageURI}
          alt={product.name}
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
        <ButtonGroup spacing="56">
          <Button variant="solid" colorScheme="blue" width="40px" height="40px" padding="1">
            <MdEdit className="w-full h-full"/>
          </Button>
          <Button variant="ghost" colorScheme="red" width="40px" height="40px" padding="1">
            <CiTrash className="w-full h-full text-red-500"/>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
