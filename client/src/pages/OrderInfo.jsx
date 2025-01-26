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
        <div className="flex flex-col lg:flex-row md:flex-row xl:flex-row justify-evenly  items-center min-h-[700px] ">
          <div className="  w-[60%] min-h-[600px] m-2 p-2">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Shipping Info</h2>
              <div>
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Name</div>
                  <div>{userInfo.name}</div>
                </div>
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Phone</div>
                  <div>{shippingInfo.phoneNo}</div>
                </div>
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Address</div>
                  <div>{address}</div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden mt-4 h-[460px] shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] rounded-md relative">
              <div className="animate-scroll h-full">
                {cart.concat(cart).map((item, index) => (
                  <CartCard key={`${item.id}-${index}`} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className=" w-[40%] m-2 p-2">
            <div className="flex flex-col justify-center items-start w-full h-full">
              <h1 className="ms-3 text-xl text-gray-950 font-semibold border-b-2  w-full ">
                Order Summary
              </h1>

              <div className="w-full">
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Subtotal</div>
                  <div>{subTotal}/-</div>
                </div>
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Shipping Charges</div>
                  <div>{shippingPrice}/-</div>
                </div>
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>GST</div>
                  <div>{tax}/-</div>
                </div>
              </div>
              <hr />
              <div className=" mt-4  border-t-2 w-full">
                <div className="flex flex-row justify-between  w-[100%] px-4 py-2">
                  <div>Total Price</div>
                  <div>{totalPrice}/-</div>
                </div>
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
