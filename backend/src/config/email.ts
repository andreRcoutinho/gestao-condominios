import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

export var transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                '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'
        }
    })
)