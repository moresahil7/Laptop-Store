const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');
const product = require("../models/product");

exports.getProductById = (req, res, next, id) =>{
    Product.fingById(id)
    .populate("category")
    .exec((err,product) =>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        req.product = product;
        next();

    });
};

exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error:"Problem with Image"

            });
        }

        //destructure the fields
        const {name, description,price,category,stock} = fields;

        if(
            !name||
            !description||
            !price||
            !category||
            !stock
        )
        {
            return res.status(400).json({
                error:"All fields are mandatory"
            });
        }


        
        let product = new Product(fields);


        //handling files
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size must be less than 3 MB"
                });

            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
          }
          //console.log(product);

          //save to DB
          product.save((err,product)=>{
              if(err){
                  console.log(err)
                  res.status(400).json({
                      error: "Saving Cars in DB failed"
                  });
              }
             //console.log(product);
              res.json(product);

          });


    });


};


exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
};




// middleware
exports.photo = (req,res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

//delete controllers
exports.deleteProduct = (req , res) => {
    let product = req.product;
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error:"Unable to delete the Product"
            });
        }
        res.json({
            message:"Deleted the product successfully"
        });
    });
  
};




//update controllers
exports.updateProduct = (req , res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error:"Problem with Image"

            });
        }

    
       


        //updation code
        let product = req.product;
        product=_.extend(product, fields)


        //handling files
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file size must be less than 3 MB"
                });

            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
          }
          //console.log(product);

          //save to DB
          product.save((err,product)=>{
              if(err){
                  console.log(err)
                  res.status(400).json({
                      error: "Failed to update the product"
                  });
              }
             //console.log(product);
              res.json(product);

          });


    });


};


exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit)  : 8
    let sortBy = req.query.sortBy ? req.query.sortBy  : "id";
    


    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products)=>{
        if(err){
            return res.status(400).json({
            error:"Products are not available"
        })
        }
        res.json(products);
    });

};


exports.getAllUniqueCategories = (req,res) =>{
    Product.distinct("category", {}, (err,category)=>{
        if(err){
            return res.status(400).json({
                error:"No categories found"
            })
        }
        res.json(category);

    });
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod =>{
        return{
            updateOne: {
                filter:{_id: prod._id},
                update: { $inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations, {} ,(err, products)=>{
        if (err){
            res.status(400).json({
                error:"Bulk Operations failed"
            })
        }
        next();
    })

}