const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');//for tokenization
var expressJwt = require('express-jwt');//cookies
const uuidv1 = require("uuidv1");
const SECRET = "TOKEN123"
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = "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"
sgMail.setApiKey(SENDGRID_API_KEY);


exports.signup = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
        })
    }

    const user = new User(req.body);
    user.id = uuidv1();
    user.password = bcrypt.hashSync(user.password, 10);

    user.save()
        .then(user => {
            const token = jwt.sign({_id:user.id}, SECRET);
            res.cookie("token", token, {expire : new Date() + 9999});

            const msg = {
                to: user.email, // Change to your recipient
                from: 'kashmiri.mahanta@mtxb2b.com', // Change to your verified sender
                subject: 'Welcome to ShoeStore',
                text: 'Hello'+ user.name + ', thankyou for registering to ShoeStore.',
                html: 'Hello '+ user.name + ', thankyou for registering to ShoeStore.'+ '<br/><br/><strong>We are happy to serve you.</strong><br><br> Thankyou, <br>ShoeStore',
              }
              sgMail
                .send(msg)
                .then(() => {
                  return res.status(200).json({token, user : {
                    id : user.id,
                    name : user.name,
                    email : user.email,
                    phoneNumber : user.phoneNumber,
                    password : user.password
                }})
                })
                .catch((error) => {
                  console.error(error)
                  return res.status(401).json(error);
                })
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
            const {id,name , email, role, phoneNumber } = user[0];
            return res.json({token, user: { id, name, email, role, phoneNumber}});
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
            return res.status(401).json(error);
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
    const user = await User.findByPk(id, {raw: true});
    if(user === null){
        return res.status(401).json("User not found");
    }
    else{
        const {id,name , email, role , phoneNumber } = user;
        return res.status(200).json({ id, name, email, role, phoneNumber});
    }
}

exports.signout = async (req, res) => {
    res.clearCookie("token");
    return res.json({message: "User signed out!!"})
}

exports.removeUserById = async(req, res) => {
    User.destroy({
        where: { 
            id: req.params.id
        }
    }).then(result => {
        return res.status(200).json("User removed")
      }).catch(error => {
        console.log("error")
      })
      
}