export function generateHTML(refereeName, referrerName, referralNote, courseInterest) {
    return  `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #4F46E5; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">You've Been Referred!</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
              <p>Hello ${refereeName},</p>
              <p>${referrerName} thought you might be interested in our ${courseInterest.replace('-', ' ')} course!</p>
              ${referralNote ? `<p>They included this note: "${referralNote}"</p>` : ''}
              <p>As a referred friend, you're eligible for a special 15% discount on your first course enrollment.</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://accredian.com" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Explore the Course</a>
              </div>
              <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
              <p>Best regards,<br>The Education Team</p>
            </div>
          </div>
        `
}
