const router = require("express").Router()
const Product = require('../models/Product')
const isSignedIn = require('../middleware/is-signed-in.js')

// Create routes

//Read : display all products
router.get('/', async (req,res)=>{
    const products = await Product.find()
    res.render('products/index.ejs', { products })
})


// Create : display form to create a new product
router.post('/', isSignedIn, async (req,res)=>{
    const {name, brand, category, price, description, image} = req.body

    await Product.create({
        name,
        brand,
        category,
        price,
        description,
        image,
        user: req.user._id
    })
    res.redirect('/products')
})

// Read : display a single product
router.get('/:id', async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.send('Product not found')
    }

    res.render('products/show.ejs', { product })
})
    
module.exports = router;
