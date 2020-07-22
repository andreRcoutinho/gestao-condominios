export function welcome(token: String, email: String) {
    return `
    <!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <title>Bem vindo</title>
</head>

<head>
    <title>Rating Reminder</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta content="width=device-width" name="viewport">
    <style type="text/css">
        @font-face {
            font-family: "Postmates Std";
            font-weight: 600;
            font-style: normal;
            src: local("Postmates Std Bold"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format("woff");
        }

        @font-face {
            font-family: "Postmates Std";
            font-weight: 500;
            font-style: normal;
            src: local("Postmates Std Medium"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format("woff");
        }

        @font-face {
            font-family: "Postmates Std";
            font-weight: 400;
            font-style: normal;
            src: local("Postmates Std Regular"), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format("woff");
        }
    </style>
    <style media="screen and (max-width: 680px)">
        @media screen and (max-width: 680px) {
            .page-center {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
            .footer-center {
                padding-left: 20px !important;
                padding-right: 20px !important;
            }
        }
    </style>
</head>
<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
    <tbody>
        <tr>
            <td style="text-align: center;">
                <table id="body" align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
                    <tbody>
                        <tr>
                            <td>
                                <table class="page-center" align="center" cellpadding="0" cellspacing="0" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 24px;"><img src="https://d1pgqke3goo8l6.cloudfront.net/wRMe5oiRRqYamUFBvXEw_logo.png" style="width: 56px;"></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Bem vindo</td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top: 48px; padding-bottom: 48px;">
                                                <table cellpadding="0" cellspacing="0" style="width: 100%">
                                                    <tbody>
                                                        <tr>
                                                            <td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">Está a receber este e-mail porque foi criada uma conta com este endereço e-mail. Se não foi você que fez o pedido, por favor contacte o administrador.</td>
                                        </tr>
                                        <tr>
                                            <td><a data-click-track-id="37" href="http://localhost:8080/reset-password?token=${token}&email=${email}" style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #54B4E2; border-radius: 28px; display: block; text-align: center; text-transform: uppercase"
                                                    target="_blank">Criar Palavra-Passe</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </table>
        `;
}