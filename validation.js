import { body } from "express-validator";

const referralValidationRules = [
    body('referrerName').notEmpty().withMessage('Referrer name is required'),
    body('referrerEmail').isEmail().withMessage('Valid referrer email is required'),
    body('referrerPhone').optional().isMobilePhone().withMessage('Valid referrer phone is required'),
    body('refereeName').notEmpty().withMessage('Referee name is required'),
    body('refereeEmail').isEmail().withMessage('Valid referee email is required'),
    body('refereePhone').optional().isMobilePhone().withMessage('Valid referee phone is required'),
    body('courseInterest').notEmpty().withMessage('Course interest is required'),
  ];

export default referralValidationRules
