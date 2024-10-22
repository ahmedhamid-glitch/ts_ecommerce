export type ProductType = {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  category: string;
};

export type ProductTypes = {
  id: number;
  image: string;
  title: string;
  price: number;
};

export interface CartItem {
  id: number;
  price: number;
}
export interface CheckoutSummaryProps {
  jsonCart: CartItem[];
  quantity: { [key: number]: number };
}
