const express = require("express");
const router = express.Router();
const homeController = require("../controllers/index");

router.get("/", homeController.getIndex);
router.get("/api/ping", homeController.getPing);
router.get("/api/posts", homeController.getPosts);

module.exports = router;
