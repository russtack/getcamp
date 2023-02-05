const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const asyncHandler = require("express-async-handler");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.route("/").get(asyncHandler(campgrounds.index)).post(
  isLoggedIn,
  upload.array("image"),
  validateCampground,

  asyncHandler(campgrounds.createCampground)
);

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    asyncHandler(campgrounds.updateCampground)
  )
  .get(asyncHandler(campgrounds.showCampground))
  .delete(isLoggedIn, isAuthor, asyncHandler(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  asyncHandler(campgrounds.renderEditForm)
);

module.exports = router;
