const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');//for tokenization
var expressJwt = require('express-jwt');//cookies
const uuidv1 = require("uuidv1");
const SECRET = "TOKEN123"

exports.signup = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
        })
    }

    const user = new User(req.body);
    // user.id = uuidv1();
    user.password = bcrypt.hashSync(user.password, 10);

    user.save()
        .then(user => {
            const token = jwt.sign({_id:user.id}, SECRET);
            res.cookie("token", token, {expire : new Date() + 9999});

            return res.status(200).json({token, user : {
                id : user.id,
                name : user.name,
                email : user.email,
                password : user.password
            }})
        }).catch(error => {
            console.log("Error occurred: " + error);
            return res.status(401).json(error);
        })
}

exports.signin = async(req,res) => {
    const errors = validationResult(req);
    const {email, password} =req.body;
    
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
        })
    }
    try {
        let user =  await User.findAll({where: {email: email}});
        let isMatch = bcrypt.compareSync(password, user[0].password)
        
        if(isMatch){
            const token = jwt.sign({ _id: user._id }, SECRET);//token created
            //putting tokens in cookie
            res.cookie("token", token, {expire : new Date() + 9999});
            //send request to front end
            const {id,name , email, role } = user[0];
            return res.json({token, user: { id, name, email, role}});
        }
        else{
            return res.status(400).json("Wrong password");
        }
      } catch (error) {
        return res.send(error);
      }
}

exports.getAllUsers = (req,res) => {
    User.findAll()
        .then(user => {
            return res.status(200).json(user)
        }).catch(error => {
            return res.status(401).json(error.errors[0].message);
        })
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if(user === null){
        return res.status(401).json("User not found");
    }
    else{
       user.set(req.body);
       user.save()
       .then(updateUser => {
           return res.status(200).json(updateUser)
       }).catch(error => {
           return res.status(401).json(error)
       })
    }
}

exports.getUserById = async (req, res) => {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if(user === null){
        return res.status(401).json("User not found");
    }
    else{
        const {id,name , email, role } = user;
        return res.status(200).json({user: { id, name, email, role}});
    }
}

exports.signout = async (req, res) => {
    res.clearCookie("token");
    return res.json({message: "User signed out!!"})
}