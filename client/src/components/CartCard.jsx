import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import Loader from "./Loader";
import axios from "axios";
import { animate, stagger } from "framer-motion";

import { GET_PRODUCT_DETAIL_ROUTE } from "../utils/constants";
import Count from "../animations/Count";
import { Link } from "react-router-dom";

const CartCard = ({ item }) => {
  const { cart, setCart } = useAppStore();
  const [addToCart, setAddToCart] = useState(item.quantity); // Initialize with item.quantity
  const [totalPrice, setTotalPrice] = useState(item.price * item.quantity);
  const [curProduct, setCurProduct] = useState(null); // Local state for product details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await axios.get(`${GET_PRODUCT_DETAIL_ROUTE}/${item.id}`);
        setCurProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProductDetail();
  }, [item.id]);

  useEffect(() => {
    // Load the quantity from local storage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedItem = savedCartItems.find((i) => i.id === item.id);
    if (savedItem) {
      setAddToCart(savedItem.quantity); // Set the initial quantity
      setTotalPrice(savedItem.price * savedItem.quantity); // Set the initial total price
    }
  }, [item.id, item.price]);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((i) => i.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const updateCart = (newQuantity) => {
    if (!curProduct) return;

    const cartItem = {
      id: curProduct._id,
      name: curProduct.name,
      price: curProduct.price,
      rating: curProduct.rating,
      quantity: newQuantity,
    };

    const curCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = curCartItems.map((i) =>
      i.id === cartItem.id ? { ...i, quantity: cartItem.quantity } : i
    );

    if (!updatedCartItems.find((i) => i.id === cartItem.id)) {
      updatedCartItems.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = addToCart + change;
    setAddToCart(newQuantity);
    setTotalPrice(item.price * newQuantity);
    updateCart(newQuantity);
  };

  if (loading) return <Loader show={loading} />;

  return (
    <div
      className="shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] m-3 rounded p-2 min-h-[200px]    
        flex flex-col lg:flex-row md:flex-row text-2xl justify-evenly items-center hover:scale-105 transition-all duration-300"
    >
      <div>
        <div className="">
          <Link to={"/product/" + item.id}>
            <img
              width={"100px"}
              height={"100px"}
              src={`${item.image}`}
              alt=""
            />
          </Link>
          <p>{item.name}</p>
          <button
            onClick={() => handleRemove(item.id)}
            className="text-sm w-[100px] text-white border p-1 px-2 rounded bg-black"
          >
            <i className="fa-solid fa-trash"></i> Remove
          </button>
        </div>
      </div>
      <div className="flex">
        <Count end={item.price} time={2} />
        <div className="text-orange-500"> &nbsp; X &nbsp; </div>
        <div className="text-orange-500">{item.quantity}</div>
      </div>
      <div className="flex">
        <div className="text-orange-500"> &nbsp; = &nbsp; </div>

        <Count end={totalPrice} time={2} />
      </div>
    </div>
  );
};

export default CartCard;
