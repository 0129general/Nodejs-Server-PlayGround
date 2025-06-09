// const { paramCase } = require('change-case-object');

const ResetPasswordEmail = async (req, res, next, params) => {
    const href = `http://localhost:${process.env.PORT || process.env.PORT_NUMBER}/kitchen/verifyEmail/?id=${params._id}`;

    // sending email from
    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
        to: params.email, // list of receivers
        subject: params.subject, // Subject line
        // text: "Hello world?", // plain text body
        // html for email

        html: `<!DOCTYPE html>
                        <html>
                        <head>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                        <style>
                        .card {
                            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                            max-width: 300px;  margin: auto;  text-align: center; font-family: arial;
                        }
                        
                        .title { color: grey;font-size: 18px;
                        }
                        
                        p {
                            border: none; outline: 0;
                            display: inline-block;padding: 8px;
                            color: white;  background-color: #000;text-align: center;
                            cursor: pointer;  width: 100%; font-size: 18px;
                        }
                        
                        button {
                            text-decoration: none;
                            font-size: 22px;
                            color: black;
                        }
                        
                        button:hover, a:hover {
                            opacity: 0.7;
                        }
                        </style>
                        </head>
                        <body>
                        
                        <h2 style="text-align:center">Welcome ${params.firstName}</h2>
                        
                        <div class="card">
                            <img src="https://www.w3schools.com/w3images/team2.jpg" alt="John" style="width:100%">
                            <h1>${params.lastName}</h1>
                            <p class="title">Thanku.</p>
                        
                            <button><a href=${href} active">Verify Email</a></button>
                        </div>
                        
                        </body>
                    </html>`,
    };
    return mailOptions;
};

module.exports = ResetPasswordEmail;
