import nodemailer from "nodemailer";

export function createOtp(): string {
	const characters = "0123456789";
	let otp = "";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		otp += characters.charAt(randomIndex);
	}
	return otp;
}

export const verifyMail = (email: string, otp: string) => {
	const transporter = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 587,
		secure: false,
		auth: {
			user: "8b5a68f7d28aac",
			pass: "b2f591523f4028",
		},
	});

	async function main() {
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '"Classic Crimson MoodBoard👻" <tireddev30days@dev.co>',
			to: `${email}`,
			subject: "Password Reset",
			text: "You have received this email because you requested a password reset.",
			html: `<pre><h4>Here is your OTP (one time password) </h1><b>${otp}</b><p>DO NOT SHARE THIS WITH ANYONE!</p><p>This OTP can be used only once and it expires in <b>10 minutes</b></p></pre>`,
		});
	}

	main().catch((error) => new Error("Failed to send mail"));
};
