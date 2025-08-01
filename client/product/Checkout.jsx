// ProductCheckout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  Divider,
  Paper,
  Container
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCart } from "./CartContext";
import { createOrder } from "./api-checkout";

const ProductCheckout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const groupedItems = cartItems.reduce((acc, item) => {
    const key = `${item.id}-${item.size}-${item.color}`;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});
  const groupedArray = Object.values(groupedItems);
  const total = groupedArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [values, setValues] = useState({
    paymentInfo: {
      nameOnCard: "",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
    shippingInfo: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      city: "",
      province: "",
      postalCode: "",
    },
    error: "",
  });

  const handleChange = (section, field) => (event) => {
    setValues({
      ...values,
      [section]: {
        ...values[section],
        [field]: event.target.value,
      },
    });
  };

  const validateForm = () => {
    const { paymentInfo, shippingInfo } = values;
    const requiredPaymentFields = ['nameOnCard', 'cardNumber', 'expirationDate', 'cvv'];
    const requiredShippingFields = ['firstName', 'lastName', 'address', 'phoneNumber', 'city', 'province', 'postalCode'];
    for (let field of [...requiredPaymentFields, ...requiredShippingFields]) {
      const value = field in paymentInfo ? paymentInfo[field] : shippingInfo[field];
      if (!value) return `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    }
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) return "Please enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expirationDate)) return "Please enter expiration date in MM/YY format";
    if (!/^\d{3,4}$/.test(paymentInfo.cvv)) return "Please enter a valid CVV (3-4 digits)";
    return null;
  };

  const clickSubmit = () => {
    const validationError = validateForm();
    if (validationError) {
      setValues({ ...values, error: validationError });
      return;
    }

    const order = {
      items: groupedArray,
      total: total,
      paymentInfo: values.paymentInfo,
      shippingInfo: values.shippingInfo,
      orderDate: new Date().toISOString(),
    };

    createOrder(order).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate("/confirmation");
        // Optional: clearCart();
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
        Checkout
      </Typography>

      {groupedArray.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Add some items to your cart to proceed with checkout.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>Order Summary</Typography>
              {groupedArray.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2">Size: {item.size} • Color: {item.color}</Typography>
                  <Typography variant="body2">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
              <Typography variant="h6">Total: ${(total * 1.13).toFixed(2)} (incl. tax)</Typography>
            </Paper>
          </Grid>

          {/* Payment + Shipping Forms */}
          <Grid item xs={12} md={7}>
            <Paper elevation={2} sx={{ p: 4 }}>
              {/* Payment Info */}
              <Typography variant="h5" sx={{ mb: 2 }}>Payment Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name on Card" value={values.paymentInfo.nameOnCard}
                    onChange={handleChange("paymentInfo", "nameOnCard")} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Card Number" value={values.paymentInfo.cardNumber}
                    onChange={handleChange("paymentInfo", "cardNumber")} placeholder="1234 5678 9012 3456" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Expiry (MM/YY)" value={values.paymentInfo.expirationDate}
                    onChange={handleChange("paymentInfo", "expirationDate")} placeholder="MM/YY" required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="CVV" value={values.paymentInfo.cvv}
                    onChange={handleChange("paymentInfo", "cvv")} placeholder="123" required />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Shipping Info */}
              <Typography variant="h5" sx={{ mb: 2 }}>Shipping Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" value={values.shippingInfo.firstName}
                    onChange={handleChange("shippingInfo", "firstName")} required />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" value={values.shippingInfo.lastName}
                    onChange={handleChange("shippingInfo", "lastName")} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Street Address" value={values.shippingInfo.address}
                    onChange={handleChange("shippingInfo", "address")} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" value={values.shippingInfo.phoneNumber}
                    onChange={handleChange("shippingInfo", "phoneNumber")} placeholder="+1 (555) 123-4567" required />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="City" value={values.shippingInfo.city}
                    onChange={handleChange("shippingInfo", "city")} required />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Province" value={values.shippingInfo.province}
                    onChange={handleChange("shippingInfo", "province")} required />
                </Grid>
                <Grid item xs={4}>
                  <TextField fullWidth label="Postal Code" value={values.shippingInfo.postalCode}
                    onChange={handleChange("shippingInfo", "postalCode")} placeholder="A1A 1A1" required />
                </Grid>
              </Grid>

              {values.error && (
                <Typography color="error" sx={{ mt: 2 }}>{values.error}</Typography>
              )}

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 4, py: 1.5 }} onClick={clickSubmit}>
                Place Order • ${(total * 1.13).toFixed(2)}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductCheckout;
