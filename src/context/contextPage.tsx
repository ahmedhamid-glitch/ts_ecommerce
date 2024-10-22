"use client"; // Ensure this is present

import { ProductType } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface CartContextType {
  count: number;
  addToCart: (productId: ProductType) => void;
  cartItems: number[]; // Array to keep track of added product IDs
  // getItem: string | null;

  getLocal: () => string | null;
  setCount: Dispatch<SetStateAction<number>>;
  setCartItems: Dispatch<SetStateAction<any[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const cartCount = localStorage.getItem("cart");
  let jsonCart;
  if (cartCount) {
    jsonCart = JSON.parse(cartCount);
  }
  const [count, setCount] = useState<number>(jsonCart?.length || 0);
  const [cartItems, setCartItems] = useState<any[]>(jsonCart || []); // Initialize an empty cart

  const addToCart = (productId: any) => {
    // Check if the product ID is already in the cart
    const alreadyExists = cartItems.filter((item) => item.id === productId.id);
    console.log("alreadyExists", alreadyExists);

    if (!alreadyExists.length) {
      setCartItems((prevItems) => [...prevItems, productId]);
      setCount((prevCount) => prevCount + 1);
      localStorage.setItem("cart", JSON.stringify([...cartItems, productId]));
    }
  };
  const getLocal = () => {
    console.log("cartCount1", cartCount);
    return cartCount;
  };

  return (
    <CartContext.Provider
      value={{ count, addToCart, getLocal, cartItems, setCartItems, setCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

//
