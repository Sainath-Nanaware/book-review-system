const express=require('express')
const router=express.Router()
const auth=require('../middlewares/auth')
const{addBookSchema} =require('../validations/bookValidation')
const validate=require('../middlewares/schemaValidate')
const { addBook, getAllBooks } = require("../controllers/bookController");

router.post('/',auth,validate(addBookSchema),addBook)
router.get('/books',auth,getAllBooks)


module.exports=router