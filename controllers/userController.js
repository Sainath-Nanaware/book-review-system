const User = require("../models/userModel");
const {
  successResponse,
  errorResponse,
  validationError,
  unauthorized,
} = require("../utils/responseHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, resp) => {
  const { username, email, password, role } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return errorResponse(resp, "user already exists", 400);
    }
    const hashPassword=await bcrypt.hash(password,10)
    const newUser = await User.create({
        username,
        email,
        password:hashPassword,
        role
    });
    if (role) newUser.role = role;
    successResponse(resp,newUser,"user register successfully",201)
  } catch (error) {
    errorResponse(resp, "Internal server error", 500, error);
    console.log(error);
  }
};

exports.login = async(req, resp) => {
    const {email,password} =req.body
    try{
        const userExist=await User.findOne({email})
        if(!userExist){
            return errorResponse(resp,"invalid credential",401)
        }
        const validPassword=await bcrypt.compare(password,userExist.password)
        if(!validPassword){
            return errorResponse(resp, "invalid credential", 401);
        }
        const token = jwt.sign(
          { email: email, userId: userExist._id, role: userExist.role },
          process.env.JWT_SECRET,{expiresIn:"1h"}
        );
        successResponse(resp,token,"user login successfully",200)

    }catch(error){
        errorResponse(resp, "Internal server error", 500, error);
        console.log(error);

    }
};
