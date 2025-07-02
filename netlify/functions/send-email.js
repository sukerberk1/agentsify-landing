
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const { Name, email, subject, message } = JSON.parse(event.body);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['stan@agentsify.ai'],
            subject: `[Contact Form] ${subject}`,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <p>Hi Team,</p>

            <p>You’ve received a new inquiry via the contact form on your website.</p>

            <hr style="border: none; border-top: 1px solid #ccc;" />

            <p><strong>Name:</strong> ${Name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="margin-left: 1em; white-space: pre-line;">${message}</p>

            <hr style="border: none; border-top: 1px solid #ccc;" />

            <p>Thanks and regards,</p>
            <p><strong>Agentsify Contact Form</strong></p>

            <p style="font-size: 0.9em; color: #777;">
            This message was automatically generated and sent from your website's contact form.
            </p>
        </div>
        `,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Resend error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email' }),
        };
    }
}
