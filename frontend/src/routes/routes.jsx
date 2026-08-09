import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainLayout from "~layouts/MainLayout/MainLayout";
import Home from "~/pages/Home/Home";
import SearchResult from "~/pages/SearchResult/SearchResult";
import Cart from "~/pages/Cart/Cart";

import Category from "../pages/Category/Category";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import SpringCollection from "~/pages/Collection/SpringCollection";
import SummerCollection from "~/pages/Collection/SummerCollection";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import WinterCollection from "~/pages/Collection/WinterCollection";
import AutumnCollection from "~/pages/Collection/AutumnCollection";
import CategoryProducts from "../pages/CategoryProducts/CategoryProducts";
import SubcategoryProducts from "../pages/SubcategoryProducts/SubcategoryProducts";
import Checkout from "../pages/Checkout/Checkout";
import Login from "~/pages/Login/Login";
import OAuth2Callback from "~/pages/OAuth2Callback/OAuth2Callback";
import SignUpLayout from "~/pages/SignUp/SignUpLayout";
import SignUp from "../pages/SignUp/SignUp";
import OrderPlaced from "../pages/OrderPlaced/OrderPlaced";
import PayMent from "~/pages/PayMent/PayMent";
import QrPayment from "~/pages/QrPayment/QrPayment";
import HeaderOnly from "~layouts/HeaderOnly/HeaderOnly";
import ProfileOverview from "~/pages/Profile/ProfileOverview";
import Processing from "~/pages/Profile/MyOrders";
import OnTheWay from "~/pages/Profile/OnTheWay";
import Arrived from "~/pages/Profile/Arrived";
import Return from "~/pages/Profile/Return";
import Cancelled from "~/pages/Profile/Cancelled";
import AddressBook from "~/pages/Profile/AddressBook";
import EditAddress from "~/pages/Profile/EditAddress";
import AddAddress from "~/pages/Profile/AddAddress";
import PaymentMethod from "../pages/Profile/PaymentMethod";
import AddNewCard from "../pages/Profile/AddNewCard";
import CardDetails from "../pages/Profile/CardDetails";
import AdminLayout from "../components/layout/AdminLayout/AdminLayout";
import ProductManagement from "../pages/ProductMangement/ProductManagement";
import QuanLyDanhMuc from "../pages/QuanLyDanhMuc/QuanLydanhMuc";
export const routes = (
  <>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />

      <Route path="product/:slug" element={<ProductDetail />} />
      <Route path="search" element={<SearchResult />} />
      <Route path="category/:slug" element={<Category />}>
        <Route index element={<CategoryProducts />} />
        <Route path=":subcategorySlug" element={<SubcategoryProducts />} />
        <Route
          path=":subcategorySlug/:productType"
          element={<SubcategoryProducts />}
        />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="order-placed" element={<OrderPlaced />} />
      <Route path="payment" element={<PayMent />} />
      <Route path="qr-payment" element={<QrPayment />} />
    </Route>
    <Route path="collection" element={<HeaderOnly />}>
      <Route path="spring-2025" element={<SpringCollection />} />
      <Route path="summer-2025" element={<SummerCollection />} />
      <Route path="winter-2025" element={<WinterCollection />} />
      <Route path="autumn-2025" element={<AutumnCollection />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/oauth2/callback" element={<OAuth2Callback />} />
    <Route path="/signup" element={<SignUpLayout />}>
      <Route index element={<SignUp/>}></Route>
    </Route>

    <Route path="/profile" element={<HeaderOnly />}>
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" element={<ProfileOverview />}/>

      <Route path="my-orders">
        <Route index element={<Navigate to="processing" replace />} />
        <Route path="processing" element={<Processing />} />
        <Route path="on-the-way" element={<OnTheWay />} />
        <Route path="arrived" element={<Arrived />} />
        <Route path="return" element={<Return />} />
        <Route path="cancelled" element={<Cancelled />} />
      </Route>

      <Route path="address-book">
        <Route index element={<Navigate to="list" replace />} />
        <Route path="list" element={<AddressBook />} />
        <Route path="edit" element={<EditAddress />} />
        <Route path="add" element={<AddAddress />} />
      </Route>
      <Route path="payment">
        <Route index element={<Navigate to="payment-method" replace />} />
        <Route path="payment-method" element={<PaymentMethod />} />
        <Route path="addNewCard" element={<AddNewCard />} />
        <Route path="addNewCard/cardDetails" element={<CardDetails />} />
        <Route path="editCard/cardDetails" element={<CardDetails />} />
      </Route>
    </Route>

    <Route path="/dashboard" element={<AdminLayout></AdminLayout>}>
      <Route index element={<AdminOverview></AdminOverview>}></Route>
      <Route
        path="quan-ly-san-pham"
        element={<ProductManagement></ProductManagement>}
      ></Route>
      <Route
        path="quan-ly-danh-muc"
        element={<QuanLyDanhMuc></QuanLyDanhMuc>}
      ></Route>
    </Route>
  </>
);
