const router = require("express").Router()
const Product = require('../models/Product')
const isSignedIn = require('../middleware/is-signed-in.js')

//  routes

//Read : display all products
router.get('/', async (req,res)=>{
    const products = await Product.find()
    res.render('products/index.ejs', { products })
})


module.exports = router;
