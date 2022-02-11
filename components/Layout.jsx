import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { createTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Link,
  ThemeProvider,
  CssBaseline,
  Switch,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/store";
import Cookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const [mode, setMode] = useState(false);
  useEffect(() => {
    setMode(darkMode);
  }, [darkMode]);
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: mode ? "dark" : "light",
      primary: {
        main: "#f0c000",
        secondary: "#208080",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Next.js E-Commerce` : "Next.js E-Commerce"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar className={classes.navbar} position="static">
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>
                  Next E-Commerce
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch checked={mode} onChange={darkModeChangeHandler}></Switch>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>Copyright 20??. All rights reserved.@@.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
