const Inward = require("../models/Inward");
const Outward = require("../models/Outward");
const jwt_decode =  require("jwt-decode");
const User = require("../models/User");

exports.getInward = async(req,res,next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)


    const inwarddata = await Inward.find({"userId" : id});
    res.send(inwarddata)
}

exports.getUser = async(req, res) => {
    const data = await User.find();
    const filter = data.filter(e=>e.role === "farmer");
    res.status(200).json(filter)
  }

  exports.getAllUsers = async(req, res) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)


    const userdata = await User.find({"_id" : id});
    res.send(userdata)
  }

  exports.getUsers = async(req , res) => {
    const data = await User.find();
    const filter = data.filter(e=>e.role === "customer");
    res.status(200).json(filter)
  }


exports.getInwardData = async(req,res,next) => {
    const inwarddata = await Inward.find();
    res.send(inwarddata)
}
exports.getOutwardData = async(req,res,next) => {
    const outwarddata = await Outward.find();
    res.send(outwarddata)
}

exports.getOutward = async(req,res,next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)

    const outwarddata = await Outward.find({"userId" : id});
    res.send(outwarddata)
}



exports.postOutward = async(req,res,next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    const data = {
        market:req.body.market,
        commodity:req.body.commodity,
        sales_quantity:req.body.sales_quantity,
        sales_rate:req.body.sales_rate,
        total_sales:req.body.total_sales,
        userId:id,
        time:req.body.time
    }

    const postdata = await new Outward(data);
    const resp = await postdata.save();

    if(!resp){
        res.status(400).json({message:"An unknown error occured"})
    }

    res.status(200).json({message:"Data added successfully"})
}

exports.postInward = async(req,res,next) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    
    const data = {
        market:req.body.market,
        commodity:req.body.commodity,
        purchase_quantity:req.body.purchase_quantity,
        purchase_rate:req.body.purchase_rate,
        total_purchase:req.body.total_purchase,
        userId:id,
        time:req.body.time
    }

    const postdata = await new Inward(data);
    const resp = await postdata.save();

    if(!resp){
        res.status(400).json({message:"An unknown error occured"})
    }

    res.status(200).json({message:"Data added successfully"})
}


