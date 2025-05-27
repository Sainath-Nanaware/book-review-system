const express=require('express')
const router=express.Router()
const auth=require('../middlewares/auth')
const{addBookSchema} =require('../validations/bookValidation')
const validate=require('../middlewares/schemaValidate')
const {
  addBook,
  getAllBooks,
  getBookById,
  search
} = require("../controllers/bookController");

router.post('/',auth,validate(addBookSchema),addBook)
router.get('/books',auth,getAllBooks)
router.get("/search",auth,search);
router.get("/:id", auth, getBookById);


module.exports=router