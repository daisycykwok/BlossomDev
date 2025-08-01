import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  Container,
  Divider,
  IconButton,
  Chip,
  Avatar
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const ProductCart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const groupedArray = cartItems;

  const total = groupedArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item);
    } else {
      updateQuantity(item, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <ShoppingCartIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
          Shopping Cart
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {groupedArray.length} {groupedArray.length === 1 ? 'item' : 'items'} in your cart
        </Typography>
      </Box>

      {groupedArray.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, textAlign: 'center', backgroundColor: 'grey.50', borderRadius: 3 }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium', color: 'grey.600' }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {groupedArray.map((item, index) => (
                <Box key={index}>
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={3}>
                        <Box
                          sx={{
                            width: '30%',
                            aspectRatio: '1',
                            borderRadius: 2,
                            overflow: 'hidden',
                            backgroundColor: 'grey.100',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <Avatar sx={{ width: 50, height: 60, bgcolor: 'primary.light' }}>
                              {item.name.charAt(0)}
                            </Avatar>
                          )}
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip label={`Size: ${item.size}`} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
                          <Chip label={`Color: ${item.color}`} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
                        </Box>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 2,
                            mb: 2
                          }}>
                            <IconButton size="small" onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton size="small" onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <IconButton color="error" onClick={() => handleRemoveItem(item)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  {index < groupedArray.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                position: 'sticky',
                top: 20,
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #000000 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${total.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax (13%):</Typography>
                  <Typography>${(total * 0.13).toFixed(2)}</Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${(total * 1.13).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => navigate("/checkout")}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: 1.5,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/products")}
                sx={{
                  mt: 2,
                  color: 'rgba(255,255,255,0.8)',
                  textTransform: 'none',
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Continue Shopping
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductCart;
