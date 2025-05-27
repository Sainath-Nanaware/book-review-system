const { default: mongoose } = require('mongoose');
const Review=require('../models/reviewModel')
const {
  successResponse,
  errorResponse,
  validationError,
  unauthorized,
} = require("../utils/responseHandler");


exports.addReview=async(req,resp)=>{
    const { id } = req.params;
    const {rating,comment}=req.body
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            return errorResponse(resp,"invalid book id",401)
        }
        // console.log("in book review");
        
        const review=await Review.create({
            userId:req.userId,
            bookId:id,
            rating,
            comment
        })
        successResponse(resp,review,"review added",200)

    }catch(error){
         errorResponse(resp, "Internal server error", 500, error);
         console.log(error)
    }

}


exports.updateReview=async(req,resp)=>{
    const { id } = req.params;
    const { rating, comment } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorResponse(resp, "invalid review id", 401);
      }
    //   console.log("in book review");
      const review=await Review.findByIdAndUpdate(id,
        {
            rating,
            comment
        },
        {
            new:true
        }
      )
      successResponse(resp, review, "review updated", 200);
    } catch (error) {
      errorResponse(resp, "Internal server error", 500, error);
      console.log(error);
    }
}


exports.deleteReview=async(req,resp)=>{
    const { id } = req.params;
    try{

        if (!mongoose.Types.ObjectId.isValid(id)) {
           return errorResponse(resp, "invalid review id", 401);
        }
        const review=await Review.findByIdAndDelete(id)
        successResponse(resp,"review delete sucessfully",200)

    }catch(error){
        errorResponse(resp, "Internal server error", 500, error);
        console.log(error);
    }
}