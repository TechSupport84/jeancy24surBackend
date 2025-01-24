const nodemailer = require("nodemailer");

// Create transporter with Gmail configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465
  auth: {
    user: "trainingtech84@gmail.com", // Your Gmail address
    pass: process.env.SEND_EMAIL_SECRET, // Environment variable for security
  },
});

/**
 * Sends a professional email to the recipient.
 * @param {string} recipientEmail - The recipient's email address.
 * @param {object} applicationData - Data about the application (name, email, etc.).
 */
async function sendEmail(recipientEmail, applicationData) {
  if (!recipientEmail) {
    throw new Error("Recipient email is required.");
  }

  const { username ="" } = applicationData;

  // Define email content
  const mailOptions = {
    from: '"Application Team" <trainingtech84@gmail.com>', // Sender address
    to: recipientEmail, // Recipient email
    subject: "Application Received Successfully!", // Subject line
    text: `Hello ${username}, thank you for your application!`, // Fallback plain text
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <div style="background-color: #4caf50; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">Application Received!</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
          <p>Dear <strong>${username}</strong>,</p>
          <p>Thank you for submitting your application. We have received your details and our team will review your submission shortly.</p>
          
          <p>Your application demonstrates your enthusiasm for software development, and we are truly excited to learn more about your skills and potential contributions. Rest assured, our team is dedicated to carefully reviewing every detail of your submission to ensure a fair evaluation.</p>

          <p>Here is a summary of your application:</p>
          <ul style="margin: 0 0 20px; padding-left: 20px;">
            <li><strong>Name:</strong> ${username}</li>
            <li><strong>Programming Languages:</strong> Software Development</li>
          </ul>

          <p>If there are any additional documents or information you’d like to provide, feel free to reply to this email. Our team is here to assist and answer any questions you may have during the process.</p>

          <p style="margin: 20px 0;">Best regards,</p>
          <p><strong>The Application Team</strong></p>
          <p>
           <a href="mailto:trainingtech84@gmail.com"> email </a>
           </P>
             <p> Or </p>
           
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://www.jeancy24sur.com" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: white; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
          </div>
        </div>
        <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #ddd;">
          <p>&copy; 2025 Application Team. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // Generate preview URL for testing
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email. Please try again.");
  }
}

module.exports = {
  sendEmail,
};
