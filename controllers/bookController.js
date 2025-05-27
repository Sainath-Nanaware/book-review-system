const Book=require('../models/bookModel')
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