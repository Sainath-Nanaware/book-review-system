const Book=require('../models/bookModel')
const Review=require('../models/reviewModel')
const mongoose=require('mongoose')
const {
  successResponse,
  errorResponse,
  validationError,
  unauthorized,
} = require("../utils/responseHandler");


exports.addBook=async(req,resp)=>{
    try{
        const bookInfo=req.body
        const newBook=await Book.create(bookInfo)
        successResponse(resp,newBook,"new book add",201)
    }catch(error){
         errorResponse(resp, "Internal server error", 500, error);
         console.log(error);
    }
}

exports.getAllBooks=async(req,resp)=>{
    const {page=1,limit=5,author}=req.query
    try{
        const filter={}
        if(author){
            filter.author=author;
        }
        const books =await Book.find(filter).skip((page-1)*limit).limit(parseInt(limit))
        const total = await Book.countDocuments(filter);
        // console.log(books);
        
        const data={
            numberOfBooks:total,//total record match
            page:parseInt(page),//current page number
            pageSize:books.length,//total records returned in these page
            books//actual data
        }

        successResponse(resp,data,"books info",200)

    }catch(error){
        errorResponse(resp, "Internal server error", 500, error);
        console.log(error);
    }
}

exports.getBookById=async(req,resp)=>{
    const {id}=req.params
      const { page = 1, limit = 5 } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(resp, "invalid review id", 401);
    }
    try{
        const bookInfo=await Book.findById(id)
        if(!bookInfo){
            return errorResponse(resp,"book not found",401)
        }
         const reviews = await Review.find({ bookId: id })
           .skip((page - 1) * limit)
           .limit(Number(limit))
           .populate("userId", "name"); // Optional: show user names

         const avgRatingData = await Review.aggregate([
           { $match: { bookId: new mongoose.Types.ObjectId(id) } },
           { $group: { _id: "$bookId", avgRating: { $avg: "$rating" } } },
         ]);

         const averageRating = avgRatingData[0]?.avgRating || 0;

         const data={
           bookInfo,
           averageRating: averageRating.toFixed(2),
           reviews,
           pagination: {
             page: Number(page),
             limit: Number(limit),
           },
         };
         successResponse(resp,data,"book info",200)

    }catch(error){
        errorResponse(resp, "Internal server error", 500, error);
        console.log(error);
    }
}


exports.search=async(req,resp)=>{
    const {q}=req.query
    console.log("in search");
    
    if(!q || q.trim()===''){
        return errorResponse(resp,"search query is required",400)
    }
    try{
        const searchRegex=new RegExp(q,'i')
        console.log("serach Regex=",searchRegex);
        
        const books = await Book.find({
          $or: [
            { title: { $regex: searchRegex } },
            { author: { $regex: searchRegex } },
          ],
        });
        successResponse(resp,books,"filter books",200)
    }catch(error){
        errorResponse(resp, "Internal server error", 500, error);
        console.log(error);
    }

}