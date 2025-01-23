import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import Count from "../animations/Count";
import { motion } from "framer-motion";
const Cart = () => {
  const { cart } = useAppStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    cart.map((item) => {
      price += item.quantity * item.price;
    });
    setTotalPrice(price);
  }, [cart]);

  return (
    <div>
      <div className="list-none">
        {cart.length ? (
          <div>
            {cart.map((c) => (
              <CartCard key={c.id} item={c} />
            ))}
            <div className="h-[300px]">

            </div>
            <div className="fixed bottom-0 bg-white border-t-2 flex items-center justify-between w-full px-3 ">
              <div className="m-3 flex justify-center text-2xl items-center">
                <div> Gross Amount :</div>
                <div>
                  <Count end={totalPrice} time={2} />
                </div>
              </div>
              <div className="m-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  whileDrag={{ scale: 0.9, rotate: 50 }}
                >
                  <button
                    className="mt-5 pt-3 p-2 pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
                    onClick={() => navigate("/shipping")}
                  >
                    CHECKOUT
                  </button>
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div>No Products</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
