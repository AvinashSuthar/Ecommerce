import React, { useState } from "react";
import Checkout from "../components/Checkout";
import Box from "../components/Box";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import CartCard from "../components/CartCard";
import Payment from "../components/Payment";

const OrderInfo = () => {
  const { cart, userInfo, shippingInfo } = useAppStore();
  const [payment, setPayment] = useState(false);
  const navigate = useNavigate();
  let subTotal = 0;
  cart.map((i) => {
    subTotal += i.price * i.quantity;
  });
  const shippingPrice = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingPrice;
  const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.contry} , ${shippingInfo.pinCode} `;

  if (!cart.length) {
    return <div>No items</div>;
  }
  const handlePayment = () => {
    const paymentInfo = {
      totalPrice,
      shippingPrice,
      tax,
      subTotal,
      status: false,
    };
    sessionStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    navigate("/payment/confirm");
  };
  return (
    <>
      <div>
        <Checkout step={1} />
        <div className="flex justify-evenly h-[70vh]">
          <div className="border w-[60%] m-2 p-2">
            <div>
              <h2>Shipping Info</h2>
              <p>Name : {userInfo.name}</p>
              <p>Phone : {shippingInfo.phoneNo}</p>
              <p>Address : {address}</p>
            </div>
            <hr />
            <div className="overflow-y-scroll h-[360px] border">
              {cart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="border  w-[40%] m-2 p-2">
            <div className="flex flex-col justify-center items-start w-full h-full">
              <h1>Order Summary</h1>

              <div>
                <p>Subtotal: {subTotal}</p>
                <p>Shipping Charges: {shippingPrice}</p>
                <p>GST: {tax}</p>
              </div>
              <hr />
              <div>
                <p>Total: {totalPrice}</p>
              </div>
              <button
                onClick={handlePayment}
                className="border w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition-all duration-500"
              >
                Proceed To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
