const mongoose = require("mongoose");
const Product = require("./ProductSchema");

async function createProducts(req,res,next) {
   const teams=["MI","CSk","RCB","SRH"];
   const team=req.body.team.split('.');
   try{
   if (team.length>1)
   {
    for(var i=0;i<4;i++)
    {
        const temp=req.body;
        temp.team=teams[i];
        temp.unique_id=temp.unique_id+i;
        const user=await new Product(temp);
        await user.save();
        
    }
    return res.status(200).json({message:"successful-entry for batch"});
   }
   else
   {
    const temp=req.body;
   
    const user=await new Product(temp);
    await user.save();
    return res.status(200).json({message:"successful-entry"});
   }}
   catch(err)
   {
    console.log(err);
    return res.status(500).json({message:"internal-server-error"});
   }
    
}
async function getProducts(req,res,next) {
    const team=req.params.team;
   try{ const products= await Product.find({team:team});
    if(products.length>0)
    {
        return res.status(200).json({message:products});
    }
    else
    {
        return res.status(400).json({message:"sorry we dont have produts of your team"});

    }
}
catch(err)
{
    console.log(err);
    return res.status(500).json({message:"internal server error"});
}
    
}
module.exports = { getProducts,createProducts};