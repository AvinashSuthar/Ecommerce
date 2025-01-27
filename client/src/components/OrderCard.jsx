import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  return (
    <div className=" bg-gray-100 m-2 p-2 shadow-md transition-all duration-700  flex justify-evenly">
      <div className="">₹{order.totalPrice}</div>
      <div className="">{order.orderStatus}</div>
      <div className=""> {order.createdAt.substr(0, 10)}</div>
      <Link to={`/order/${order._id}`}>
        <button className="hover:text-red-500">
          <i className="fa-solid fa-up-right-from-square "></i>
        </button>
      </Link>
    </div>
  );
};

export default OrderCard;
