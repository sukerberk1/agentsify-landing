import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
        return { statusCode: 400, body: 'Email is required' };
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'vaishnavimantri01@gmail.com',
            subject: 'New Newsletter Subscription',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">📬 New Newsletter Subscription</h2>
        <p style="font-size: 16px; color: #555;">
        Hello there! 👋, I hope you are doing well.
        </p>
        <p style="font-size: 16px; color: #555;">
        Great news! Someone just subscribed to your newsletter.
        </p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 16px; color: #000;">
        <strong>Subscriber Email:</strong> ${email}
        </p>
        <hr style="margin: 20px 0;" />
        <p style="font-size: 16px; color: #555;">
        Make sure to welcome them and keep them updated with your latest news.
        </p>
        <p style="font-size: 14px; color: #888;">
        This is an automated notification from your website subscription system.
        </p>
        <p style="font-size: 16px; color: #555; margin-top: 30px;">
        Warm regards,<br />
        Your Website Bot 🤖
        </p>
    </div>
    `

        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' }),
        };
    }
}
