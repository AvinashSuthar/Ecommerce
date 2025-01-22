import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import axios from "axios";
import { GET_MY_ORDER_ROUTES } from "../utils/constants";
import Loader from "../components/Loader";
import OrderCard from "../components/OrderCard";

const Order = () => {
  const { order, setOrder } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(GET_MY_ORDER_ROUTES, {
          withCredentials: true,
        });
        if (res.data.success) {
          setOrder(res.data.orders);
        }
        setLoading(false);
      } catch (error) {
        setOrder([]);
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!order.length) {
      getAllOrders();
    }
  }, [order]);
  if (loading) {
    return <Loader show={loading} />;
  }
  return (
    <div>
      <h1>
        {order.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </h1>
    </div>
  );
};

export default Order;
