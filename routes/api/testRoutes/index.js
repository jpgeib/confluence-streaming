const router = require("express").Router();
const { test } = require("../../../controllers/testController");

router.get("/", test);

module.exports = router;