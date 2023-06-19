import Parser from "rss-parser";
import { Post } from "./models/post.model.js";
import { settings } from "./config/settings.js";
import jwt from "jsonwebtoken";

export const fetchAndStorePosts = async (FEED_URL, page = 1, limit = 60) => {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(FEED_URL);

    const fetchedLinks = await Post.find().distinct("link");

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    for (let i = startIndex; i < Math.min(endIndex, feed.items.length); i++) {
      const item = feed.items[i];
      const linkExists = fetchedLinks.includes(item.link);

      const srcRegex = /<img[^>]+src="([^">]+)"/;
      const matches = item.content.match(srcRegex);

      const srcUrl = matches ? matches[1] : "";

      if (linkExists) {
        continue;
      }

      const newPost = new Post({
        creator: item.creator,
        title: item.title,
        link: item.link,
        publicationDate: item.pubDate,
        content: srcUrl,
      });

      await newPost.save();
    }
  } catch (error) {
    console.error("Error fetching and storing posts:", error);
  }
};

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, settings.jwtSecret, { expiresIn: '72h' });

  return token;
};