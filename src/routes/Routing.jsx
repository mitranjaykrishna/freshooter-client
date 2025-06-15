import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import SignupLayout from "./layout/SignupLayout";
import Signin from "../pages/Signin";
import { StaticRoutes } from "../utils/StaticRoutes";
import Signup from "../pages/Signup";
import FeedLayout from "./layout/FeedLayout";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import Product from "../pages/Product";

export default function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<SignupLayout />}>
            <Route path={StaticRoutes?.signin} element={<Signin />} />
            <Route path={StaticRoutes?.signup} element={<Signup />} />
          </Route>
          <Route element={<FeedLayout />}>
            <Route path={StaticRoutes?.home} element={<Home />} />
            <Route path={StaticRoutes?.wishlist} element={<Wishlist />} />
            <Route path={StaticRoutes?.product} element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
