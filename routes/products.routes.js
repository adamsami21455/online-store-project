const router = require("express").Router()
const Product = require('../models/Product')

// Create routes

router.get('/new', (req,res)=>{
    res.render('products/create-product.ejs')
})

router.post('/', async (req,res)=>{
    const {name, price, description} = req.body // Destructuring
    const createdProduct = await Product.create({
        name: name,
        price: price,
        description: description
    })
    res.redirect('/products')
})

module.exports = router;
