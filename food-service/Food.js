import mongoose from "mongoose";

const FoodSchema = mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  }
})

const Food = mongoose.model("food", FoodSchema)

export default Food