"use client";

import CheckoutSummary from "@/components/CheckoutSummary";
import { useCart } from "@/context/contextPage";
import { ProductTypes } from "@/types/types";
import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

const AddToCard = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { getLocal, setCartItems, setCount } = useCart();
  const items = getLocal();

  let jsonCart: ProductTypes[] = items ? JSON.parse(items) : [];

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

  const handleCartRemove = (id: number) => {
    const newJsonC = [...jsonCart];
    const filtered = newJsonC.filter((item) => item.id !== id);

    if (filtered.length === 0) {
      localStorage.removeItem("cart");
    }
    jsonCart = filtered;
    console.log(jsonCart.length, "this is length");
    setCount(jsonCart?.length || 0);
    setCartItems(jsonCart);
    localStorage.setItem("cart", JSON.stringify(jsonCart));
    console.log("jsonCartLocal", jsonCart);
  };

  return (
    <Container>
      <Box display={"flex"} py={4} justifyContent={"center"}>
        <Typography variant="h4" component={"p"} fontWeight={"bold"}>
          Your Cart [{jsonCart.length} items]
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        {jsonCart.map((item) => (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              textAlign: "center",
              mb: 2,
            }}
            key={item.id}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  height: 100,
                  width: 90,
                  objectFit: "contain",
                  marginRight: 2,
                }}
              />
              <CardContent sx={{ flex: 1, width: "300px" }}>
                <Typography
                  color="primary"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Box>

            <Box sx={{ paddingRight: 15 }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                ${item.price}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", paddingRight: 10 }}
            >
              <Button onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </Button>
              <Typography
                sx={{ width: "3rem", fontSize: "16px", textAlign: "center" }}
              >
                {quantities[item.id] || 1}
              </Typography>
              <Button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </Button>
            </Box>

            <Box sx={{ paddingRight: 2 }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                Total: ${item.price * (quantities[item.id] || 1)}
              </Typography>
            </Box>

            <Box>
              <IconButton onClick={() => handleCartRemove(item.id)}>
                <DeleteForever />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Box>
      <Box>
        <CheckoutSummary jsonCart={jsonCart} quantity={quantities} />
      </Box>
    </Container>
  );
};

export default AddToCard;
