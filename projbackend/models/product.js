const mongoose = require("mongoose");
const{ObjectID} = mongoose.Schema;
const productSchema = new mongoose.Schema({ 
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
      },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1000
    },
    prizes: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: ObjectID,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,

    },
    photo: {
        data: Buffer,
        contentType: String,

    }
},
{ timestamps: true}
);
module.exports = mongoose.model("Product", productSchema);