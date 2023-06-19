import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../const";

const Search = ({ setPosts, fetchPosts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/posts/search?query=${searchQuery}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleResetSearch = async () => {
    setSearchQuery("");
    fetchPosts();
  };

  return (
    <div className="search">
      <h2>Search</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
        className="search-bar"
      />
      <div className="search-buttons">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleResetSearch}>Reset</button>
      </div>
    </div>
  );
};

export default Search;
