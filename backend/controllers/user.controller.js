
import userModel from '../models/user.models.js'
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service.js'

export const createUserController= async(req,res)=>{

    const errors =  validationResult(req);

    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});

    }
    try{
             const user=await userService.createUser(req.body);

             const token=await user.generateJWT();

             delete user._doc.password; // Remove password from the response

         res.status(201).send({ user, token });


    }catch(error){

        res.status(400).send(error.message);

    }
    
}

export const loginController=async(req,res)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{     
        const {email,password}=req.body;
    

        
       const user = await userModel.findOne({ email }).select('+password');
if (!user || !(await user.isValidPassword(password))) {
  return res.status(401).json({ error: 'Invalid email or password' });
}
       const token=await user.generateJWT();


             delete user._doc.password;
       res.status(200).json({user,token});


    }catch(err){
        res.status(400).send(err.message)
    }
}

export const profileController=async(req,res)=>{

        res.status(200).json({
            user:req.user,
        });
}

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        // Invalidate the user's session in Redis
        redisClient.set(token,'logout', 'EX', 24*60*60); // Set expiration to 24 hours

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out' });
    }
}