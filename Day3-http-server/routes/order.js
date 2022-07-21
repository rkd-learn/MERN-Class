const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hello from order");
})

router.get("/cloth", (req, res) => {
  res.send("Your are ordering cloths");
});


module.exports = router;