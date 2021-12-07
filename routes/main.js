const express = require("express");
const router = express.Router();
const homeController = require("../controllers/index");
const apicache = require("apicache")

// initiliaze cache
let cache = apicache.middleware

router.get("/api/ping", cache('5 minutes'), homeController.getPing);
router.get("/api/posts", cache('5 minutes'), homeController.getPosts);

module.exports = router;