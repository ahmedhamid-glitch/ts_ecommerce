"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { useCart } from "@/context/contextPage";
import { ProductType } from "@/types/types";


const MainProduct = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("product", product);

  const API = `https://fakestoreapi.com/products/${params.id}`;
  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [params.id]);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        product && (
          <Grid container sx={{ justifyContent: "center" }}>
            <Card
              sx={{
                width: 300,
                height: 340,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ height: 140, objectFit: "cover", width: "100%" }}
              />
              <CardContent sx={{ flex: 1, padding: 2, overflow: "hidden" }}>
                <Typography variant="h6" component="div" noWrap>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>

                <Box sx={{ my: 2 }}>
                  <Button
                    onClick={() => addToCart(product)}
                    sx={{ width: "100%" }}
                    variant="contained"
                  >
                    Add to Cart
                  </Button>
                </Box>

                <Typography variant="body2" color="textSecondary">
                  Category: {product.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )
      )}
    </Container>
  );
};

export default MainProduct;
