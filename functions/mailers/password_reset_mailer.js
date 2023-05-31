import { transporter } from "../config/nodemailer.js";

export const resetPasswordMailer = async (email, token) => {
  console.log("Inside mailer");
  console.log(email);
  console.log(token);

  transporter.sendMail(
    {
      from: "newamish2001@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `
        <h4>You have requested for password reset and here is your token ${token}</h4>
        <strong>Click <a href="https://main--heroic-rabanadas-aaaaaa.netlify.app/reset-password/${token}">here</a> to reset your password.</strong>
      `,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Message sent", info);
      return;
    }
  );
};
