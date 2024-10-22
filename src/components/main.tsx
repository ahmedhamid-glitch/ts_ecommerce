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
  Button,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Main = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API = "https://fakestoreapi.com/products";

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
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
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Button onClick={() => router.push(`/product/${product.id}`)}>
                <Card
                  sx={{
                    width: 300,
                    height: 300,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{ height: 140, objectFit: "contain", width: "100%" }}
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
                    <Typography variant="body2" color="textSecondary">
                      Category: {product.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Button>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
export default Main;
