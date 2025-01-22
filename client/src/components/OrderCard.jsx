import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <Link to={`/order/${order._id}`}>
      <div className=" bg-gray-100 m-2 p-2 shadow-md hover:scale-105 transition-all duration-700 h-[200px] flex justify-evenly">
        <div className="">{order.totalPrice}</div>
        <div className="">{order.orderStatus}</div>
        <div className=""> {order.createdAt.substr(0, 10)}</div>
      </div>
    </Link>
  );
};

export default OrderCard;
