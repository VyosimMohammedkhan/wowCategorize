const express = require('express');
const router = express.Router();
const wowCatService = require('../services/WowCatService');


router.post('/', async function(req, res, next) {
    console.log("call function properly");
    const url=req.body.url;
    console.log(url);
    try {
       const dataArray=await wowCatService(url);
        res.json(dataArray);
        res.status(200);
    } catch (err) {
      console.error(`Error fetching data`, err.message);
      next(err);
    }
  });

module.exports = router;