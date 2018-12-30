const router = require("express").Router();
const controller = require("../../controllers/controller");

console.log("route api loaded")
// Matches with "/api/user"
router.route("/")
  .get(controller.findAll)
  .post(controller.create);

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(controller.findOne)
  .put(controller.update);
  
module.exports = router;
