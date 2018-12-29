const router = require("express").Router();
const userRoutes = require("./users");
console.log("route api index loaded");
// Vehicle routes
router.use("/user", userRoutes);

module.exports = router;
