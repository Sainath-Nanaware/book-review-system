const express=require('express')
const router=express.Router()
const {addReviewSchema} =require('../validations/reviewValidation')
const validate=require('../middlewares/schemaValidate')
const auth=require('../middlewares/auth')
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");


router.post("/:id",auth,validate(addReviewSchema),addReview)
router.put("/:id", auth, validate(addReviewSchema), updateReview);
router.delete("/:id", auth, deleteReview);

module.exports=router