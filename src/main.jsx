import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import Home from "./pages/Home.jsx";
import Product from "./pages/product/Product.jsx";
import Signin from "./pages/auth/Signin.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Profile from "./pages/admin/Profile.jsx";
import AdmProduct from "./pages/admin/product/AdmProduct.jsx";
import AdmUsers from "./pages/admin/users/AdmUsers.jsx";
import AdmTag from "./pages/admin/tag/AdmTag.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import AdmUsersPost from "./pages/admin/users/AdmUsersPost.jsx";
import AdmUserDetail from "./pages/admin/users/AdmUserDetail.jsx";
import AdmUsersUpdate from "./pages/admin/users/AdmUsersUpdate.jsx";
import AdmCat from "./pages/admin/category/AdmCat.jsx";
import ProtectedAdmin, { ProtectedUser } from "./pages/admin/ProtectedRole.jsx";
// import AuthRedirect from "./pages/auth/AuthRedirect.jsx";
import AdmProductPost from "./pages/admin/product/AdmProductPost.jsx";
import AdmProductDetail from "./pages/admin/product/AdmProductDetail.jsx";
import AdmProductUpdate from "./pages/admin/product/AdmProductUpdate.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="product" element={<Product />} />
      {/* <Route element={<AuthRedirect />}> */}
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      {/* </Route> */}
      <Route element={<ProtectedUser />}>
        <Route path="user-profile" element={<Profile />} />
      </Route>
      <Route element={<ProtectedAdmin />}>
        <Route path="adm-profile" element={<Profile />} />
        <Route path="adm-product">
          <Route index element={<AdmProduct />} />
          <Route path="post" element={<AdmProductPost />} />
          <Route path="detail/:id" element={<AdmProductDetail />} />
          <Route path="update/:id" element={<AdmProductUpdate />} />
        </Route>
        <Route path="adm-users">
          <Route index element={<AdmUsers />} />
          <Route path="post" element={<AdmUsersPost />} />
          <Route path="detail/:id" element={<AdmUserDetail />} />
          <Route path="update/:id" element={<AdmUsersUpdate />} />
        </Route>
        <Route path="adm-category" element={<AdmCat />} />
        <Route path="adm-tag" element={<AdmTag />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
