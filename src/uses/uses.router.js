const router = require("express").Router({ mergeParams: true });
const usesController = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Route to handle uses list
router.route("/").get(usesController.list).all(methodNotAllowed);

// Route to handle individual use read and delete
router
  .route("/:useId")
  .get(usesController.read)
  .delete(usesController.delete)
  .all(methodNotAllowed);

module.exports = router;
