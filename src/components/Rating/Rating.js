import { useState } from "react";
import "./Rating.scss";

const rateArr = [1, 2, 3, 4, 5];

const Rating = () => {
  const [rate, setRate] = useState(0);
  return (
    <div className="app-rating">
      <label className="app-rating-label">
        Please Rate information quality
      </label>
      <div className="app-rating-content">
        {rateArr.map((el, idx) => {
          return (
            <span
              onClick={() => setRate(idx + 1)}
              className="app-rating-content-item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={idx < rate ? "#F8CA12" : ""}
                />
              </svg>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
