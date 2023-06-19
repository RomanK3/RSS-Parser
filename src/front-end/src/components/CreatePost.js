import axios from "axios";

import React, { useState } from "react";
import { useAuth } from "./useAuth";
import { API_URL } from "../const";

const CreatePost = () => {
  const auth = useAuth();

  const [newPost, setNewPost] = useState({
    title: "",
    link: "",
    publicationDate: "",
    creator: "",
    content: "",
  });

  const createPost = async () => {
    try {
      const postData = {
        creator: newPost.creator,
        title: newPost.title,
        link: newPost.link,
        publicationDate: newPost.publicationDate,
        content: newPost.content,
      };

      await axios.post(`${API_URL}/api/posts`, postData);
      setNewPost({
        title: "",
        link: "",
        publicationDate: "",
        creator: "",
        content: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      {auth.token && (
        <div className="create-post">
          <div className="create-post-block">
            <h2>Create Post</h2>
            <div>
              <label>Creator:</label>
              <input
                type="text"
                value={newPost.creator}
                onChange={(e) =>
                  setNewPost({ ...newPost, creator: e.target.value })
                }
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
            </div>
            <div>
              <label>Link on Post:</label>
              <input
                type="text"
                value={newPost.link}
                onChange={(e) =>
                  setNewPost({ ...newPost, link: e.target.value })
                }
              />
            </div>
            <div>
              <label>Image URL:</label>
              <input
                type="text"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />
            </div>
            <div>
              <label>Publication Date:</label>
              <input
                type="date"
                value={newPost.publicationDate}
                onChange={(e) =>
                  setNewPost({ ...newPost, publicationDate: e.target.value })
                }
              />
            </div>
            <div className="create-post-btn-block">
              <button onClick={createPost}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
