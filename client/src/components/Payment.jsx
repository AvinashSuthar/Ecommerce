import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAppStore } from "../store";
import Checkout from "./Checkout";

import { CREATE_ORDER_ROUTES } from "../utils/constants";

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const paymentInfo = JSON.parse(sessionStorage.getItem("paymentInfo"));
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const { cart, userInfo } = useAppStore();

  const navigate = useNavigate();

  const createOrder = async () => {
    if (paymentInfo.status) {
      try {
        const data = {
          itemsPrice: paymentInfo.subTotal,
          taxPrice: paymentInfo.tax,
          shippingPrice: paymentInfo.shippingPrice,
          totalPrice: paymentInfo.totalPrice,
          orderItems: cart,
          shippingInfo: {
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            country: shippingInfo.contry,
            pinCode: shippingInfo.pinCode,
            phoneNo: shippingInfo.phoneNo,
          },
          paymentInfo: {
            id: "sample paymentInfo",
            status: "succeeded",
          },
        };
        const res = await axios.post(CREATE_ORDER_ROUTES, data, {
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success("Order Created Successfully!");
          navigate("/order/details");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(async () => {
      setIsProcessing(false);
      setIsConfirmed(true);
      setTimeout(async () => {
        (paymentInfo.status = true),
          sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
        await createOrder();
        sessionStorage.removeItem("paymentInfo");
        navigate("/orders/me");
      }, 1000);
    }, 2000);
  };
  useEffect(() => {
    if (!paymentInfo) {
      navigate("/order/details");
    }
  }, []);

  return (
    <div>
      <Checkout step={2} />
      <div className="p-6 mt-10 max-w-md mx-auto border rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <p>
          <strong>Username:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Phone:</strong>
        </p>
        <p>
          <strong>Total Amount:</strong>
        </p>

        <button
          onClick={handlePayment}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={isProcessing || isConfirmed}
        >
          {isProcessing
            ? "Processing..."
            : isConfirmed
            ? "Payment Confirmed"
            : "Pay Now"}
        </button>

        {isProcessing && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Processing your payment...
          </motion.div>
        )}

        {isConfirmed && (
          <motion.div
            className="mt-4 text-center text-green-600 font-semibold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Payment Confirmed! Thank you, !
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Payment;
