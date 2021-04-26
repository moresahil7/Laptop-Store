const express = require("express");

const app = express();
const port = 8000;
const admin = (req, res) => {
  return res.send('Admin Dashboard..........')
};
const isAdmin = (req, res, next) => {
  console.log('isAdmin is running....')
  next();
};
const isLoggedIn = (req, res, next) => {
  console.log('is Logged in....')
  next();
};

app.get('/admin',isLoggedIn, isAdmin, admin);





  app.get('/signup',(req,res)=>{
    return res.send('You are visiting login route....')});
  app.get('/signin',(req,res)=>{
    return res.send('You are ready to sign in....')});
  app.get('/signout',(req,res)=>{
    return res.send('You are signed out....')});
  app.get('/',(req,res)=>{
    return res.send('Home Page....')});
  app.get("/admin", (req,res)=> {
    return res.send('This is admin....')
  });
  app.listen(port, () => 
  {console.log("Server is up and running....")});

