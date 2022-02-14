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
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log("login success", data);
    } catch (err) {
      console.log(err.response.data ? err.response.data.message : err.message);
    }
  };

  return (
    <Layout title="Login">
      <form className={classes.form} onSubmit={submitHandler}>
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
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
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
