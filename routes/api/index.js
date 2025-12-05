const router = require("express").Router();
const authRoutes = require("./authRoutes");
const testRoutes = require("./testRoutes");

router.use("/auth", authRoutes);
router.use("/test", testRoutes);

module.exports = router;