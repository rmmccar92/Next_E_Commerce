import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import NextLink from "next/link";
import Image from "next/image";

import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import axios from "axios";
import Cookies from "js-cookie";

function ConfirmPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const displayPrice = itemPrice.toFixed(2);
  const shippingPrice = itemPrice > 200 ? 0 : 15;
  const displayShipping = shippingPrice.toFixed(2);
  const taxPrice = round2(itemPrice * 0.15);
  const displayTax = taxPrice.toFixed(2);
  const totalPrice = round2(itemPrice + shippingPrice + taxPrice);
  const displayTotal = totalPrice.toFixed(2);
  const [loading, setLoading] = useState(false);

  const checkoutHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: "CLEAR_CART" });
      Cookies.remove("cartItems");
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  return (
    <Layout title="Confirmation">
      <CheckoutWizard activeStep={3} />
      <Typography component="h1" variant="h1">
        Confirm Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  {shippingAddress.firstName} {shippingAddress.lastName},{" "}
                  {shippingAddress.address}, {shippingAddress.city},{" "}
                  {shippingAddress.zipCode}, {shippingAddress.country}
                </Typography>
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>{paymentMethod}</Typography>
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  height={2}
                                  width={3}
                                  layout="responsive"
                                />
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">${item.price}</TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${displayPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${displayTax}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${displayShipping}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${displayTotal}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={checkoutHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ConfirmPage), { ssr: false });
