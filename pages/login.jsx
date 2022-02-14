import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function Login() {
  const classes = useStyles();

  const loginHandler = () => {};

  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              onClick={loginHandler}
            >
              Login
            </Button>
          </ListItem>
          <ListItem>
            New Here?&nbsp;
            <NextLink href={"/register"} passHref>
              <Link>Register Here!</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
