import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCT_ROUTE } from "../utils/constants";
import { useAppStore } from "../store";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ProductSkleton from "../components/skeleton/ProductSkleton";
import Welcome from "../components/Welcome";

const Home = ({ setShow, show }) => {
  const { userInfo, product, setProduct, setUserInfo } = useAppStore();

  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setloading(true);
        const route = `${GET_ALL_PRODUCT_ROUTE}`;
        const res = await axios.get(route);
        setProduct(res.data.products); // Replace products
      } catch (error) {
        console.log({ error });
      } finally {
        setloading(false);
      }
    };

    getProducts();
  }, [setProduct]);

  return (
    <div>
      <div>
        <Welcome setShow={setShow} show={show} />
      </div>

      <div className={`${show ? "visible" : "hidden"}`}>
        {loading ? (
          <div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 justify-center m-4">
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
              <ProductSkleton number={8} />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 justify-center m-4">
            {product &&
              product.map((p) => (
                <div
                  key={p._id}
                  className="m-3 cursor-pointer hover:translate-y-[-10px] transition-all duration-300 hover:scale-105   "
                >
                  <ProductCard product={p} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
