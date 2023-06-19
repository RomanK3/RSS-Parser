import React from "react";

const Sort = ({ sortOrder, handleSortOrderChange }) => {
  return (
    <div className="sort">
      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="desc">Latest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
};

export default Sort;
