import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useContext } from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { useRouter } from "next/router";
import { Store } from "../utils/globalStore";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("firstName", shippingAddress.firstName);
    setValue("lastName", shippingAddress.lastName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("country", shippingAddress.country);
    setValue("zipCode", shippingAddress.zipCode);
  }, [userInfo, router, shippingAddress, setValue]);
  const submitHandler = ({
    firstName,
    lastName,
    address,
    country,
    city,
    zipCode,
  }) => {
    dispatch({
      type: "SAVE_ADDRESS",
      payload: { firstName, lastName, address, country, city, zipCode },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({ firstName, lastName, address, country, city, zipCode })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Shipping Information
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.firstName)}
                  helperText={
                    errors.firstName
                      ? errors.firstName.type === "minLength"
                        ? "First name must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="firstName"
                  label="First Name"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.lastName)}
                  helperText={
                    errors.lastName
                      ? errors.lastName.type === "minLength"
                        ? "Last name must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="lastName"
                  label="Last Name"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="address"
                  label="Address"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="city"
                  label="City"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.zipCode)}
                  helperText={
                    errors.zipCode
                      ? errors.zipCode.type === "minLength"
                        ? "Zip code must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="zipCode"
                  label="Zip Code"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === "minLength"
                        ? "Country must be at least 2 characters"
                        : "This field is required"
                      : ""
                  }
                  id="country"
                  label="Country"
                  inputProps={{ type: "text" }}
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
