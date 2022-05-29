import mongoose from "mongoose";

export const createConnection = () => {
  try {
    mongoose.connect('mongodb://localhost/orders_db', { 
      useNewUrlParser: true,
      autoIndex: true
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.log(err)
  }
}