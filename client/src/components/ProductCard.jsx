import { react, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useAppStore } from "../store";
import { motion } from "framer-motion";

import { stagger, animate } from "motion";
import { toast } from "sonner";

export default function ProductCard(product) {
  const { cart, setCart } = useAppStore();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    cart.map((item) => {
      if (item.id === product.product._id) setAdded(true);
    });
  }, [cart]);
  const handleCartButton = () => {
    if (added) {
      handleRemove();
      setAdded(false);
      return;
    } else {
      handleAddToCart();
      setAdded(true);
      return;
    }
  };

  const handleRemove = (id = product.product._id) => {
    const updatedCart = cart.filter((i) => i.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    toast.success("Removed from Cart");
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.product._id,
      name: product.product.name,
      price: product.product.price,
      image: product.product.images[0].url,
      quantity: 1,
    };
    const curCartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    let match = false;
    curCartItems.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity = cartItem.quantity;
        match = true;
      }
    });
    if (!match) {
      curCartItems.push(cartItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(curCartItems));
    setCart(curCartItems);
    toast.success("Added to Cart");
  };

  return (
    <div className=" shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.9,
          scale: { type: "spring", visualDuration: 0.9, bounce: 0.4 },
        }}
      >
        <Card sx={{ maxWidth: 300, minHeight: 350 }} className="cursor-default">
          <Link
            to={`/product/${product.product._id} `}
            className="cursor-pointer"
          >
            <CardMedia
              component="img"
              height="594"
              image={product.product.images[0].url}
              alt="Paella dish"
            />
            <div className="p-1">
              <h1 className=" m-1 text-xl font-semibold">
                {product.product.name}
              </h1>
              <div className="flex items-center">
                <Rating
                  precision={0.1}
                  value={product.product.rating}
                  readOnly
                />
                <p className="m-1 ms-3">
                  ({product.product.numberOfReviews} Reviews)
                </p>
              </div>
              <p className="text-red-500 m-1 font-semibold">
                ₹{product.product.price}
              </p>
            </div>
          </Link>
          <span className=" m-4 cursor-pointer" onClick={handleCartButton}>
            {added ? (
              <FavoriteIcon className="text-red-600 scale-150 " />
            ) : (
              <FavoriteBorderIcon className="scale-150 " />
            )}
          </span>
        </Card>
      </motion.div>
    </div>
  );
}
