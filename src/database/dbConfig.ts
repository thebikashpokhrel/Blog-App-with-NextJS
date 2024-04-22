import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState) {
      console.log("already connected");
      return;
    }
    await mongoose.connect(process.env.DB_CONNECTION_STRING!);
    mongoose.connection.on("connected", () => {
      console.log("Connected to database successfully");
    });

    mongoose.connection.on("error", (error) => {
      console.log("Could not connect to database");
      throw error;
    });
  } catch (error: unknown) {
    console.log("Error connecting with the database");
    throw error;
  }
};
