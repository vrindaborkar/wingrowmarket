const Razorpay = require('razorpay');
const crypto = require('crypto');
//order Api
const ordersApi = async(req,res)=>
{
    try {
        const instance = new Razorpay({
            key_id:process.env.KEY_ID,
            key_secret:process.env.KEY_SECRET
        });

        const options = ({
            amount:req.body.amount,
            currency:"INR"
        })

        instance.orders.create(options,(error , order)=>{
            if(error){
                console.log(error);
                return res.status(500).json({message:'Something went wrong'});
            }
            res.status(200).json({data:order})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal error occured"})
    }
}


//payment verify api

const verifypayment = async(req,res)=>
{
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if(razorpay_signature===expectedSign)

        {
            res.status(200).json({message:"payment verification succesful",orderId:razorpay_order_id})
        }
        else
        {
            return res.status(500).json({message:"payment failed"})
        }

    } catch (error) 
    {
        console.log(error)
        res.status(500).json({message:"internal error"})
    }
}


const controller = {
    ordersApi,
    verifypayment
}

module.exports = controller;