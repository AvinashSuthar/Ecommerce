import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import Loader from "./Loader";
import axios from "axios";
import { animate, stagger } from "framer-motion";

import { GET_PRODUCT_DETAIL_ROUTE } from "../utils/constants";
import Count from "../animations/Count";

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
    <section className="border m-3 rounded p-2 min-h-[200px] flex text-2xl justify-evenly items-center">
      <div className="items-center flex flex-col">
        <p>{item.name}</p>
        <button
          onClick={() => handleRemove(item.id)}
          className="text-sm text-white border p-1 px-2 rounded bg-black"
        >
          Remove From Cart
        </button>
      </div>
      <div className="ms-3">
        <button
          type="button"
          onClick={() => {
            if (addToCart > 1) {
              handleQuantityChange(-1);
            }
          }}
          className="text-white bg-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 hover:bg-red-700 transition-all"
        >
          -
        </button>
        <input
          className="w-[50px] p-2 outline-0"
          type="number"
          readOnly
          value={addToCart}
        />
        <button
          type="button"
          onClick={() => {
            if (curProduct && addToCart < curProduct.stock) {
              handleQuantityChange(1);
            }
          }}
          className="text-white bg-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 hover:bg-red-700 transition-all"
        >
          +
        </button>
      </div>
      <p>
        <Count end={item.price} time={2} />
      </p>
      <Count end={totalPrice} time={2} />

    </section>
  );
};

export default CartCard;
