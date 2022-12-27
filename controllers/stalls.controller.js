const BookedStalls = require("../models/BookedStalls");
const CancelledStalls = require("../models/CancelledStalls");
const Inward = require("../models/Inward");
const Stalls = require("../models/Stalls");

exports.getStalls = async(req,res)=>{
    const data = await Stalls.find()
    res.send(data)
  }

  exports.getbookedStalls = async(req,res)=>{
    const data = await BookedStalls.find()
    res.send(data)
  }

  exports.getcancelledstalls = async(req,res)=>{
    const data = await CancelledStalls.find()
    res.send(data)
  }

exports.getInOutData = async(req,res)=>{
  const Indata = await Inward.find();
  res.send(Indata)
}
  
exports.postStalls = async(req,res,next)=>{
      const data = await new Stalls(req.body);
      const resp = await data.save();
  
      if(!resp){
        res.status(400).json("failed to add")
      }
      res.status(200).json("added successfully")
  }

  exports.postbookedStalls = async(req,res,next)=>{
    const {bookedStalls , isBooked , bookedBy , bookedAt} = req.body;
  
    if(bookedStalls && isBooked && bookedBy && bookedAt)
    {
      bookedStalls.forEach(async(e)=>{
        const {stallNo} = e;
      const findData = BookedStalls.find({stallNo , bookedAt});

      const resp = await new BookedStalls({
        location:e.location,
        stallPrice:e.stallPrice,
        address:e.address,
        stallName:e.stallName,
        bookedAt:bookedAt,
        bookedBy:bookedBy,
        isBooked:isBooked,
        stallNo:e.stallNo
      })

      const data = await resp.save();
    })
    res.status(200).json("added successfully")
  }
  else{
    res.status(400).json("failed to add")
  }
}


exports.deletebookedStalls = async(req,res) => {
  const {id} = req.body;
  const deleted = await BookedStalls.findByIdAndDelete(id);
  
  if(!deleted){
    res.status(400).send("failed to delete")
  }

  res.status(200).json(deleted)
}

exports.deletecancelledStalls = async(req,res) => {
  const {id} = req.body;
  const deleted = await CancelledStalls.findByIdAndDelete(id);
  
  if(!deleted){
    res.status(400).send("failed to delete")
  }

  res.status(200).json(deleted)
}



exports.postcancelledstalls = async(req,res)=>{

const {stallName, cancelledAt , bookedAt , bookedBy , isBooked ,stallNo,location,stallPrice,address} = req.body;

const response = {
  stallName:stallName,
  bookedAt:bookedAt,
  bookedBy:bookedBy,
  isBooked:isBooked,
  stallNo:stallNo,
  location:location,
  address:address,
  stallPrice:stallPrice,
  cancelledAt:cancelledAt
}

const data = await new CancelledStalls(response);
const resp = data.save();

if(!resp){
  res.status(400).json("success")
}
res.status(200).send(resp)
}
  
 exports.putStalls = async(req,res,next)=>{
    const {data , user , time} = req.body;
  
    const updata = await Stalls.updateMany({_id : {$in:data}} , {isBooked:true , bookedBy:user , bookedAt:time})
  
    if(!updata){
      res.status(400).json("failed to add")
    }
    const response = await Stalls.find({_id : {$in:data}})
    res.status(200).json(response)
  }
  
  
  exports.resetStalls =  async(req,res,next)=>{
    const update = await Stalls.updateMany({} , {isBooked:false , bookedBy:"" , bookedAt:""})
  
    if(!update){
      res.status(400).json("failed")
    }
    res.status(200).json(update)
  }