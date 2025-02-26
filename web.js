import { Router } from "express";

const referralRouter = Router()

referralRouter.get('/', (req,res)=>{
    res.json({message: "Referral route working"})
})

export default referralRouter
