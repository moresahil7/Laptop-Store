const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require('fs');

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