const core = require('@actions/core');
const Mailjet = require('node-mailjet');

async function run() {
    try {
        const apiKey = core.getInput('api_key');
        const apiSecret = core.getInput('api_secret');
        const fromEmail = core.getInput('from_email');
        const toEmail = core.getInput('to_email');
        const subject = core.getInput('subject');
        const message = core.getInput('message');

        // Initialize Mailjet client
        const mailjet = new Mailjet({
            apiKey: apiKey,
            apiSecret: apiSecret,
        });

        // Prepare the request
        const request = {
            Messages: [
                {
                    From: {
                        Email: fromEmail,
                    },
                    To: [
                        {
                            Email: toEmail,
                        },
                    ],
                    Subject: subject,
                    TextPart: message,
                },
            ],
        };

        // Send the email
        const result = await mailjet.post('send', { version: 'v3.1' }).request(request);

        console.log('Email sent successfully:', result.body);
    } catch (error) {
        core.setFailed(`Failed to send email: ${error.message}`);
    }
}

run();
