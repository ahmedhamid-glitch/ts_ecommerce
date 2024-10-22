import { CheckoutSummaryProps } from "@/types/types";
import { Box, Typography, Button, TextField, Divider } from "@mui/material";

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  jsonCart,
  quantity,
}) => {
  console.log("quantity", quantity);

  const subtotal =
    jsonCart.length === 0
      ? 0
      : jsonCart.reduce(
          (total, item) => total + item.price * (quantity[item.id] || 1),
          0
        );
  const tax = subtotal * 0.07;
  const grandTotal = subtotal + tax;

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Subtotal: ${subtotal.toFixed(2)}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sales Tax: ${tax.toFixed(2)}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Coupon Code:</Typography>
        <TextField variant="outlined" size="small" placeholder="Add Coupon" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h5" gutterBottom>
        Grand total: ${grandTotal.toFixed(2)}
      </Typography>
      <Typography variant="body1" color="green" gutterBottom>
        Congrats, you're eligible for Free Shipping
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: "10px 0", marginTop: 2 }}
      >
        Check out
      </Button>
    </Box>
  );
};

export default CheckoutSummary;

// import { CheckoutSummaryProps } from "@/types/types";
// import { Box, Typography, Button, TextField, Divider } from "@mui/material";

// const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
//   jsonCart,
//   quantity,
// }) => {
//   // Remove internal type declarations
//   // They should be in your types file

//   console.log("quantity", quantity);

//   // Calculate subtotal using the quantity object
//   const subtotal =
//     jsonCart.length === 0
//       ? 0
//       : jsonCart.reduce(
//           (total, item) => total + item.price * (quantity[item.id] || 1),
//           0
//         );
//   const tax = subtotal * 0.07;
//   const grandTotal = subtotal + tax;

//   return (
//     <Box
//       sx={{
//         maxWidth: 400,
//         margin: "0 auto",
//         padding: 3,
//         border: "1px solid #e0e0e0",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Subtotal: ${subtotal.toFixed(2)}
//       </Typography>
//       <Typography variant="h6" gutterBottom>
//         Sales Tax: ${tax.toFixed(2)}
//       </Typography>
//       <Box display="flex" alignItems="center" justifyContent="space-between">
//         <Typography variant="h6">Coupon Code:</Typography>
//         <TextField variant="outlined" size="small" placeholder="Add Coupon" />
//       </Box>
//       <Divider sx={{ my: 2 }} />
//       <Typography variant="h5" gutterBottom>
//         Grand total: ${grandTotal.toFixed(2)}
//       </Typography>
//       <Typography variant="body1" color="green" gutterBottom>
//         Congrats, you're eligible for Free Shipping
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ padding: "10px 0", marginTop: 2 }}
//       >
//         Check out
//       </Button>
//     </Box>
//   );
// };

// export default CheckoutSummary;
