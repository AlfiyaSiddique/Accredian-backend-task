import { generateHTML } from "./html";
import { validationResult } from "express-validator";

const createReferal = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        referrerName,
        referrerEmail,
        referrerPhone,
        refereeName,
        refereeEmail,
        refereePhone,
        courseInterest,
        referralNote
      } = req.body;
  
      const referral = await prisma.referral.create({
        data: {
          referrerName,
          referrerEmail,
          referrerPhone: referrerPhone || null,
          refereeName,
          refereeEmail,
          refereePhone: refereePhone || null,
          courseInterest,
          referralNote: referralNote || null,
          status: 'PENDING',
          createdAt: new Date(),
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: refereeEmail,
        subject: `${referrerName} thinks you'd love our courses!`,
        html: generateHTML(refereeName, referrerName, referralNote, courseInterest),
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(201).json({
        message: 'Referral created successfully',
        referralId: referral.id,
      });
    } catch (error) {
      console.error('Error creating referral:', error);
      res.status(500).json({ error: 'Failed to create referral' });
    }
  }

const getReferral = async (req, res) => {
    try {
      const referrals = await prisma.referral.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.json(referrals);
    } catch (error) {
      console.error('Error fetching referrals:', error);
      res.status(500).json({ error: 'Failed to fetch referrals' });
    }
  }

const getReferralByReferrerEmail =  async (req, res) => {
    try {
      const { email } = req.params;
      const referrals = await prisma.referral.findMany({
        where: {
          referrerEmail: email,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.json(referrals);
    } catch (error) {
      console.error('Error fetching referrals:', error);
      res.status(500).json({ error: 'Failed to fetch referrals' });
    }
  };

const updateReferralState = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['PENDING', 'CONTACTED', 'ENROLLED', 'COMPLETED', 'DECLINED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      
      const updatedReferral = await prisma.referral.update({
        where: { id: parseInt(id) },
        data: { status },
      });
      
      res.json(updatedReferral);
    } catch (error) {
      console.error('Error updating referral:', error);
      res.status(500).json({ error: 'Failed to update referral' });
    }
  };

const referral = {
 createReferal,
 getReferral,
 getReferralByReferrerEmail,
 updateReferralState
}

export default referral
