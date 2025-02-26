import { Router } from "express";
import referralValidationRules from "./validation.js";
import referral from "./controller.js";


const referralRouter = Router()

referralRouter.post('/referrals', referralValidationRules, referral.createReferal)

// For these controllers I have added a postman collection to test and check due to lack of time to develop the frontend for this
referralRouter.get('/referrals', referral.getReferral)
referralRouter.get('/referrals/referrer/:email', referral.getReferralByReferrerEmail)
referralRouter.put('/referrals/:id/status', referral.updateReferralState)

export default referralRouter
