import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailSender = process.env.MAIL_SENDER?.trim();
const password = process.env.PASSWORD?.trim();
const mailToken = process.env.TOKEN;

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: mailSender,
        pass: password,
    },
});

export class Mailer {
	static createMessageObject(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {
		const messageObject = {
			from: '"Style Marketplace" <noreply@stylemarketplace.com>',
			to: emailToBeSendedTo,
			subject: subject,
			text: messageText,
		};

		return messageObject;
	}

	public static async sendEmail(
		emailToBeSendedTo: string,
		subject: string,
		messageText: string
	) {
		const messageObject = Mailer.createMessageObject(
			emailToBeSendedTo,
			subject,
			messageText
		);

		return transporter.sendMail(messageObject);
	}
}

