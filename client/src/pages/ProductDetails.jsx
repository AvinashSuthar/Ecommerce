import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CREATE_REVIEW_ROUTE,
  GET_PRODUCT_DETAIL_ROUTE,
} from "../utils/constants";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import ReviewCard from "../components/ReviewCard";
import ProductDetailsSkeleton from "../components/skeleton/ProductDetailsSkeleton";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { setCart, cart } = useAppStore();
  const { id } = useParams();
  const { curProduct, setCurProduct } = useAppStore();
  const [loading, setloading] = useState(true);
  const [addToCart, setAddToCart] = useState(1);
  const [refetch, setRefetch] = useState(true);

  const [review, setReview] = useState({
    productId: id,
    rating: "",
    comment: "",
  });

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const res = await axios.get(`${GET_PRODUCT_DETAIL_ROUTE}/${id}`);
        setCurProduct(res.data.product);
      } catch (error) {
        console.log(error);
        setloading(false);
        setCurProduct(undefined);
      } finally {
        setloading(false);
      }
    };
    getProductDetail();
    setReview({
      productId: id,
      rating: "",
      comment: "",
    });
  }, [refetch]);

  const validateReview = () => {
    if (review.comment.length < 1) {
      toast.error("Enter Review Comment");
      return false;
    }
    return true;
  };
  const handleSubmitReview = async () => {
    if (validateReview()) {
      try {
        console.log(review);
        const res = await axios.put(CREATE_REVIEW_ROUTE, review, {
          withCredentials: true,
        });
        if (res.data) {
          console.log(res.data);
          toast.success("Review Created successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setRefetch(!refetch);
      }
    }
  };
  const handleAddToCart = () => {
    const cartItem = {
      id: curProduct._id,
      name: curProduct.name,
      price: curProduct.price,
      image: curProduct.images[0].url,
      quantity: addToCart,
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

  if (loading) {
    return (
      <div>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 1000 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.1 },
      }}
    >
      <div className="lg:flex sm:block">
        <div className="lg:w-[50%]  m-1">
          <Carousel>
            {curProduct.images &&
              curProduct.images.map((item, i) => (
                <div className="p-3" key={i}>
                  <img className="rounded-lg" src={item.url} />
                </div>
              ))}
          </Carousel>
        </div>
        <div className=" flex  items-center lg:w-[50%] m-1 p-3 ">
          <div className=" m-3  ">
            <div className="p-1">
              <h1 className=" p-3 text-3xl font-semibold">{curProduct.name}</h1>{" "}
              <hr />
              <div className="flex p-3 items-center">
                <Rating precision={0.1} value={curProduct.rating} readOnly />
                <p className="m-1 ms-3">
                  ({curProduct.numberOfReviews} Reviews)
                </p>
              </div>
              <hr />
              <p className="text-red-500 text-2xl p-3 font-semibold">
                ₹{curProduct.price}
              </p>
              <hr />
              <div className="p-3">
                <p className="text-xl text-gray-900 ">Description : </p>
                <p className="text-gray-600"> {curProduct.description} </p>
              </div>
              <div
                className={`ms-3 mb-4 text-xl ${
                  curProduct.stock > 0 ? "text-green-600" : "text-red-700"
                }`}
              >
                Stock : {curProduct.stock}
              </div>
              <div className="ms-3">
                <button
                  type="button"
                  onClick={() => {
                    if (addToCart > 1) setAddToCart(addToCart - 1);
                  }}
                  className="text-white  bg-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 hover:bg-red-700 transition-all divide-purple-300"
                >
                  -
                </button>
                <input
                  className="w-[50px] p-2 outline-0"
                  type="number"
                  readOnly
                  value={addToCart}
                  name=""
                  id=""
                />
                <button
                  type="button"
                  onClick={() => {
                    if (addToCart < curProduct.stock)
                      setAddToCart(addToCart + 1);
                  }}
                  className="text-white  bg-red-500 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2 hover:bg-red-700 transition-all divide-purple-300"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="text-white  bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-red-700 transition-all divide-purple-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 p-2">
        <div>
          <Rating
            precision={0.1}
            value={review.rating}
            onChange={(e) => {
              setReview({
                ...review,
                rating: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            value={review.comment}
            onChange={(e) =>
              setReview({
                ...review,
                comment: e.target.value,
              })
            }
            placeholder="Write your review"
            className="border-none focus:ring-0 focus:outline-none hover:border-none"
            style={{ width: "100%" }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          whileDrag={{ scale: 0.9, rotate: 50 }}
        >
          <button
            className="mt-5 p-1 px-3 text-sm mb-5 bg-red-500 text-white hover:bg-red-700 rounded transition-all duration-300"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </motion.button>
      </div>

      <div className="border-t-2 pt-2">
        <p className="text-3xl font-semibold text-center">Reviews</p>
        {curProduct.reviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
            {curProduct.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-3xl text-center">No Reviews</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ReviewForm = ({ setReview, review }) => {
  return <div>helo</div>;
};

export default ProductDetails;
