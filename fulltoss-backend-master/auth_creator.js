const mongoose = require("mongoose");
const User = require("./authSchema");
const bcrypt = require("bcrypt");
const type = ["CSK","MI","RCB","SRH"]

async function createOne(req, res, next) 
{
    try {
        const users = await User.find();  // Fetch all users
        if (users.length > 0) {
            // If there is already a user, send a response
            return res.status(200).json({ "message": "We already have a user." });
        }
        else {
           
            for (var i = 0; i < 15; i++) {
                hash = await bcrypt.hash("Person" +String(i + 1)+ '@123'  , 12);
                const user = new User({
                    username: 'Person' + String(i + 1),
                    password: hash,
                    email: "person"+String(i+1)+"2004@gmail.com",
                    team:type[Math.floor(Math.random()*4)]
                })
                await user.save();
            }

            return res.status(200).json({ "message": "Successful creation" });
        }



    } catch (err) {
        // Handle any errors
        return res.status(500).json({ message: err.message });
    }
    return res.status(400).json({"message":"unknown error"});
}
async function login(req, res, next) {
    const data = req.body;
    try {
        const user = await User.findOne({ username: data.username });
        if (!user) {
            return res.status(400).json({ message: "user not found,signup first" });
        }
        else {
            const result = await bcrypt.compare(data.password, user.password);
            if (result) {
                //localStorage.setItem("user",body.type+"+"+body.usrname);
                return res.status(200).json({ message: "sucessfull login",result:user.team });
            }
            else {

                return res.status(400).json({ message: "Invalid credentials" });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "internel server error,try once more" });

    }

}
async function Signup(req,res,next){
    const body=req.body;
    
    if(!(body.username && body.password  && body.email))
    {
       return res.status(400).json({message:"Fill all deatails"});
    }
   try{
     const user_check=await User.findOne({username:body.username});
     if(user_check)
     {
        return res.status(400).json({message:"alraedy user exists,go and login"});
     }
     else
     {
        try{
            const temp=body.password;
            const temp2=await bcrypt.hash(temp,12);
            body.password=temp2;
            body.team=type[Math.floor(Math.random()*4)];
            const user=new User(body);
            await user.save();
            //localStorage.setItem("user",body.type+"+"+body.usrname);
            return res.status(200).json({message:"successful_creation",result:body.team});
        }
        catch(err)
        {
            return res.status(500).json({message:"internel server error"})
        }
     }
}
catch(err)
{
    return res.status(400).json({message:"internal server error"});
}


}
async function getteam(req,res,next)
{
    const username=req.params.username;
   
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "user not found,signup first" });
        }
        else {
           return res.status(200).json({message:"user found",team:user.team})
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "internel server error,try once more" });
    }
}
async function updateteam(req,res,next)
{
    const username=req.body.username;
    const newteam=req.body.team;
   
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "user not found,signup first" });
        }
        else {
            user.team=newteam;
           await User.updateOne({username:username},user);
           const user2 = await User.findOne({ username: username });
           return res.status(200).json({message:"successful-update",newuser:user2});
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: "internel server error,try once more" });
    }
}
// In auth_creator.js
module.exports = { createOne, login, Signup,getteam,updateteam};

