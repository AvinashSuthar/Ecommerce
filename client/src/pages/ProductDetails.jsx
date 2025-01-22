import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GET_PRODUCT_DETAIL_ROUTE } from "../utils/constants";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@mui/material";
import ReviewCard from "../components/ReviewCard";
import MetaData from "../MetaData";
import Loader from "../components/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const {setCart , cart} = useAppStore();
  const { curProduct, setCurProduct } = useAppStore();
  const [loading, setloading] = useState(true);
  const [addToCart, setAddToCart] = useState(1);

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
  }, []);
  const handleAddToCart = () => {
    const cartItem = {
      id: curProduct._id,
      name: curProduct.name,
      price : curProduct.price,
      image : curProduct.images[0].url,
      quantity: addToCart,
    };
    const curCartItems = localStorage.getItem("cartItems") ?  JSON.parse(localStorage.getItem("cartItems")) : [];
    let match = false;
    curCartItems.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity = cartItem.quantity
        match = true;
      }
    });
    if(!match){
      curCartItems.push(cartItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(curCartItems));
    setCart(curCartItems);
  };

  if (loading) {
    return <Loader show={loading} />;
  }

  return (
    <>
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
            <div className="ms-3">
              <button
                type="button"
                className="text-white  bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hover:bg-red-700 transition-all divide-purple-300"
              >
                Submit A Review
              </button>
            </div>
          </div>
        </div>
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
    </>
  );
};

export default ProductDetails;
