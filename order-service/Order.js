import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  userId:{
    type: mongoose.SchemaTypes.ObjectId,
    require: true
  },
  foodId: {
    type: mongoose.SchemaTypes.ObjectId,
    require: true
  },
  initialDate: {
    type: Date,
    require: true
  },
  deliveryDate: {
    type: Date,
    require: false
  }
})

const Order = mongoose.model("order", OrderSchema)

export default Order