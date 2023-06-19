import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Post } from "./models/post.model.js";
import { User } from "./models/user.model.js";
import { settings } from "./config/settings.js";
import { authenticateToken } from "./middleware/authenticateToken.js";
import { authenticateUser } from "./middleware/authenticateUser.js";
import { generateToken } from "./services.js";

const router = express.Router();

router.get("/api/posts", async (req, res) => {
  try {
    const { sort, page = 1, limit } = req.query;
    let sortOrder = 1;

    if (sort === "desc") {
      sortOrder = -1;
    }

    const totalPosts = await Post.countDocuments();

    let posts;
    if (limit) {
      posts = await Post.find()
        .sort({ publicationDate: sortOrder })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    } else {
      posts = await Post.find().sort({ publicationDate: sortOrder });
    }

    res.json({ posts, totalPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// creating a new post
router.post("/api/posts", async (req, res) => {
  try {
    const { title, link, publicationDate, creator, content } =
      req.body;
    const newPost = new Post({
      creator,
      title,
      link,
      content,
      publicationDate: new Date(publicationDate),
    });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

// updating a post
router.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, publicationDate, creator, content } =
      req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        creator,
        title,
        link,
        content,
        publicationDate: new Date(publicationDate),
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
});

// deleting a post
router.delete("/api/posts/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

// searching posts
router.get("/api/posts/search", async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
      ],
    });
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ error: "Error searching posts" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: user._id }, settings.jwtSecret);

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({ message: "User registered successfully", token }); 
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

router.get("/me", authenticateUser, async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const foundUser = await User.findById(user);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const username = foundUser.username;
    res.json({ username });
  } catch (error) {
    console.error("Error retrieving username:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin", authenticateToken, (req, res) => {
  res.json({ message: "Admin accessed successfully" });
});

export default router;
