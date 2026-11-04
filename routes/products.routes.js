const router = require("express").Router()
const Product = require('../models/Product')
const isSignedIn = require('../middleware/is-signed-in.js')



// Create : display form to create a new product
router.get('/new', isSignedIn, (req,res)=>{
    res.render('products/create-new-product.ejs')
})

router.post('/', isSignedIn, async (req,res)=>{
    const {name, brand, category, price, description, image} = req.body

    await Product.create({
        name: name,
        brand: brand,
        category: category,
        price: price,
        description: description,
        image: image,
        user: req.session.user._id
    })
    res.redirect('/products')
})

// Read : display a single product
router.get('/:productId', async (req,res)=>{
    const product = await Product.findById(req.params.productId)
    if (!product) {
        return res.send('Product not found')
    }

    res.render('products/show.ejs', { product })
})

router.get('/', async (req,res)=>{
    const allProducts = await Product.find().populate('user')
    res.render('products/index.ejs', { products: allProducts })
})
    
module.exports = router;
