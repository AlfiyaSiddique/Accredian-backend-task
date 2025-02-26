import { Router } from "express";
import referralValidationRules from "./validation";
import referral from "./controller";


const referralRouter = Router()

referralRouter.post('/referrals', referralValidationRules, referral.createReferal)
referralRouter.get('/referrals', referral.getReferral)
referralRouter.get('/referrals/referrer/:email', referral.getReferralByReferrerEmail)
referralRouter.patch('/api/referrals/:id/status', referral.updateReferralState)

export default referralRouter
