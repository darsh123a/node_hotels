const express = require("express");
const menu = require("./../models/menu");
const router = express.Router();
router.get("/menu", async (req, res) => {
  try {
    const data = await menu.find();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});
//("change kr rha hu git ko dekhne ke liye");
module.exports = router;
// comment added for check
