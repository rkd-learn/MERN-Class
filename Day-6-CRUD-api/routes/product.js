const express = require("express");
const router = express.Router()

// get list of products
router.get("/",(req,res)=>{
    res.send("Listing products")
})

router.post("/",(req,res)=>{
    // Business logic

    res.send("created")
})



module.exports = router;