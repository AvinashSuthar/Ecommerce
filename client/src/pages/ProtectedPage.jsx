import React, { useState } from "react";
import Box from "../components/Box";
import Pagination from "@mui/material/Pagination";
import { blueGrey } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { useAppStore } from "../store";
import axios from "axios";
import { ADD_CATEGORY_ROUTE } from "../utils/constants";

const ProtectedPage = () => {
  const { category, userInfo } = useAppStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(
    userInfo.category
  );
  const itemsPerPage = 6;

  const totalPages = Math.ceil(category.length / itemsPerPage);
  const currentCategories = category.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = async (item) => {
    const isSelected = selectedCategories.includes(item.name);
    const updatedSelectedCategories = isSelected
      ? selectedCategories.filter((name) => name !== item.name)
      : [...selectedCategories, item.name];

    setSelectedCategories(updatedSelectedCategories);

    console.log(updatedSelectedCategories);

    try {
      const res = await axios.post(
        ADD_CATEGORY_ROUTE,
        {
          category: updatedSelectedCategories,
        },
        {
          withCredentials: true,
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl text-center font-semibold">
          Please mark your interests!
        </h1>
        <h3 className="text-sm text-center">We will keep you notified.</h3>
        <hr className="mb-5" />
        <h3 className="mb-5"> My saved interests! </h3>
        {currentCategories.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <p>{item.name}</p>
            <Checkbox
              checked={selectedCategories.includes(item.name)}
              onChange={() => handleCheckboxChange(item)}
              sx={{
                color: blueGrey[900],
                "&.Mui-checked": {
                  color: blueGrey[900],
                },
              }}
            />
          </div>
        ))}
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
    </Box>
  );
};

export default ProtectedPage;
