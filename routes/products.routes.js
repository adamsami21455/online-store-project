const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in.js')
const Product = require('../models/Product')
const Review = require('../models/Review.js')




// Create : display form to create a new product
router.get('/new', isSignedIn, (req, res) => {
    res.render('products/create-new-product.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
    const { name, brand, category, price, description, image } = req.body

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

// Read : display a single product and reviews for that product
router.get('/:productId', async (req, res) => {
    const product = await Product.findById(req.params.productId)
    if (!product) {
        return res.send('Product not found')
    }
    const reviews = await Review.find({ product: req.params.productId }).populate('user')

    res.render('products/show.ejs', { product, reviews })

})

router.get('/', async (req, res) => {
    const allProducts = await Product.find().populate('user')
    res.render('products/index.ejs', { products: allProducts })
})

router.get('/:productId/edit', isSignedIn, async (req, res) => {
    const product = await Product.findById(req.params.productId)
    if (!product) {
        return res.send('Product not found')
    }
    res.render('products/edit.ejs', { product })
})

router.put('/:productId', isSignedIn, async (req, res) => {
    const { name, brand, category, price, description, image } = req.body
    const product = await Product.findByIdAndUpdate(req.params.productId, {
        name: name,
        brand: brand,
        category: category,
        price: price,
        description: description,
        image: image
    })

    res.redirect('/products')
})

router.delete('/:productId', isSignedIn, async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId)
    res.redirect('/products')
})

router.post('/:productId/reviews', isSignedIn, async (req, res) => {
    const {rating, comment} = req.body
    await Review.create({ 
        rating: rating,
        comment: comment,
        user: req.session.user._id,
        product: req.params.productId
    })
    res.redirect('/products/' + req.params.productId)
})

router.delete('/:productId/reviews/:reviewId', isSignedIn, async (req, res) => {
    const review = await Review.findById(req.params.reviewId)
    if (!review.user.equals(req.session.user._id)) {
        return res.send('Action not allowed')
    }
    else {
        await Review.findByIdAndDelete(req.params.reviewId)
        res.redirect('/products/' + req.params.productId)
    }
})



module.exports = router;
