const router = require("express").Router({ mergeParams: true });
const urlsController = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const usesRouter = require("../uses/uses.router");

// Route to handle urls list and creation
router
  .route("/")
  .get(urlsController.list)
  .post(urlsController.create)
  .all(methodNotAllowed);

// Route to handle individual urls
router
  .route("/:urlId")
  .get(urlsController.read)
  .put(urlsController.update)
  .all(methodNotAllowed);

// Use the uses router for nested routes under a specific url
router.use("/:urlId/uses", [urlsController.urlExists, usesRouter]);

module.exports = router;
