import Layout from "../components/Layout";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import NextLink from "next/link";
import db from "../utils/db";
import Product from "../models/Products";
import { Store } from "../utils/store";
import { useContext } from "react";
import axios from "axios";
import Router from "next/router";

export default function Home(props) {
  const { state, dispatch } = useContext(Store);
  const { products } = props;
  const addToCartHandler = async (product) => {
    const itemInCart = state.cart.cartItems.find(
      (item) => item._id === product._id
    );
    const quantity = itemInCart ? itemInCart.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      // Change this to not use alert
      window.alert("Out of stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    Router.push("/cart");
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                      <p>{product.description}</p>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObject),
    },
  };
}
