import mongoose from "mongoose";

export const createConnection = () => {
  try {
    mongoose.connect('mongodb://localhost/users_db', { 
      useNewUrlParser: true,
      autoIndex: true
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.log(err)
  }
}