// const user = require("../models/user");
const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req,res,next,id) =>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in Database"
            });

        }
        req.profile = user;
        next();
    });

};

exports.getUser = (req, res) =>{

    //TODO: get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    // req.profile.createdAt = undefined;
    // req.profile.updatedAt = undefined;
    // req.profile.__v = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {
            _id : req.profile._id
        },
        {
            $set: req.body
        },
        {new: true,useFindandModify:false},
        (err, user) =>{
            if(err){
                return res.status(403).json({
                    error:"You are unauthorized person"
                })
            }
           user.salt = undefined;
           user.encry_password = undefined;
            res.json(user);

        }

    );
}; 

exports.userPurchasedlist = (req,res) =>{
   Order.find({user: req.profile._id})
   .populate("user","_id name")
   .exec((err,order)=> {
       if(err){
           return res.status(400).json({
               error:"Order not found here"
           });
       }
       return res.json(order)
   });

};
exports.pushOrderInPurchasedList = (req, res,next) =>{
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id:product._id,
            name: product.name,
            description: product.descripton,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });
    });

    //Store this in DB
    User.findOneAndUpdate({
        _id:req.profile._id
    },
    {$push: {purchases: purchases}},
    {new: true},
    (err,purchases) =>{
        if(err){
            return res.status(400).json({
                error:"unable to save purchase list"
            })
        }
          next();
    }
    
    );
};    
  
