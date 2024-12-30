const core = require('@actions/core');
const fs = require('fs');
const Mailjet = require('node-mailjet');

async function run() {
    try {
        const apiKey = core.getInput('api_key');
        const apiSecret = core.getInput('api_secret');
        const fromEmail = core.getInput('from_email');
        const toEmail = core.getInput('to_email');
        const subject = core.getInput('subject');
        const message = core.getInput('message');
        const attachmentPath = core.getInput('attachment_path'); // Optional attachment

        // Initialize Mailjet client
        const mailjet = new Mailjet({
            apiKey: apiKey,
            apiSecret: apiSecret,
        });

        // Prepare attachments if provided
        let attachments = [];
        if (attachmentPath) {
            const fileName = attachmentPath.split('/').pop(); // Extract file name
            const fileData = fs.readFileSync(attachmentPath); // Read file data
            const base64Data = fileData.toString('base64'); // Convert to Base64

            attachments.push({
                ContentType: 'application/octet-stream', // Adjust content type if needed
                Filename: fileName,
                Base64Content: base64Data,
            });
        }

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
                    Attachments: attachments, // Add attachments
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
