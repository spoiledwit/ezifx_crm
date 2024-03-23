import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tbcgulfmarketing@gmail.com",
    pass: "gyqj dwxp nrmo qobv",
  },
});

export async function sendEmail(to, subject, text) {
  try {
    const a = await transporter.sendMail({
      from: "tbcgulfmarketing@gmail.com",
      to: to,
      subject: subject,
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background-color: #1c1c1e; /* Sleek dark background */
            color: #e1e1e1; /* Light text for high contrast */
            line-height: 1.4;
        }
        .container {
            max-width: 650px;
            margin: 40px auto;
            padding: 0;
            border-radius: 12px;
            overflow: hidden; /* Ensure the border radius clips the content */
        }
        .header {
            background-color: #333; /* Dark header background */
            color: #ffd700; /* Golden yellow for a rich look */
            padding: 20px;
            text-align: center;
            position: relative;
        }
        .header img {
            width: 120px; /* Logo size */
            height: auto;
            margin-bottom: 10px;
        }
        .content {
            background-color: #262626; /* Lighter dark background for content */
            padding: 30px 20px;
            color: #f0f0f0; /* Soft white for content */
        }
        .footer {
            background-color: #333; /* Same as header for consistency */
            color: #ffd700;
            padding: 15px;
            text-align: center;
        }
        .footer img {
            width: 100px; /* Slightly smaller logo for footer */
            height: auto;
        }
        /* Additional styling for buttons or call-to-action */
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            border-radius: 5px;
            background-color: #ffd700; /* Matching the golden yellow theme */
            color: #333; /* Dark text for the button */
            text-decoration: none; /* Remove underline from links */
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://www.ezifx.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e3d8016d.png&w=256&q=75" alt="EziFx Logo"> <!-- Replace with your logo path -->
            <h1>
                ${subject}
            </h1>
        </div>
        <div class="content">
              ${text}
        </div>
        <div class="footer">
            <img src="https://www.ezifx.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.e3d8016d.png&w=256&q=75" alt="EziFx Logo"> <!-- Replace with your logo path -->
            <p>Best regards,<br>EziFx Team</p>
        </div>
    </div>
</body>
</html>

      
            `,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email", error);
  }
}
