const express = require("express");
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try{
        console.log(global.food_item);
        res.send([global.foodItem, global.foodCategory]);
    }catch{
        console.error(error.message);
        res.send("Server Error!");
    }
})

module.exports = router;