import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {
    if (keyword.trim()) {
      let link = `/products/${keyword}`;
      navigate(link);
    } else {
      navigate("/products");
    }
  };

  const inputRef = useRef(null); // Step 1: Create a ref for the input

  useEffect(() => {
    // Step 2: Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); 

  return (
    <div className="bg-slate-100 w-[100vw]  flex  justify-center items-center h-[100vh] p-6 z-50 fixed inset-0 m-auto rounded-lg shadow-lg">
      <button onClick={() => setShow(false)}></button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Products"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="p-2 w-[300px] focus:outline-none  border rounded-s-xl"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-e-xl"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
