import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../const";
import Search from "./Search";
import Sort from "./Sort";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortOrder, setSortOrder] = useState("desc");
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    fetchPosts(currentPage);
  }, [sortOrder, currentPage]);

  const fetchPosts = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/posts?sort=${sortOrder}&page=${page}&limit=${limit}`
      );
      setPosts(response.data.posts);
      setTotalPosts(response.data.totalPosts);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const updatePost = async (postId) => {
    try {
      const postToUpdate = posts.find((post) => post._id === postId);
      if (!postToUpdate) {
        console.error("Post not found");
        return;
      }

      const { title, creator, link, publicationDate, content } = postToUpdate;

      if (!isValidDate(publicationDate)) {
        console.error("Invalid publication date");
        return;
      }

      const updatedPost = {
        title,
        creator,
        link,
        publicationDate,
        content,
      };

      await axios.put(`${API_URL}/api/posts/${postId}`, updatedPost);
      fetchPosts();
      exitEditMode(postId);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleInputChange = (postId, field, value) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      const postIndex = updatedPosts.findIndex((post) => post._id === postId);
      updatedPosts[postIndex][field] = value;
      return updatedPosts;
    });
  };

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  };

  const enterEditMode = (postId) => {
    setEditMode({ ...editMode, [postId]: true });
  };

  const exitEditMode = (postId) => {
    setEditMode({ ...editMode, [postId]: false });
  };

  return (
    <div className="Home">
      <div className="Home-block">
        <Search setPosts={setPosts} fetchPosts={fetchPosts} />

        <Sort
          sortOrder={sortOrder}
          handleSortOrderChange={handleSortOrderChange}
        />

        <Posts
          posts={posts}
          setPosts={setPosts}
          totalPosts={totalPosts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleInputChange={handleInputChange}
          updatePost={updatePost}
          deletePost={deletePost}
          exitEditMode={exitEditMode}
          enterEditMode={enterEditMode}
          editMode={editMode}
        />
      </div>
    </div>
  );
};

export default Home;
