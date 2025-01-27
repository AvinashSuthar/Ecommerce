import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./index.css";
import Header from "./components/Header";
import PageNotFound from "./pages/PageNotFound";
import OTP from "./pages/OTP";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Search from "./components/Search";
import Products from "./pages/Products";
import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_USER_INFO } from "./utils/constants";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";
import Loader from "./components/Loader";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import SendEmailToUpdatePassword from "./components/SendEmailToUpdatePassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import OrderInfo from "./pages/OrderInfo";
import Order from "./pages/Order";
import Payment from "./components/Payment";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(GET_USER_INFO, {
          withCredentials: true,
        });
        
        setUserInfo(res.data.user);
      } catch (error) {
        console.log("Error fetching user info:", error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
  }, []);

  return (
    <>
      <Header />

      <Routes location={location}>
        <Route path="/" element={<Home show={show} setShow={setShow} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/verify-otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/password/update"
          element={
            <Protected>
              <UpdatePassword />
            </Protected>
          }
        />
        <Route
          path="/password/forgot"
          element={<SendEmailToUpdatePassword />}
        />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders/me"
          element={
            <Protected>
              <Order />
            </Protected>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Protected>
              <OrderDetails />
            </Protected>
          }
        />
        <Route
          path="/payment/confirm"
          element={
            <Protected>
              <Payment />
            </Protected>
          }
        />
        <Route
          path="/order/details"
          element={
            <Protected>
              <OrderInfo />
            </Protected>
          }
        />
        <Route
          path="/shipping"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/profile/update"
          element={
            <Protected>
              <UpdateProfile />
            </Protected>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
