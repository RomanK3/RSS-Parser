import mongoose from "mongoose";

export async function initDB(uri, options) {
  const defaults = { useNewUrlParser: true };
  mongoose.connect(`${uri}`, { ...defaults, ...options });
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
