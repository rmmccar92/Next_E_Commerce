import React from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useContext, useState } from "react";
import { Store } from "../utils/store";

export default function Shipping() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  if (!userInfo) {
    Router.push("/login?redirect=/shipping");
  }
  return <Layout title="Shipping">Shipping</Layout>;
}
