const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncHandler = require("express-async-handler");
const reviews = require("../controllers/reviews");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

router.post(
  "/",
  validateReview,
  isLoggedIn,
  asyncHandler(reviews.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncHandler(reviews.deleteReview)
);

module.exports = router;
