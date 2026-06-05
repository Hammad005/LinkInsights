export const forgotPasswordOtpEmailTemplate = (otp, expiresIn) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:20px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: #DFF9F8; padding:20px; text-align:center;">
              <img src="https://res.cloudinary.com/dmiamov7p/image/upload/v1780496975/linksight-logo_i8wppb.png" alt="LinkInsights Logo" style="max-width: 180px; height: auto;"/>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; text-align:center;">
              <h1 style="color:#06295F; margin-bottom:10px;">Reset Your Password</h1>
              <p style="color:#555; font-size:14px; margin-bottom:20px;">
                We received a request to reset your password. Use the OTP below to proceed.
              </p>

              <!-- OTP Box -->
              <div style="
                display:inline-block;
                padding:15px 25px;
                font-size:28px;
                letter-spacing:5px;
                font-weight:bold;
                color:#ffffff;
                background:linear-gradient(to right, #052A5E , #09C1F6);
                border-radius:10px;
              ">
                ${otp}
              </div>

              <p style="color:#777; font-size:13px; margin-top:20px;">
                This code will expire in ${expiresIn} minutes.
              </p>

              <p style="color:#999; font-size:12px; margin-top:10px;">
                For security reasons, do not share this code with anyone.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; padding:20px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#666;">
                If you didn’t request a password reset, you can safely ignore this email.
              </p>
              <p style="margin-top:5px; font-size:12px; color:#999;">
                © ${new Date().getFullYear()} LinkInsights. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
