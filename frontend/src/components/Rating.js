import React from "react";
import PropTypes from "prop-types";
const Rating = ({ value, text, color }) => {
  return (
    <span>
      {[...Array(5)].map((_, i) => {
        const cls =
          value >= i + 1
            ? "fas fa-star" //full star
            : value >= i + 0.5
            ? "fas fa-star-half-alt" //half star
            : "far fa-star"; //empty star
        return <i key={"Star" + i} style={{ color }} className={cls} />;
      })}
    </span>
  );
};
Rating.defaultProps = {
  color: "gold",
};
//checking the types with proptypes built in React
Rating.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
};
export default Rating;
