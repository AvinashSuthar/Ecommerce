import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import CartCard from "../components/CartCard";
import { useNavigate } from "react-router-dom";
import { animate, stagger } from "framer-motion";


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
  useEffect(() => {
    animate([["section", { x: [-1000, 0] }, { delay: stagger(0.2) }]]);
  },[]);

  return (
    <div>
      <div className="list-none">
        {cart.length ? (
          <div>
            {cart.map((c) => (
              <CartCard key={c.id} item={c} />
            ))}
            <div>Gross Amount : {totalPrice}</div>
          </div>
        ) : (
          <div>No Products</div>
        )}
      </div>
      <div>
        <button onClick={() => navigate("/shipping")}>CheckOut</button>
      </div>
    </div>
  );
};

export default Cart;
