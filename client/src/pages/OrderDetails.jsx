import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_SINGLE_ORDER_ROUTES } from "../utils/constants";
import Loader from "../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(undefined);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSingleOrder = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${GET_SINGLE_ORDER_ROUTES}/${id}`, {
          withCredentials: true,
        });
        if (res.status) {
          setOrder(res.data.order);
          setLoading(false);
        }
      } catch (error) {
        setOrder(undefined);
        setLoading(false);
      } finally {
        setLoading(false);
      }
      getSingleOrder();
    };
  }, [order]);

  if (loading) {
    return <Loader show={loading} />;
  }

  return <div>{id}</div>;
};

export default OrderDetails;
