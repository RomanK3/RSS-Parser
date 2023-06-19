import React from "react";

const Posts = ({
  posts,
  totalPosts,
  currentPage,
  setCurrentPage,
  handleInputChange,
  updatePost,
  deletePost,
  exitEditMode,
  editMode,
  enterEditMode,
}) => {
  const postsPerPage = 10;
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return date.toLocaleString(undefined, options);
  };

  return (
    <div className="Posts">
      <h2>Posts</h2>
      <div className="Posts-block">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            {editMode[post._id] ? (
              <div className="edit">
                <div className="edit-block">
                  <p>
                    Title:
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) =>
                        handleInputChange(post._id, "title", e.target.value)
                      }
                    />
                  </p>
                  <p>
                    Creator:
                    <input
                      type="text"
                      value={post.creator}
                      onChange={(e) =>
                        handleInputChange(post._id, "creator", e.target.value)
                      }
                    />
                  </p>
                  <p>
                    {" "}
                    Link on post:
                    <input
                      type="text"
                      value={post.link}
                      onChange={(e) =>
                        handleInputChange(post._id, "link", e.target.value)
                      }
                    />
                  </p>
                  <p>
                    {" "}
                    Image URL:
                    <input
                      type="text"
                      value={post.content}
                      onChange={(e) =>
                        handleInputChange(post._id, "content", e.target.value)
                      }
                    />
                  </p>
                  <p>
                    {" "}
                    Publication Date:
                    <input
                      type="date"
                      value={new Date(post.publicationDate).toLocaleDateString(
                        "en-CA"
                      )}
                      onChange={(e) =>
                        handleInputChange(
                          post._id,
                          "publicationDate",
                          e.target.value
                        )
                      }
                    />
                  </p>
                  <div className="post-edit-buttons">
                    <button onClick={() => updatePost(post._id)}>Save</button>
                    <button onClick={() => exitEditMode(post._id)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <img src={post.content} alt={post.title} />
                <div className="post-end">
                  <div className="post-desc">
                    <a href={post.link}>{post.title}</a>
                    <p className="post-desc-author">Author: {post.creator}</p>
                    <p className="publicationDate">
                      {formatDateTime(post.publicationDate)}
                    </p>
                  </div>
                  <div className="post-buttons">
                    <button onClick={() => deletePost(post._id)}>Delete</button>
                    <button onClick={() => enterEditMode(post._id)}>
                      Edit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <div>
          {currentPage > 1 && (
            <button onClick={goToPreviousPage}>Previous</button>
          )}
          {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}>
                {index + 1}
              </button>
            )
          )}
          {currentPage < Math.ceil(totalPosts / postsPerPage) && (
            <button onClick={goToNextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
