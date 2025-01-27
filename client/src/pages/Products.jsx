import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCT_ROUTE } from "../utils/constants";
import { useAppStore } from "../store";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Slider from "@mui/material/Slider";
import Loader from "../components/Loader";
import ProductSkleton from "../components/skeleton/ProductSkleton";

const Products = () => {
  const { keyword } = useParams();
  const { product, setProduct } = useAppStore();
  const [loading, setloading] = useState(true);
  const [apply, setApply] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage, setResultPerPage] = useState(8);
  const [filteredCount, setFilteredCount] = useState(0);
  const [rating, setrating] = useState([0, 5]);
  const minDistance1 = 1;
  const minDistance2 = 1000;
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setrating([Math.min(newValue[0], rating[1] - minDistance1), rating[1]]);
    } else {
      setrating([rating[0], Math.max(newValue[1], rating[0] + minDistance1)]);
    }
  };

  const [price, setprice] = useState([0, 50000]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance2) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 50000 - minDistance2);
        setprice([clamped, clamped + minDistance2]);
      } else {
        const clamped = Math.max(newValue[1], minDistance2);
        setprice([clamped - minDistance2, clamped]);
      }
    } else {
      setprice(newValue);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        let route = GET_ALL_PRODUCT_ROUTE;
        setloading(true);
        if (keyword) {
          route = `${GET_ALL_PRODUCT_ROUTE}/?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating[0]}&rating[lte]=${rating[1]}`;
        } else {
          route = `${GET_ALL_PRODUCT_ROUTE}/?page=${currentPage}&price[gt]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating[0]}&rating[lte]=${rating[1]}`;
        }

        const res = await axios.get(route);
        setProduct(res.data.products);
        setResultPerPage(res.data.resultPerPage);
        setFilteredCount(res.data.filteredProductsCount);
      } catch (error) {
        console.log({ error });
      } finally {
        setloading(false);
        setApply(false);
      }
    };

    getProducts();
  }, [keyword, currentPage, apply, setProduct]);
  const totalPages = Math.ceil(filteredCount / resultPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleApply = () => {
    setApply(true);
  };
  if (loading) {
    return (
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
    );
  }

  return (
    <div>
      <div className="flex">
        {/* <div className=" m-2 border relative w-[30%] h-[80vh]">
          <div className="m-3">
            <p>Price</p>
            <Slider
              min={0}
              max={50000}
              step={100}
              getAriaLabel={() => "Minimum distance"}
              value={price}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </div>
          <div className="m-3">
            <p>Categories</p>
            <select>
              <option value="Apple">Apple</option>
              <option value="Apple">Laptop</option>
              <option value="Apple">Electronics</option>
              <option value="Apple">Food</option>
              <option value="Apple">Home</option>
              <option value="Apple">Product</option>
              <option value="Apple">User</option>
            </select>
          </div>
          <div className="m-3">
            <p>Rating</p>
            <Slider
              min={0}
              max={5}
              getAriaLabel={() => "Minimum distance"}
              value={rating}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </div>
          <div className="absolute flex justify-center items-center bottom-3 left-1/2 transform -translate-x-1/2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div> */}
        <div className="grid m-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 justify-center">
          {product.length === 0 && (
            <div className="mt-7 text-3xl">No Product Found</div>
          )}
          {product &&
            product.map((p) => (
              <div className="m-3 cursor-pointer hover:translate-y-[-10px] transition-all duration-300 hover:scale-105   ">
                <ProductCard key={p._id} product={p} />
              </div>
            ))}
          <div></div>
        </div>
      </div>

      {filteredCount > resultPerPage && (
        <div className=" m-10">
          <Pagination
            className="flex justify-center mt-4"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            siblingCount={1}
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </div>
  );
};

export default Products;
