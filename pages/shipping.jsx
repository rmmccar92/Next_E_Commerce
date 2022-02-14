import React from "react";
import Layout from "../components/Layout";
import Router from "next/router";

export default function Shipping() {
  Router.push("/login");
  return <Layout title="Shipping"></Layout>;
}
