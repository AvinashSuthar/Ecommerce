import { Rating } from "@mui/material";
import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="border m-2 p-3 w-full">
      <div>
        <p className="m-1 text-xl">{review.name}</p>
        <div className="m-1 ms-3">
          <Rating precision={0.1} value={review.rating} readOnly />
        </div>
        <p className="m-1 ms-3">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
