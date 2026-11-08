const router = require("express").Router()
const isAdmin = require("../middleware/is-admin.js")
const Product = require ("../models/Product.js")

// admin dashboard
router.get("/", isAdmin, async (req,res) => {
    const products = await Product.find()

    res.render("admin/dashboard.ejs", {
        products: products
    })
})

module.exports = router