// /emails/createHTMLBody.js
function createHTMLBody(user) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #4CAF50;
            font-size: 24px;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
          }
          .button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 20px;
            border: none;
            text-align: center;
            font-size: 16px;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
          }
          .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
            text-align: center;
          }
          .user-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to Our Service, ${user.username}!</h1>
          <img src="./" alt="User Profile Picture" class="user-image" />
          <p>We are excited to have you join our platform. You can start using your account immediately by following the link below.</p>
          <p><a href="https://jeancy24sur.com" class="button">Get Started</a></p>
          <p>If you have any questions or need support, feel free to reach out to us at any time.</p>
          <div class="footer">
            <p>&copy; 2025 w-web(Jeancy24Sur.com). All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

module.exports = createHTMLBody;
