"use client";

import { useCart } from "@/context/contextPage";
import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { count } = useCart();
  const [cart, setCart] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const local = localStorage.getItem("cart");
    if (local) {
      setCart(JSON.parse(local));
    }
  }, []);

  console.log("cart is", count);

  return (
    <Box
      sx={{
        bgcolor: "ButtonShadow",
        width: "100%",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 3,
        }}
      >
        <Box>
          <Typography variant="h5" color="goldenrod">
            Logo
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            onClick={() => router.push("/")}
            color="warning"
            variant="outlined"
          >
            Home
          </Button>
          <Button
            onClick={() => router.push("/about")}
            color="warning"
            variant="outlined"
          >
            About
          </Button>
          <Button
            onClick={() => router.push("/product")}
            color="warning"
            variant="outlined"
          >
            Products
          </Button>
          <Button
            onClick={() => router.push("/content")}
            color="warning"
            variant="outlined"
          >
            Content
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative", // This is needed for the absolute positioning
          }}
        >
          <IconButton
            onClick={() => router.push("/addToCard")}
            sx={{
              position: "relative", // This is needed for the absolute positioning of the badge
              p: 1.2,
              color: "goldenrod",
            }}
          >
            <ShoppingCart />
            <Box
              sx={{
                position: "absolute",
                top: -8, // Adjust as needed
                right: -8, // Adjust as needed
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
              }}
            >
              {count}
            </Box>
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
