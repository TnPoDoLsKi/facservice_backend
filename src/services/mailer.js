import nodemailer from "nodemailer";

export default function mailer(receiver, link) {
  const transporter = nodemailer.createTransport({
    host: "banshee.mxlogin.com", // smtp.gmail.com
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "archive@igc.tn",
      pass: "rJ33JTiC0"
    }
  });
  let mailOptions = {
    from: '"Fac Service Issatso" <archive@igc.tn>',
    to: receiver.email,
    subject: "Facservice Issatso - Activation de compte",
    html: `<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Email d'Activation</title>
                <style>
                /* -------------------------------------
                    INLINED WITH htmlemail.io/inline
                ------------------------------------- */
                /* -------------------------------------
                    RESPONSIVE AND MOBILE FRIENDLY STYLES
                ------------------------------------- */
                @media only screen and (max-width: 620px) {
                  table[class=body] h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
                  table[class=body] p,
                        table[class=body] ul,
                        table[class=body] ol,
                        table[class=body] td,
                        table[class=body] span,
                        table[class=body] a {
                    font-size: 16px !important;
                  }
                  table[class=body] .wrapper,
                        table[class=body] .article {
                    padding: 10px !important;
                  }
                  table[class=body] .content {
                    padding: 0 !important;
                  }
                  table[class=body] .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
                  table[class=body] .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
                  table[class=body] .btn table {
                    width: 100% !important;
                  }
                  table[class=body] .btn a {
                    width: 100% !important;
                  }
                  table[class=body] .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }

                /* -------------------------------------
                    PRESERVE THESE STYLES IN THE HEAD
                ------------------------------------- */
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
                  .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                    line-height: 100%;
                  }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
                </style>
              </head>
              <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                      <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                        <!-- START CENTERED WHITE CONTAINER -->
                        <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">

                          <!-- START MAIN CONTENT AREA -->
                          <tr>
                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                              <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Bonjour ${
                                      receiver.firstName
                                    },</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Merci pour votre inscription ?? Facservice, nous sommes heureux de vous avoir parmi nous.</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">FACSERVICE est la premi??re application multi-platformes sp??cifique de ISSATSO qui sert ?? vous donner l'acc??s pour ajouter ou t??l??charger tous les types de documents dont vous avez besoin pour r??viser .</p>
                                    <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                      <tbody>
                                        <tr>
                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                              <tbody>
                                                <tr>
                                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="${link}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Confirmer mon email</a> </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">C'est le temps pour reviser!</p>

                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;"></p>Question?
                                      Vous pouvez nous envoyer un email si vous avez des questions: contact@igc.tn.</p>
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Issatso Google Club ???</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                        <!-- END MAIN CONTENT AREA -->
                        </table>

                      <!-- END CENTERED WHITE CONTAINER -->
                      </div>
                    </td>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                  </tr>
                </table>
              </body>
            </html>
`
  };

  transporter.sendMail(mailOptions, error => {
    return error;
  });
}
