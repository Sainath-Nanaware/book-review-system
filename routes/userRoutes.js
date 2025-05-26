const express=require('express')
const router=express.Router()
const auth=require('../middlewares/auth')
const {registrationSchema,loginSchema} =require('../validations/userValidations')
const validate=require('../middlewares/schemaValidate')
const {register,login}=require('../controllers/userController')

router.post('/register',validate(registrationSchema),register)
router.post('/login',validate(loginSchema),login)


module.exports=router
